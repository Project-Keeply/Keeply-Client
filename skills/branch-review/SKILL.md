---
name: branch-review
description: Diff-based local code review workflow for the current branch before push. Use when the user asks for "code review", "review this branch", "pre-push check", or asks to review using focus points such as DX, base component reusability, FSD architecture fit, and hook extraction opportunities.
---

# Branch Review Skill

Run a selective review on the current branch only, based on explicit review focus points.

## Steps

1. Ask for review focus points first (mandatory).
   - Do not start review without user-provided focus points.
   - If missing, ask again and pause.
   - Include the exact user-provided focus points in the final report.

2. Collect branch scope artifacts.

```bash
bash ./tools/branch-review/collect_scope.sh [base-ref]
```

Default base ref: `origin/main`

3. Review only changed files/lines first (`files.txt`, `diff.patch`), then expand to nearby context only if needed.

4. Return results in this format:
   - First line must include: `[SKILL ACTIVE] branch-review`
   - A section named: `Review Focus Points (User Input)`
   - Priority list: `High`, `Medium`, `Low`
   - Each finding: `file:line`, why it matters, short fix suggestion
   - Final section: “Refactoring Priority Queue”

## Rules

- Do not review unrelated untouched areas unless required for impact analysis.
- Prefer actionable findings over style-only comments.
- If no issues are found, explicitly state that.
