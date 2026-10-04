import { spawnSync } from 'node:child_process';
import {
  lstatSync,
  readFileSync,
  readdirSync,
  realpathSync,
  readlinkSync,
} from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { parseDocument } from 'yaml';

// Finite structural contract: prose meaning and application behavior need human review.
const ENTRY_LINKS = [
  'docs/rules/coding-convention.md',
  'docs/rules/git-convention.md',
  'docs/rules/ai-workflow.md',
  'docs/ai-workflow/README.md',
  'docs/branch-review/README.md',
  '.agents/checklists/preflight.md',
  '.agents/checklists/postflight.md',
  '.agents/checklists/debrief.md',
];
const SCRIPTS = {
  lint: 'eslint . --max-warnings 0',
  'check-types': 'tsc -b --noEmit',
  build: 'tsc -b && vite build',
  'review:scope': 'bash ./tools/branch-review/collect_scope.sh',
  'workflow:resume': 'node tools/ai-workflow/resume.mjs',
  'workflow:check': 'node tools/ai-workflow/record.mjs check',
  'workflow:review': 'node tools/ai-workflow/record.mjs review',
  'workflow:pr-check': 'node tools/ai-workflow/pr-check.mjs',
  'workflow:harness-check': 'node tools/ai-workflow/harness-check.mjs',
  'workflow:test': 'node --test tools/ai-workflow/*.test.mjs',
};
const CI_COMMANDS = [
  'pnpm install --frozen-lockfile',
  ...[
    'workflow:harness-check',
    'workflow:test',
    'lint',
    'check-types',
    'build',
  ].map((name) => `pnpm run ${name}`),
];
const SPEC_HEADINGS = [
  '연결 정보',
  '목적',
  '작업 범위',
  '설계 결정',
  '완료 조건',
  '검증 방법',
  '미결정 사항',
  '주요 설계 변경',
];
const INITIAL_STATUS = {
  schemaVersion: 1,
  issue: null,
  branch: null,
  specPath: null,
  specRevision: null,
  phase: 'design',
  updatedAt: null,
  nextActions: [],
  blockers: [],
  acceptance: [],
  checks: [],
  reviewHistory: [],
  review: {
    result: 'not-run',
    freshness: 'unknown',
    reviewedAt: null,
    subject: null,
    scope: [],
    focusPoints: [],
    findings: [],
    unverified: [],
  },
};
const equal = (actual, expected) => {
  if (actual === expected) return true;
  if (
    !actual ||
    !expected ||
    typeof actual !== 'object' ||
    typeof expected !== 'object'
  )
    return false;
  const keys = Object.keys(expected);
  return (
    Array.isArray(actual) === Array.isArray(expected) &&
    Object.keys(actual).length === keys.length &&
    keys.every((key) => equal(actual[key], expected[key]))
  );
};
const parseYaml = (text) => {
  const doc = parseDocument(text, { uniqueKeys: true });
  if (doc.errors.length)
    throw new Error(doc.errors.map((error) => error.message).join('; '));
  return doc.toJS({ maxAliasCount: 20 });
};
export const checkHarness = (root) => {
  root = realpathSync(root);
  const diagnostics = [];
  const add = (file, code, reason, action) =>
    diagnostics.push({ file, code, reason, action });
  const hasLocalStateTarget = (resolved) =>
    resolved === path.join(root, '.tmp') ||
    resolved.startsWith(`${path.join(root, '.tmp')}${path.sep}`);
  const read = (file) => {
    try {
      const absolute = path.resolve(root, file);
      const resolved = realpathSync(absolute);
      if (hasLocalStateTarget(resolved))
        throw new Error('로컬 .tmp 내용은 공유 검사에서 읽지 않습니다.');
      if (
        !resolved.startsWith(`${root}${path.sep}`) ||
        !lstatSync(resolved).isFile()
      )
        throw new Error('저장소 내부 일반 파일이 아닙니다.');
      return readFileSync(absolute, 'utf8');
    } catch (error) {
      add(
        file,
        'file',
        error.message,
        '저장소 내부의 실제 파일과 연결을 복구하세요.',
      );
      return null;
    }
  };
  const list = (directory) => {
    try {
      return readdirSync(path.join(root, directory)).sort();
    } catch (error) {
      add(directory, 'directory', error.message, '필수 폴더를 복구하세요.');
      return [];
    }
  };
  const markdowns = new Map();
  const queue = [
    'AGENTS.md',
    ...ENTRY_LINKS,
    'docs/ai-workflow/templates/spec.md',
  ];
  const visitedMarkdown = new Set();
  const getMarkdown = (file) => {
    if (markdowns.has(file)) return markdowns.get(file);
    const content = read(file);
    if (content === null) {
      markdowns.set(file, null);
      return null;
    }
    const links = [];
    const headings = [];
    const body = file.endsWith('/SKILL.md')
      ? content.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
      : content;
    const tokens = marked.lexer(body);
    marked.walkTokens(tokens, (token) => {
      if (token.type === 'link' || token.type === 'image')
        links.push(token.href);
      if (token.type === 'heading')
        headings.push({ depth: token.depth, text: token.text });
    });
    const result = { content, links, headings, tokens };
    markdowns.set(file, result);
    return result;
  };
  const agents = getMarkdown('AGENTS.md');
  ENTRY_LINKS.forEach((file) => {
    if (!agents?.links.includes(file))
      add(
        'AGENTS.md',
        'entry-link',
        `필수 진입 링크 누락: ${file}`,
        '실제 Markdown 링크로 등록하세요.',
      );
  });
  const claude = read('CLAUDE.md');
  if (claude !== null) {
    const lines = claude
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    if (
      lines.filter((line) => line === '@AGENTS.md').length !== 1 ||
      lines.some((line) => line !== '@AGENTS.md' && !/^# [^#]+$/.test(line))
    )
      add(
        'CLAUDE.md',
        'claude-entry',
        '얇은 진입점은 선택적 H1 제목과 @AGENTS.md 하나만 지원합니다.',
        '공통 규칙은 AGENTS.md 또는 연결 문서로 옮기세요.',
      );
  }
  const routingLinks = [];
  const routingStart =
    agents?.tokens.findIndex(
      (token) =>
        token.type === 'heading' &&
        token.depth === 2 &&
        token.text === 'Skill Routing',
    ) ?? -1;
  if (routingStart < 0)
    add(
      'AGENTS.md',
      'routing-section',
      '필수 Skill Routing H2가 없습니다.',
      '스킬 라우팅 섹션과 표를 복구하세요.',
    );
  else {
    const section = agents.tokens.slice(routingStart + 1);
    const end = section.findIndex(
      (token) => token.type === 'heading' && token.depth <= 2,
    );
    marked.walkTokens(
      (end < 0 ? section : section.slice(0, end)).filter(
        (token) => token.type === 'table',
      ),
      (token) => {
        if (token.type === 'link') routingLinks.push(token.href);
      },
    );
  }
  const skills = list('.agents/skills');
  if (!skills.length)
    add(
      '.agents/skills',
      'skills-empty',
      '등록된 스킬이 없습니다.',
      '프로젝트 스킬을 복구하세요.',
    );
  skills.forEach((name) => {
    const file = `.agents/skills/${name}/SKILL.md`;
    queue.push(file);
    const doc = getMarkdown(file);
    if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name))
      add(
        file,
        'skill-name',
        '폴더명이 lowercase kebab-case가 아닙니다.',
        '스킬명과 폴더명을 일치시키세요.',
      );
    if (doc) {
      try {
        const frontmatter = doc.content.match(
          /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
        );
        if (!frontmatter)
          throw new Error('파일 시작 YAML frontmatter가 없습니다.');
        const meta = parseYaml(frontmatter[1]);
        if (
          !meta ||
          Array.isArray(meta) ||
          Object.keys(meta).sort().join(',') !== 'description,name' ||
          meta.name !== name ||
          typeof meta.description !== 'string' ||
          !meta.description.trim()
        )
          throw new Error(
            'name/description 두 필드만 허용하며 name은 폴더명, description은 비어 있지 않은 문자열이어야 합니다.',
          );
      } catch (error) {
        add(
          file,
          'skill-metadata',
          error.message,
          '중복/추가 필드를 제거하고 스킬 메타데이터를 복구하세요.',
        );
      }
    }
    if (routingLinks.filter((link) => link === file).length !== 1)
      add(
        'AGENTS.md',
        'skill-routing',
        `스킬 링크는 정확히 하나 필요합니다: ${file}`,
        'Skill Routing에 실제 스킬 링크를 등록하세요.',
      );
    const command = `.claude/commands/${name}.md`;
    try {
      const absolute = path.join(root, command);
      if (!lstatSync(absolute).isSymbolicLink())
        throw new Error('심볼릭 링크가 아닙니다.');
      if (
        path.resolve(path.dirname(absolute), readlinkSync(absolute)) !==
          path.join(root, file) ||
        realpathSync(absolute) !== realpathSync(path.join(root, file))
      )
        throw new Error(
          '정확한 스킬 원본을 가리키지 않거나 링크가 깨졌습니다.',
        );
    } catch (error) {
      add(
        command,
        'command-link',
        error.message,
        `심볼릭 링크를 ${file} 원본으로 복구하세요.`,
      );
    }
  });
  list('.claude/commands').forEach((name) => {
    if (!name.endsWith('.md') || !skills.includes(name.slice(0, -3)))
      add(
        `.claude/commands/${name}`,
        'extra-command',
        '대응 스킬이 없는 과거/불필요 command입니다.',
        '단일 스킬 원본과 command 목록을 일치시키세요.',
      );
  });
  routingLinks
    .filter((link) => link.startsWith('.agents/skills/'))
    .forEach((link) => {
      if (!skills.some((name) => link === `.agents/skills/${name}/SKILL.md`))
        add(
          'AGENTS.md',
          'extra-routing',
          `실제 스킬과 다른 등록: ${link}`,
          '실제 스킬과 라우팅을 일치시키세요.',
        );
    });
  for (let i = 0; i < queue.length; i += 1) {
    const file = queue[i];
    try {
      const canonical = realpathSync(path.join(root, file));
      if (visitedMarkdown.has(canonical)) continue;
      visitedMarkdown.add(canonical);
    } catch {
      /* getMarkdown provides the missing-file diagnostic. */
    }
    const doc = getMarkdown(file);
    doc?.links.forEach((href) => {
      if (
        !href ||
        href.startsWith('#') ||
        /^[a-z][a-z\d+.-]*:/i.test(href) ||
        href.startsWith('//') ||
        /[{}<>]/.test(href)
      )
        return;
      try {
        const local = decodeURIComponent(href.split(/[?#]/)[0]);
        const absolute = path.resolve(
          path.dirname(path.join(root, file)),
          local,
        );
        const relative = path
          .relative(root, absolute)
          .split(path.sep)
          .join('/');
        if (relative === '.tmp' || relative.startsWith('.tmp/'))
          throw new Error(
            '로컬 .tmp 증적은 공유 문서 링크 검사 대상이 아닙니다.',
          );
        const resolved = realpathSync(absolute);
        if (hasLocalStateTarget(resolved))
          throw new Error(
            '로컬 .tmp를 가리키는 링크는 공유 검사에서 읽지 않습니다.',
          );
        if (
          !resolved.startsWith(`${root}${path.sep}`) ||
          !lstatSync(resolved).isFile()
        )
          throw new Error('저장소 내부 실제 파일이 아닙니다.');
        if (relative.endsWith('.md') && !queue.includes(relative))
          queue.push(relative);
      } catch (error) {
        add(
          file,
          'markdown-link',
          `로컬 링크 ${href}: ${error.message}`,
          '실제 링크 대상을 복구하거나 예제는 코드 블록/placeholder로 표시하세요.',
        );
      }
    });
  }
  let scripts;
  const packageText = read('package.json');
  if (packageText !== null) {
    try {
      scripts = JSON.parse(packageText).scripts;
      if (!scripts || typeof scripts !== 'object')
        throw new Error('scripts 객체가 없습니다.');
      [...Object.keys(SCRIPTS), 'lint', 'check-types', 'build'].forEach(
        (name) => {
          if (typeof scripts[name] !== 'string' || !scripts[name].trim())
            add(
              'package.json',
              'missing-script',
              `명령 누락: ${name}`,
              '공통 package script를 복구하세요.',
            );
          else if (SCRIPTS[name] && scripts[name] !== SCRIPTS[name])
            add(
              'package.json',
              'script-entry',
              `도구 연결 불일치: ${name}`,
              `명령을 ${SCRIPTS[name]}로 연결하세요.`,
            );
        },
      );
      Object.entries(SCRIPTS)
        .filter(
          ([name, command]) =>
            (name.startsWith('workflow:') && !command.includes('*')) ||
            name === 'review:scope',
        )
        .map(([, command]) => command)
        .forEach((command) => read(command.split(' ')[1].replace(/^\.\//, '')));
      if (!list('tools/ai-workflow').some((file) => file.endsWith('.test.mjs')))
        add(
          'tools/ai-workflow',
          'test-entry',
          'workflow:test 실행 대상이 없습니다.',
          '도구 테스트 파일을 복구하세요.',
        );
    } catch (error) {
      add(
        'package.json',
        'package-format',
        error.message,
        '유효한 JSON/scripts 구조를 복구하세요.',
      );
    }
  }
  const specFile = 'docs/ai-workflow/templates/spec.md';
  const spec = getMarkdown(specFile);
  if (spec) {
    SPEC_HEADINGS.forEach((heading) => {
      if (
        spec.headings.filter(
          (item) => item.depth === 2 && item.text === heading,
        ).length !== 1
      )
        add(
          specFile,
          'spec-structure',
          `필수 H2 누락/중복: ${heading}`,
          '공유 명세 템플릿 구조를 복구하세요.',
        );
    });
    ['포함', '제외'].forEach((heading) => {
      if (
        spec.headings.filter(
          (item) => item.depth === 3 && item.text === heading,
        ).length !== 1
      )
        add(
          specFile,
          'spec-structure',
          `필수 H3 누락/중복: ${heading}`,
          '작업 범위 하위 구조를 복구하세요.',
        );
    });
    if (
      !/^- 이슈: #\{[^}]+\} \/ \{[^}]+\}$/m.test(spec.content) ||
      !/^- 브랜치: \{[^}]+\}$/m.test(spec.content) ||
      !/^- specRevision: 1$/m.test(spec.content) ||
      !/^- AC-1: \{[^}]+\}$/m.test(spec.content)
    )
      add(
        specFile,
        'spec-placeholder',
        '초기 연결 정보/AC placeholder가 손상되거나 실제 값이 들어 있습니다.',
        '공유 템플릿은 이슈/브랜치/완료 조건을 입력용 placeholder로 유지하세요.',
      );
  }
  const statusFile = 'docs/ai-workflow/templates/status.json';
  const statusText = read(statusFile);
  if (statusText !== null) {
    try {
      if (!equal(JSON.parse(statusText), INITIAL_STATUS))
        throw new Error(
          '필수 초기 구조와 빈값이 다릅니다. 실제 작업 ID/증적/완료 값과 추가 필드는 허용하지 않습니다.',
        );
    } catch (error) {
      add(
        statusFile,
        'status-template',
        error.message,
        'schemaVersion 1, design/not-run/unknown 및 null/빈 배열의 공유 초기 구조를 복구하세요.',
      );
    }
  }
  const ciFile = '.github/workflows/ci.yml';
  const ciText = read(ciFile);
  if (ciText !== null) {
    try {
      const ci = parseYaml(ciText);
      if (
        !ci ||
        !ci.on?.pull_request ||
        !Array.isArray(ci.on.pull_request.branches) ||
        !equal(ci.on.pull_request.branches, ['develop']) ||
        Object.keys(ci.on.pull_request).some((key) => key !== 'branches') ||
        !ci.jobs ||
        Object.keys(ci.jobs).join(',') !== 'ci'
      )
        throw new Error(
          '지원 계약: develop pull_request와 단일 ci job이 필요합니다.',
        );
      const job = ci.jobs.ci;
      if (
        !job ||
        job['runs-on'] !== 'ubuntu-latest' ||
        job.if !== undefined ||
        job['continue-on-error'] !== undefined ||
        job.strategy !== undefined ||
        job['working-directory'] !== undefined ||
        job.needs !== undefined ||
        job.container !== undefined ||
        job.env !== undefined ||
        ci.env !== undefined ||
        ci.defaults !== undefined ||
        job.defaults !== undefined ||
        !Array.isArray(job.steps)
      )
        throw new Error(
          'ubuntu-latest와 조건/전략/defaults 없는 정적 ci.steps 구조만 지원합니다.',
        );
      if (job.steps.some((step) => !step || typeof step !== 'object'))
        throw new Error('step은 객체여야 합니다.');
      const actionInputs = {
        'actions/checkout@v4': {},
        'pnpm/action-setup@v4': { version: 10 },
        'actions/setup-node@v4': { 'node-version': 22, cache: 'pnpm' },
      };
      if (
        job.steps.some(
          (step) =>
            (step.run === undefined) === (step.uses === undefined) ||
            (step.run !== undefined && step.with !== undefined) ||
            (step.uses !== undefined &&
              (!Object.hasOwn(actionInputs, step.uses) ||
                !equal(step.with ?? {}, actionInputs[step.uses]))),
        )
      )
        throw new Error(
          'step은 run 또는 지원하는 uses 하나만 가지며 action 입력은 현재 setup 계약과 일치해야 합니다.',
        );
      if (
        job.steps.some(
          (step) =>
            step.if !== undefined ||
            step['continue-on-error'] !== undefined ||
            step['working-directory'] !== undefined ||
            step.shell !== undefined ||
            step.env !== undefined ||
            (step.run !== undefined &&
              (typeof step.run !== 'string' ||
                !CI_COMMANDS.includes(step.run.trim()))),
        )
      )
        throw new Error(
          '조건/continue-on-error/shell/env/작업경로/동적 또는 미지원 run은 지원하지 않습니다.',
        );
      const requiredSteps = job.steps.filter(
        (step) =>
          typeof step.run === 'string' &&
          CI_COMMANDS.includes(step.run.trim()) &&
          step.if === undefined &&
          step['continue-on-error'] === undefined &&
          step['working-directory'] === undefined,
      );
      const commands = requiredSteps.map((step) => step.run.trim());
      if (!equal(commands, CI_COMMANDS))
        throw new Error(
          `필수 unconditional 직접 실행 순서: ${CI_COMMANDS.join(' → ')}`,
        );
      if (
        job.steps.some(
          (step) =>
            typeof step.run === 'string' &&
            /workflow:(?:pr-check|check)(?:\s|$)/.test(step.run),
        )
      )
        throw new Error(
          'CI에서 로컬 상태용 workflow:check/pr-check는 실행하지 않습니다.',
        );
      const installIndex = job.steps.indexOf(requiredSteps[0]);
      const pnpmSetup = job.steps.findIndex(
        (step) =>
          step.uses === 'pnpm/action-setup@v4' &&
          String(step.with?.version) === '10' &&
          step.if === undefined,
      );
      const nodeSetup = job.steps.findIndex(
        (step) =>
          step.uses === 'actions/setup-node@v4' &&
          String(step.with?.['node-version']) === '22' &&
          step.if === undefined,
      );
      const checkout = job.steps.findIndex(
        (step) => step.uses === 'actions/checkout@v4' && step.if === undefined,
      );
      if (
        [pnpmSetup, nodeSetup, checkout].some(
          (index) => index < 0 || index >= installIndex,
        )
      )
        throw new Error(
          'install 전 unconditional checkout/pnpm 10/Node 22 setup이 필요합니다.',
        );
    } catch (error) {
      add(
        ciFile,
        'ci-contract',
        error.message,
        '지원하는 정적 YAML 구조와 실제 필수 명령 순서로 수정하세요.',
      );
    }
  }
  const git = (args) =>
    spawnSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, GIT_OPTIONAL_LOCKS: '0' },
    });
  const tracked = git(['ls-files', '-z', '--', '.tmp']);
  if (tracked.status !== 0)
    add(
      '.git',
      'git-read',
      tracked.stderr.trim(),
      'Git 저장소에서 읽기 전용 검사를 실행하세요.',
    );
  else if (tracked.stdout)
    add(
      '.tmp',
      'tracked-local-state',
      '.tmp 파일이 Git에 추적됩니다.',
      '로컬 증적의 Git 추적을 제거하고 ignore 규칙을 복구하세요.',
    );
  const ignored = git([
    'check-ignore',
    '-q',
    '--no-index',
    '--',
    '.tmp/ai-workflow/harness-ignore-probe',
  ]);
  if (ignored.status !== 0)
    add(
      '.gitignore',
      'local-ignore',
      '.tmp 로컬 증적의 ignore 규칙이 없습니다.',
      '.tmp 경로의 Git ignore 규칙을 복구하세요.',
    );
  return {
    status: diagnostics.length ? 'failed' : 'passed',
    ready: diagnostics.length === 0,
    diagnostics,
    limitations: [
      '공유 하네스의 명시된 파일 구조/연결만 검사합니다. 자연어 의미, AC 충족, 실제 앱 동작은 검토하지 않습니다.',
      'Markdown AST의 실제 local 파일 링크만 확인합니다. 코드 예제, placeholder, 외부 URL, fragment anchor의 유효성은 검사하지 않습니다.',
      'CI는 develop pull_request의 단일 정적 ci job과 unconditional 직접 pnpm run 명령만 지원합니다. 동적/조건/defaults/전략 구조는 수동 검토가 필요하며 차단합니다.',
      '.tmp 내용, 작업 상태, feature branch, 기준 ref는 읽거나 요구하지 않습니다. Git 추적/ignore만 확인합니다.',
    ],
  };
};
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const args = process.argv.slice(2);
    if (
      new Set(args).size !== args.length ||
      args.some((arg) => !['--json', '--help'].includes(arg))
    )
      throw new Error('지원 인자: --json, --help (중복 불가)');
    if (args.includes('--help'))
      process.stdout.write(
        'workflow:harness-check [--json] [--help]\n읽기 전용 공유 하네스 검사. passed=0, 진단=1, 인자/실행 오류=2. 자동 수정/상태 기록 없음.\n',
      );
    else {
      const result = checkHarness(process.cwd());
      process.stdout.write(
        args.includes('--json')
          ? `${JSON.stringify(result, null, 2)}\n`
          : [
              `하네스 검사: ${result.status}`,
              ...result.diagnostics.map(
                (item) =>
                  `${item.file} [${item.code}]: ${item.reason}\n  조치: ${item.action}`,
              ),
              ...result.limitations.map((line) => `한계: ${line}`),
            ].join('\n') + '\n',
      );
      process.exitCode = result.ready ? 0 : 1;
    }
  } catch (error) {
    process.stderr.write(`하네스 검사 오류: ${error.message}\n`);
    process.exitCode = 2;
  }
}
