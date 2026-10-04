# Branch Review (Codex + Claude Shared Setup)

This setup gives both agents the same local, diff-based pre-push review workflow.

## What is shared

- Scope collector script: `tools/branch-review/collect_scope.sh`
- Output artifacts:
  - `.tmp/branch-review/files.txt`
  - `.tmp/branch-review/commits.txt`
  - `.tmp/branch-review/diff.patch` (committed)
  - `.tmp/branch-review/staged.patch`
  - `.tmp/branch-review/unstaged.patch`
  - `.tmp/branch-review/untracked.patch`
  - `.tmp/branch-review/files.json`
  - `.tmp/branch-review/summary.md`

## Run manually

The default base ref is `origin/develop` for feature work.

```bash
pnpm review:scope
```

Or with a custom base ref:

```bash
bash ./tools/branch-review/collect_scope.sh origin/main
```

## Record a task review

For a linked task with a spec, start before inspecting changes:

```bash
pnpm workflow:review --start
```

Read all patches and relevant files in the printed session directory, then fill
`input.json` with the actual result, findings, focus points, unverified items,
and next actions. Preserve the generated subject and scope. Save using:

```bash
pnpm workflow:review --input .tmp/ai-workflow/tasks/{issue}/reviews/{session}/input.json
```

The command compares the start snapshot with current code. Changes during review
produce `needs-recheck`; unresolved High/Medium findings require `changes-required`.
Prior unresolved findings must remain with their resolution status. Previous reviews
remain in local history. This records agent judgment; it does not perform the review.
Use `--issue {number}` or `--base {ref}` when needed. For unlinked or explicitly
read-only tasks, use the collector or direct Git reads and report findings without
writing task state. See [Task Records](../ai-workflow/README.md) for limits.

## Skill-specific wrappers

- Codex skill: `.agents/skills/branch-review/SKILL.md`
- Claude command: `.claude/commands/branch-review.md`

## How to show "skill is active"

Use this marker at the top of any review response:

`[SKILL ACTIVE] branch-review`

The collector script also prints the same marker so terminal logs and agent responses stay aligned.

## Review criteria and completion

Apply [AI Development Workflow](../rules/ai-workflow.md).
User focus points supplement the default criteria. If none are provided,
proceed with the default criteria and report "기본 리뷰 기준 적용".

The collector includes committed, staged, unstaged, and untracked changes in
separate patches. Inspect actual files and binary contents as needed.
Output must be inside the repository `.tmp` directory.
The collector rejects symlinks in the output directory path and existing artifact
files before writing. It resolves the repository path and verifies the final
directory remains inside its real `.tmp` directory.
Report the base ref, reviewed scope, findings, and unverified items.
Recheck affected findings and validations after code changes.
Unresolved High/Medium defects prevent a PR-ready assessment.
