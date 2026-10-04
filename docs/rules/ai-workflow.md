# AI Development Workflow

GitHub Issues are the source of truth for development tasks.

## Standard Workflow

1. Create or select a GitHub issue (`create-issue` for a new issue).
2. Create a task branch from `develop` using `{type}/{description}/#{issue-number}`.
3. Design the implementation with `logic-design`.
4. Implement the agreed scope and run the applicable Postflight checks.
5. Review the branch with `branch-review`.
6. Create or update the PR with `create-pr` and link the issue.
7. Complete GitHub CI and team review.

Task creation, status tracking, and PR linking do not require Notion.
`create-issue` creates the issue only; branch creation is a separate step.

The current workflow follows Preflight → Flight → Postflight → Debrief.
Task specification files, local status records, restoration scripts, and PR
readiness checks are planned in issue #114 and are not yet implemented.
