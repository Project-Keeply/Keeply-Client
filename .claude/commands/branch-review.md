---
name: branch-review
description: Diff-based local branch review before push. Use for "code review", "pre-push review", or when focus-point review is requested (DX, base component reusability, FSD fit, hook extraction).
---

# branch-review command

Perform a selective review for the current branch only.

## 1) Collect user focus points (mandatory)

Ask:
- "Which review focus points should I use for this branch?"

Rules:
- Do not proceed without explicit user input.
- If the user does not provide focus points, ask again and stop.
- Print the exact user input in the final report under `Review Focus Points (User Input)`.

## 2) Build review scope

Run:

```bash
bash ./tools/branch-review/collect_scope.sh
```

Optional base ref:

```bash
bash ./tools/branch-review/collect_scope.sh origin/develop
```

## 3) Review policy

- Primary scope: changed lines in `.tmp/branch-review/diff.patch`
- Secondary scope: local context in changed files only when needed
- Avoid style-only comments unless they affect maintainability or defects

## 4) Output format

Start with:

`[SKILL ACTIVE] branch-review`

Then provide:
- `Review Focus Points (User Input)`
- Findings by severity (`High`, `Medium`, `Low`)
- Each finding with `file:line`, reasoning, and short fix suggestion
- A final **Refactoring Priority Queue**

If nothing is found, output:
- `[SKILL ACTIVE] branch-review`
- `No blocking issues found in the current branch diff.`
