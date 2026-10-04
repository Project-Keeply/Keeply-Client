---
name: branch-review
description: 현재 브랜치의 diff를 focus point 기준으로 리뷰하는 스킬. "리뷰해줘", "코드 리뷰", "브랜치 리뷰", "push 전 확인해줘", "focus point 리뷰", "branch-review" 등의 요청에 반드시 이 스킬을 사용한다.
---

# branch-review command

Perform a selective review for the current branch only.

## 1) Select review criteria

Apply [AI Development Workflow](../../../docs/rules/ai-workflow.md), including
its default review criteria, approval rules, and revalidation conditions.

- Use additional focus points already supplied by the user.
- If none are supplied, proceed with the default criteria; do not stop to request them.
- Report the exact supplied input, or "기본 리뷰 기준 적용" when absent.

## 2) Build review scope

Run:

```bash
bash ./tools/branch-review/collect_scope.sh origin/develop
```

For a different PR target, pass its base ref explicitly (example):

```bash
bash ./tools/branch-review/collect_scope.sh origin/main
```

## 3) Review policy

- Primary scope: changed lines in `.tmp/branch-review/diff.patch`
- The current collector covers committed changes only. Check staged, unstaged, and untracked changes separately; include requested changes in the review or explicitly report exclusions.
- Secondary scope: local context in changed files only when needed
- Avoid style-only comments unless they affect maintainability or defects

## 4) Output format

Start with:

`[SKILL ACTIVE] branch-review`

Then provide:
- `Review Focus Points (User Input)`
- Review scope, base ref, and unverified items
- Findings by severity (`High`, `Medium`, `Low`)
- Each finding with `file:line`, reasoning, and short fix suggestion
- A final **Refactoring Priority Queue**

If nothing is found, output:
- `[SKILL ACTIVE] branch-review`
- `No blocking issues found in the reviewed changes.`
- State the reviewed scope and any unverified items.

## 5) Rules

- Do not review unrelated untouched areas unless required for impact analysis.
