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
- **[AI Development Workflow](docs/rules/ai-workflow.md)** — GitHub issue-based task lifecycle
- **[Local Branch Review](docs/branch-review/README.md)** — pre-push review tooling

## Skill Routing

Use the following skills based on task type. Natural language triggers auto-match.

| Task Type | Skill | Trigger Examples |
|---|---|---|
| Create GitHub issue | [`create-issue`](.agents/skills/create-issue/SKILL.md) | "이슈 만들어줘", "이슈 올려야 해" |
| Design implementation | [`logic-design`](.agents/skills/logic-design/SKILL.md) | "설계 좀 해줘", "구현 계획 세워줘" |
| Review branch (pre-push) | [`branch-review`](.agents/skills/branch-review/SKILL.md) | "리뷰해줘", "push 전 확인해줘" |
| Create / update PR | [`create-pr`](.agents/skills/create-pr/SKILL.md) | "PR 올려줘", "PR 설명 써줘" |

## Standard Skill Execution

Every skill invocation follows this flight protocol:

1. **Preflight** — [`.agents/checklists/preflight.md`](.agents/checklists/preflight.md) — verify task-specific context and existing authorization
2. **Flight** — Execute skill-specific steps (from the skill's SKILL.md)
3. **Postflight** — [`.agents/checklists/postflight.md`](.agents/checklists/postflight.md) — `pnpm lint` / `pnpm check-types` / `pnpm build` / convention checks
4. **Debrief** — Report using [`.agents/checklists/debrief.md`](.agents/checklists/debrief.md) format

Apply the task-specific entry conditions and approval rules in
[AI Development Workflow](docs/rules/ai-workflow.md). Already-authorized work
does not require repeated approval. Read-only tasks do not require a feature branch.

## Standard Workflow

Typical feature development order (GitHub issue-first):

```
1. Create / select issue → create-issue (new issue only)
2. Create task branch   → from develop, linked by issue number
3. Design implementation → logic-design
4. Implement
5. Review branch         → branch-review
6. Create PR             → create-pr
7. CI / team review     → GitHub
```

**Note**: GitHub Issues are the source of truth for tasks. Branch creation is
separate from `create-issue`. See [AI Development Workflow](docs/rules/ai-workflow.md).

## Skill Specification

- Location: `.agents/skills/{name}/SKILL.md` (single source of truth)
- Claude Code slash command compatibility: `.claude/commands/{name}.md` is a symlink
- Frontmatter only uses `name` and `description`
- Names must be lowercase kebab-case

## Work Policy (Mandatory)

1. **Explain scope before implementation; reuse existing authorization** — follow [AI Development Workflow](docs/rules/ai-workflow.md) for new scope and external actions
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
│   ├── checklists/              ← flight protocol (preflight / postflight / debrief)
│   │   ├── preflight.md
│   │   ├── postflight.md
│   │   └── debrief.md
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
