import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import test from 'node:test';
import { fileURLToPath, URL } from 'node:url';

const source = fileURLToPath(new URL('../../', import.meta.url));

test('real CLI lifecycle: absent evidence, recorded harness, saved review, ready docs, then stale spec blocks', (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'keeply-workflow-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (file, content) => {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), content);
  };
  const read = (file) => readFileSync(path.join(root, file), 'utf8');
  const json = (file) => JSON.parse(read(file));
  const git = (...args) =>
    execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: 'pipe' });
  const run = (script, ...args) =>
    spawnSync(process.execPath, [`tools/ai-workflow/${script}.mjs`, ...args], {
      cwd: root,
      encoding: 'utf8',
      timeout: 60000,
    });
  const expectExit = (result, expected) => {
    assert.equal(result.status, expected, `${result.stdout}\n${result.stderr}`);
    return result;
  };
  const resume = () =>
    JSON.parse(expectExit(run('resume', '--json'), 0).stdout);
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
  mkdirSync(path.join(root, '.claude/commands'), { recursive: true });
  readdirSync(path.join(root, '.agents/skills')).forEach((name) =>
    symlinkSync(
      `../../.agents/skills/${name}/SKILL.md`,
      path.join(root, `.claude/commands/${name}.md`),
    ),
  );
  // Use installed parsers without installing dependencies or contacting a remote.
  symlinkSync(
    path.join(source, 'node_modules'),
    path.join(root, 'node_modules'),
  );
  write('.gitignore', '.tmp\nnode_modules\n');
  git('init', '-q');
  git('config', 'user.name', 'Test');
  git('config', 'user.email', 'test@example.invalid');
  git('config', 'core.hooksPath', '/dev/null');
  git('config', 'commit.gpgSign', 'false');
  git('add', '.');
  git('commit', '-qm', 'shared harness baseline');
  git('update-ref', 'refs/remotes/origin/develop', 'HEAD');
  const branch = 'docs/workflow-guide/#900';
  git('switch', '-qc', branch);
  const specPath = 'docs/ai-workflow/tasks/900/spec.md';
  const statePath = '.tmp/ai-workflow/tasks/900/status.json';
  const spec = read('docs/ai-workflow/templates/spec.md')
    .replace('#{번호} / {URL}', '[#900](https://example.invalid/issues/900)')
    .replace('{브랜치명}', `\`${branch}\``)
    .replace(
      '{사용자가 확인할 수 있는 완료 기준}',
      '문서 변경을 실제 하네스로 검증하고 준비 상태를 확인한다.',
    );
  write(specPath, spec);
  write(
    'docs/rules/lifecycle-note.md',
    '# 통합 사례\n\n문서 작업의 검증 흐름.\n',
  );
  git('add', '.');
  git('commit', '-qm', 'document task');

  assert.equal(resume().issue, 900);
  assert.equal(existsSync(path.join(root, statePath)), false);
  expectExit(run('harness-check', '--json'), 0);
  assert.equal(existsSync(path.join(root, '.tmp')), false);
  const absent = JSON.parse(expectExit(run('pr-check', '--json'), 1).stdout);
  assert.equal(absent.ready, false);

  expectExit(run('record', 'check', '--script', 'workflow:harness-check'), 0);
  const state = json(statePath);
  assert.equal(state.checks.at(-1).result, 'passed');
  assert.match(read(state.checks.at(-1).evidence[0]), /하네스 검사: passed/);
  assert.equal(
    state.acceptance.some((item) => item.status === 'met'),
    false,
  );
  const missing = JSON.parse(expectExit(run('pr-check', '--json'), 1).stdout);
  assert.ok(missing.blockers.some((item) => item.code === 'acceptance:AC-1'));

  const started = expectExit(run('record', 'review', '--start'), 0);
  const inputPath = started.stdout.match(/리뷰 시작: (.+\/input\.json)/)[1];
  const input = json(inputPath);
  assert.ok(input.scope.includes(specPath));
  assert.ok(input.scope.includes('docs/rules/lifecycle-note.md'));
  assert.match(
    read(inputPath.replace('input.json', 'diff.patch')),
    /통합 사례/,
  );
  input.result = 'no-blocking-findings';
  input.focusPoints = ['fixture document lifecycle'];
  input.findings = [];
  input.unverified = [];
  input.nextActions = ['read-only readiness'];
  write(inputPath, `${JSON.stringify(input)}\n`);
  expectExit(run('record', 'review', '--input', inputPath), 0);
  assert.equal(json(statePath).review.freshness, 'current');

  // These assertions are fixture observations, not an automatic production review.
  const current = resume().subject;
  const reviewed = json(statePath);
  const evidence = '.tmp/ai-workflow/tasks/900/docs-review.log';
  write(
    evidence,
    'Observed new spec and lifecycle note in collected patch; actual harness passed. Document-only fixture.\n',
  );
  const common = {
    subject: current,
    freshness: 'current',
    checkedAt: new Date().toISOString(),
  };
  reviewed.acceptance = [
    { ...common, id: 'AC-1', status: 'met', evidence: [evidence] },
  ];
  reviewed.checks.push({
    ...common,
    id: 'docs-review',
    command: 'manual docs review',
    result: 'passed',
    exitCode: 0,
    evidence: [evidence],
  });
  ['lint', 'check-types', 'build'].forEach((id) =>
    reviewed.checks.push({
      ...common,
      id,
      command: `pnpm ${id}`,
      result: 'not-applicable',
      reason: 'Only spec and document changed relative to shared baseline.',
      evidence: [],
    }),
  );
  write(statePath, `${JSON.stringify(reviewed)}\n`);
  const before = read(statePath);
  const ready = JSON.parse(expectExit(run('pr-check', '--json'), 0).stdout);
  assert.equal(ready.ready, true);
  assert.deepEqual(ready.kinds, ['docs']);
  assert.equal(read(statePath), before);

  write(specPath, spec.replace('specRevision: 1', 'specRevision: 2'));
  const stale = JSON.parse(expectExit(run('pr-check', '--json'), 1).stdout);
  assert.equal(stale.ready, false);
  assert.ok(stale.blockers.some((item) => item.code === 'dirty'));
  assert.ok(
    stale.checks.some(
      (item) => item.id === 'workflow:harness-check' && !item.ready,
    ),
  );
  assert.equal(resume().review.effectiveFreshness, 'needs-recheck');
  assert.equal(read(statePath), before);
});
