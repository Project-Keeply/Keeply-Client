import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import test from 'node:test';
import { fileURLToPath, URL } from 'node:url';
import { checkHarness } from './harness-check.mjs';
const source = fileURLToPath(new URL('../../', import.meta.url));
const cli = path.join(source, 'tools/ai-workflow/harness-check.mjs');
const fixture = (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'keeply-harness-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  [
    'AGENTS.md',
    'CLAUDE.md',
    '.agents',
    'docs/rules',
    'docs/ai-workflow/README.md',
    'docs/ai-workflow/user-guide.md',
    'docs/ai-workflow/templates',
    'docs/branch-review',
    'tools',
    'package.json',
    '.github/workflows/ci.yml',
  ].forEach((file) => {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    cpSync(path.join(source, file), path.join(root, file), { recursive: true });
  });
  // Recreate relative links; copying may rewrite symlink targets to source checkout.
  mkdirSync(path.join(root, '.claude/commands'), { recursive: true });
  readdirSync(path.join(root, '.agents/skills')).forEach((name) =>
    symlinkSync(
      `../../.agents/skills/${name}/SKILL.md`,
      path.join(root, `.claude/commands/${name}.md`),
    ),
  );
  const git = (...args) =>
    execFileSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      stdio: 'pipe',
      env: { ...process.env, GIT_OPTIONAL_LOCKS: '0' },
    });
  const write = (file, value) => {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), value);
  };
  const read = (file) => readFileSync(path.join(root, file), 'utf8');
  const change = (file, transform) => write(file, transform(read(file)));
  write('.gitignore', '.tmp\n');
  git('init', '-q');
  git('config', 'user.name', 'Test');
  git('config', 'user.email', 'test@example.invalid');
  git('config', 'core.hooksPath', '/dev/null');
  git('config', 'commit.gpgSign', 'false');
  git('add', '.');
  git('commit', '-qm', 'fixture');
  const run = (args = ['--json']) =>
    spawnSync(process.execPath, [cli, ...args], {
      cwd: root,
      encoding: 'utf8',
    });
  const report = () => checkHarness(root);
  const codes = () => report().diagnostics.map((item) => item.code);
  return { root, git, write, read, change, run, report, codes };
};
test('fresh clone without local state/base refs, detached checkout and CLI JSON pass', (t) => {
  const f = fixture(t);
  assert.equal(existsSync(path.join(f.root, '.tmp')), false);
  f.git('checkout', '--detach', '-q');
  assert.equal(f.run().status, 0);
  assert.equal(JSON.parse(f.run().stdout).ready, true);
  assert.equal(f.run(['--help']).status, 0);
  assert.match(f.run(['--help']).stdout, /읽기 전용/);
  assert.equal(f.run(['--unknown']).status, 2);
  assert.equal(f.run(['--json', '--json']).status, 2);
});
test('missing entry/doc, scripts and spoofed tool entries diagnose file/reason/action', (t) => {
  const f = fixture(t);
  rmSync(path.join(f.root, 'docs/rules/coding-convention.md'));
  f.change('AGENTS.md', (text) =>
    text.replaceAll(
      '(docs/ai-workflow/README.md)',
      '(docs/rules/ai-workflow.md)',
    ),
  );
  f.change('package.json', (text) => {
    const value = JSON.parse(text);
    delete value.scripts.lint;
    value.scripts['workflow:harness-check'] = 'echo success';
    return JSON.stringify(value);
  });
  const result = f.run();
  assert.equal(result.status, 1);
  const report = JSON.parse(result.stdout);
  assert.ok(report.diagnostics.some((item) => item.code === 'entry-link'));
  assert.ok(report.diagnostics.some((item) => item.code === 'missing-script'));
  assert.ok(report.diagnostics.some((item) => item.code === 'script-entry'));
  report.diagnostics.forEach((item) =>
    ['file', 'code', 'reason', 'action'].forEach((key) => assert.ok(item[key])),
  );
});
test('skill frontmatter rejects duplicates, extra fields, empty description and folder mismatch', (t) => {
  const f = fixture(t);
  const file = '.agents/skills/logic-design/SKILL.md';
  const original = f.read(file);
  [
    original.replace(
      'name: logic-design',
      'name: logic-design\nname: logic-design',
    ),
    original.replace('name: logic-design', 'name: other'),
    original.replace(
      'name: logic-design',
      'name: logic-design\nallowed-tools: []',
    ),
    original.replace(/^description:.*$/m, 'description: ""'),
    original.replace(/^---\n/, ''),
  ].forEach((text) => {
    f.write(file, text);
    assert.ok(f.codes().includes('skill-metadata'));
  });
});
test('Claude command rejects wrong target, dangling, regular files and obsolete commands', (t) => {
  const f = fixture(t);
  const command = '.claude/commands/logic-design.md';
  const absolute = path.join(f.root, command);
  [
    '../../.agents/skills/create-pr/SKILL.md',
    '../../.agents/skills/missing/SKILL.md',
  ].forEach((target) => {
    unlinkSync(absolute);
    symlinkSync(target, absolute);
    assert.ok(f.codes().includes('command-link'));
  });
  unlinkSync(absolute);
  f.write(command, f.read('.agents/skills/logic-design/SKILL.md'));
  f.write('.claude/commands/old-command.md', '# old');
  assert.ok(f.codes().includes('command-link'));
  assert.ok(f.codes().includes('extra-command'));
});
test('skill registration missing or duplicate and thin Claude entry violations fail', (t) => {
  const f = fixture(t);
  f.change('AGENTS.md', (text) =>
    text.replace(
      '[`logic-design`](.agents/skills/logic-design/SKILL.md)',
      '`logic-design`',
    ),
  );
  assert.ok(f.codes().includes('skill-routing'));
  f.change('AGENTS.md', (text) =>
    text
      .replace(
        '| Task Type | Skill | Trigger Examples |',
        '| Task Type | Skill | Trigger Examples |',
      )
      .replace(
        '| Design implementation',
        '| Duplicate | [duplicate](.agents/skills/create-pr/SKILL.md) | x |\n| Design implementation',
      ),
  );
  assert.ok(f.codes().includes('skill-routing'));
  f.write('CLAUDE.md', '@AGENTS.md\n@AGENTS.md\n- duplicated policy\n');
  assert.ok(f.codes().includes('claude-entry'));
});
test('Markdown AST checks inline/reference/image local links, skips code and placeholders/external', (t) => {
  const f = fixture(t);
  f.change(
    'docs/rules/ai-workflow.md',
    (text) =>
      `${text}\n\n\`[example](missing.md)\`\n\n\`\`\`md\n[example](missing.md)\n\`\`\`\n\n[placeholder](tasks/{issue}/spec.md)\n[remote](https://example.invalid/never-fetch)\n`,
  );
  assert.equal(f.report().ready, true);
  f.change(
    'docs/rules/ai-workflow.md',
    (text) =>
      `${text}\n[inline](missing.md)\n[reference][bad]\n\n[bad]: other-missing.md\n\n![image](missing.png)\n`,
  );
  assert.equal(
    f.report().diagnostics.filter((item) => item.code === 'markdown-link')
      .length,
    3,
  );
});
test('templates reject missing sections, real identity and actual status/check/review records', (t) => {
  const f = fixture(t);
  f.change('docs/ai-workflow/templates/spec.md', (text) =>
    text.replace('## 목적', '## wrong').replace('#{번호}', '#114'),
  );
  assert.ok(f.codes().includes('spec-structure'));
  assert.ok(f.codes().includes('spec-placeholder'));
  const original = f.read('docs/ai-workflow/templates/status.json');
  [
    (value) => {
      value.issue = 114;
    },
    (value) => {
      value.checks = [{ result: 'passed' }];
    },
    (value) => {
      value.review.result = 'no-blocking-findings';
    },
    (value) => {
      delete value.nextActions;
    },
    (value) => {
      value.acceptance = [{ id: 'AC-1', status: 'met' }];
    },
  ].forEach((mutate) => {
    const value = JSON.parse(original);
    mutate(value);
    f.write('docs/ai-workflow/templates/status.json', JSON.stringify(value));
    assert.ok(f.codes().includes('status-template'));
  });
  f.write('docs/ai-workflow/templates/status.json', '{');
  assert.ok(f.codes().includes('status-template'));
});
test('CI requires actual unconditional commands and order; comments, echo and dynamic/disabled YAML never pass', (t) => {
  const f = fixture(t);
  const file = '.github/workflows/ci.yml';
  const original = f.read(file);
  const changes = [
    (text) => text.replace('    runs-on: ubuntu-latest\n', ''),
    (text) => text.replace('runs-on: ubuntu-latest', 'runs-on: invalid-runner'),
    (text) =>
      text.replace(
        'run: pnpm run workflow:test',
        'uses: actions/checkout@v4\n        run: pnpm run workflow:test',
      ),
    (text) =>
      text.replace(
        'uses: actions/checkout@v4',
        'uses: actions/checkout@v4\n        with:\n          path: other-checkout',
      ),
    (text) =>
      text.replace(
        "cache: 'pnpm'",
        "cache: 'pnpm'\n          node-version-file: other-node-version",
      ),
    (text) =>
      text.replace(
        'run: pnpm run workflow:test',
        '# run: pnpm run workflow:test',
      ),
    (text) =>
      text.replace(
        'run: pnpm run workflow:test',
        'run: echo pnpm run workflow:test',
      ),
    (text) =>
      text.replace(
        'run: pnpm run workflow:test',
        'if: false\n        run: pnpm run workflow:test',
      ),
    (text) =>
      text.replace(
        'run: pnpm run workflow:test',
        'continue-on-error: true\n        run: pnpm run workflow:test',
      ),
    (text) =>
      text.replace(
        '    runs-on: ubuntu-latest',
        '    if: false\n    runs-on: ubuntu-latest',
      ),
    (text) =>
      text.replace(
        '    runs-on: ubuntu-latest',
        '    continue-on-error: true\n    runs-on: ubuntu-latest',
      ),
    (text) =>
      text.replace(
        'branches: [develop]',
        'branches: [develop]\n    paths: [src/**]',
      ),
    (text) =>
      text.replace(
        'branches: [develop]',
        'branches: [develop]\n    paths-ignore: [docs/**]',
      ),
    (text) => text.replace('pull_request:', 'workflow_dispatch:'),
    (text) =>
      text.replace('run: pnpm run workflow:test', 'run: ${{ inputs.command }}'),
    (text) =>
      text.replace(
        'run: pnpm run workflow:test',
        'run: pnpm run workflow:pr-check',
      ),
    (text) =>
      text.replace('run: pnpm run workflow:test', 'run: pnpm workflow:test'),
    (text) =>
      text
        .replace('pnpm run workflow:test', 'pnpm run lint')
        .replace(
          'pnpm run lint\n\n      - name: Type',
          'pnpm run workflow:test\n\n      - name: Type',
        ),
    (text) => text.replace('node-version: 22', 'node-version: 24'),
    (text) => text.replace('version: 10', 'version: 9'),
    () => 'jobs: [broken',
  ];
  changes.forEach((change) => {
    f.write(file, change(original));
    assert.ok(f.codes().includes('ci-contract'), f.read(file));
  });
});
test('no content/index/mtime writes, no local-state reads, missing Git/ignore and tracked tmp diagnose', (t) => {
  const f = fixture(t);
  // A broken local-state link is deliberately unreadable and irrelevant.
  mkdirSync(path.join(f.root, '.tmp'));
  symlinkSync('/missing/local-state', path.join(f.root, '.tmp/status.json'));
  const files = ['AGENTS.md', 'package.json', '.git/index'];
  const before = files.map((file) => ({
    data: readFileSync(path.join(f.root, file)),
    mtime: lstatSync(path.join(f.root, file)).mtimeMs,
  }));
  assert.equal(f.run().status, 0);
  files.forEach((file, index) => {
    assert.deepEqual(readFileSync(path.join(f.root, file)), before[index].data);
    assert.equal(
      lstatSync(path.join(f.root, file)).mtimeMs,
      before[index].mtime,
    );
  });
  assert.equal(existsSync(path.join(f.root, '.git/index.lock')), false);
  f.write('.tmp/tracked.txt', 'local');
  f.git('add', '-f', '.tmp/tracked.txt');
  assert.ok(f.codes().includes('tracked-local-state'));
  f.write('.gitignore', '');
  assert.ok(f.codes().includes('local-ignore'));
  rmSync(path.join(f.root, '.git'), { recursive: true });
  assert.equal(f.run().status, 1);
  assert.ok(f.codes().includes('git-read'));
});
test('routing must be in routing table, YAML metadata is not Markdown, template links and canonical cycles', (t) => {
  const f = fixture(t);
  const agents = f.read('AGENTS.md');
  f.write(
    'AGENTS.md',
    agents.replace(
      '[`logic-design`](.agents/skills/logic-design/SKILL.md)',
      '`logic-design`',
    ) + '\n[elsewhere](.agents/skills/logic-design/SKILL.md)\n',
  );
  assert.ok(f.codes().includes('skill-routing'));
  f.write('AGENTS.md', agents);
  f.change('.agents/skills/logic-design/SKILL.md', (text) =>
    text.replace(/^description:.*$/m, 'description: "[metadata](missing.md)"'),
  );
  assert.equal(f.report().ready, true);
  f.change(
    'docs/ai-workflow/templates/spec.md',
    (text) => `${text}\n[template](missing-template.md)\n`,
  );
  assert.ok(f.codes().includes('markdown-link'));
  f.change('docs/ai-workflow/templates/spec.md', (text) =>
    text.replace('\n[template](missing-template.md)\n', '\n'),
  );
  f.write('docs/rules/cycle.md', '[again](loop/cycle.md)\n');
  symlinkSync('.', path.join(f.root, 'docs/rules/loop'));
  f.change(
    'docs/rules/ai-workflow.md',
    (text) => `${text}\n[cycle](cycle.md)\n`,
  );
  assert.equal(f.report().ready, true);
});

test('shared symlink aliases to local state are rejected without traversing its content', (t) => {
  const f = fixture(t);
  f.write('.tmp/local.md', '[private content](missing-private.md)\n');
  symlinkSync(
    '../../.tmp/local.md',
    path.join(f.root, 'docs/rules/local-alias.md'),
  );
  f.change(
    'docs/rules/ai-workflow.md',
    (text) => `${text}\n[alias](local-alias.md)\n`,
  );
  const diagnostics = f.report().diagnostics;
  assert.ok(diagnostics.some((item) => item.reason.includes('.tmp')));
  assert.ok(
    !diagnostics.some((item) => item.reason.includes('missing-private.md')),
  );
});
