# AGENTS.md

> Entry point and routing document for AI agents (Claude Code, Codex, etc.).
> This file only tells you WHERE to look — detailed rules live in linked docs.

## Project Summary

Keeply — a mobile-first web service for convenience store workers.
Consolidates announcements, operation logs, and expiration-date tracking to
eliminate information loss and duplicate work across shifts.

- Tech Stack: React 19 + TypeScript 6 + Vite 8 + TailwindCSS
- Package Manager: pnpm (ESM)

## Required Reading (Source of Truth)

Read these before starting any work.

- **[Coding Convention](docs/rules/coding-convention.md)** — component / type / function / variable / folder naming rules
- **[Git Convention](docs/rules/git-convention.md)** — branch / commit / PR rules
- **[Local Branch Review](docs/branch-review/README.md)** — pre-push review tooling

## Skill Routing

Use the following skills based on task type. Natural language triggers auto-match.

| Task Type | Skill | Trigger Examples |
|---|---|---|
| Create GitHub issue | [`create-issue`](.agents/skills/create-issue/SKILL.md) | "이슈 만들어줘", "이슈 올려야 해" |
| Design implementation | [`logic-design`](.agents/skills/logic-design/SKILL.md) | "설계 좀 해줘", "구현 계획 세워줘" |
| Review branch (pre-push) | [`branch-review`](.agents/skills/branch-review/SKILL.md) | "리뷰해줘", "push 전 확인해줘" |
| Create / update PR | [`create-pr`](.agents/skills/create-pr/SKILL.md) | "PR 올려줘", "PR 설명 써줘" |

## Standard Workflow

Typical feature development order:

```
1. Create issue          → create-issue
2. Create branch         → docs/rules/git-convention.md
3. Design implementation → logic-design
4. Implement
5. Review branch         → branch-review
6. Create PR             → create-pr
```

## Skill Specification

- Location: `.agents/skills/{name}/SKILL.md` (single source of truth)
- Claude Code slash command compatibility: `.claude/commands/{name}.md` is a symlink
- Frontmatter only uses `name` and `description`
- Names must be lowercase kebab-case

## Work Policy (Mandatory)

1. **Always preview → get approval → execute** before creating or modifying code
2. **Respond in Korean** by default (exception only when requested)
3. **Always include file paths** (e.g., `apps/web/src/...`)
4. **Stay within scope** — do only what was requested

## Folder Structure (Summary)

```
keeply-client/
├── AGENTS.md                    ← this file (router)
├── CLAUDE.md                    ← Claude Code entry point (references this file)
│
├── docs/                        ← human-facing manuals (source of truth)
│   ├── rules/
│   └── branch-review/
│
├── .agents/                     ← AI execution harness
│   └── skills/                  ← actual skill files
│       ├── branch-review/SKILL.md
│       ├── create-issue/SKILL.md
│       ├── create-pr/SKILL.md
│       └── logic-design/SKILL.md
│
└── .claude/
    └── commands/                ← Claude Code slash commands (symlinks → .agents/skills)
```

## Documentation Sync Rule

- Modify `docs/` first → `.agents/` follows (**one-way, never reverse**)
- Editing a skill file auto-reflects to symlinks (`.agents/skills/` → `.claude/commands/`)
