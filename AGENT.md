# Keeply Client Guide

## Project Summary
- One-line definition: Keeply is a mobile-first web service that helps convenience store workers manage announcements, operation logs, and expiration-date tracking in one place without handwritten notebooks.
- Problems to solve:
  - Information loss during shift handovers
  - Duplicate work caused by fragmented tools for announcements, memos, and expiration tracking
  - Manual dependency in managing near-expiry items
- Core values:
  - Clarity in information delivery
  - Action-oriented UX for on-site operations
  - Fast input flow like handwritten notes + digital traceability/searchability
- Target users: Convenience store owners/managers, weekday workers, night-shift workers, and weekend workers

## Tech Stack (Categorized)
- Language: TypeScript 6
- UI Library: React 19
- Build Tool: Vite 8
- Runtime/Package Manager: Node.js + pnpm
- Module System: ESM ("type": "module")
- Linting: ESLint 9
- Formatting: Prettier 3
- Styling: TailwindCSS

## Coding Convention
- Follow the coding convention in `docs/rules/coding-convention.md`
- @docs/rules/coding-convention.md
  
## Git Convention
- Follow the Git convention(commit & PR) in `docs/rules/git-convention.md`
- @docs/rules/git-convention.md

## Work Policy
- No code implementation or modification may proceed without explicit user approval.
- Before starting any task, provide a brief explanation of:
  - What work will be performed
  - Which parts of the project may be affected
- After completing the task, always:
  - Verify the result
  - Run the build process and confirm whether the build succeeds or fails
- Exception:
  - If the user explicitly states that all permissions are pre-approved before the task begins, subsequent work related to that specific task may proceed without additional approval requests.

## Local Branch Review
- Shared pre-push review scope script: `tools/branch-review/collect_scope.sh`
- Quick command: `pnpm review:scope`
- For agent-driven review responses, include marker line: `[SKILL ACTIVE] branch-review`
- Detailed usage: `docs/branch-review/README.md`
