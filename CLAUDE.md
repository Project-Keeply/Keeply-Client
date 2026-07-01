# CLAUDE.md

> Claude Code entry point. All project rules, skill routing, and workflow live in AGENTS.md.

@AGENTS.md

## Claude Code Specific

### Slash Commands

`.claude/commands/*.md` are symlinks to `.agents/skills/*/SKILL.md`.
Available: `/branch-review`, `/create-issue`, `/create-pr`, `/logic-design`.

### Skill Auto-Matching

Natural-language triggers auto-invoke skills via `description` frontmatter matching.
Examples: "PR 올려줘" → `create-pr`, "리뷰해줘" → `branch-review`.

### Memory

Preview-before-work rule is enforced by memory. See `.claude/projects/.../memory/`.
