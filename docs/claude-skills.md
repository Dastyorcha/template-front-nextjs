# Claude Code skills

Skills are scoped instruction sets Claude loads on demand. Each skill lives in `.claude/skills/<skill-name>/SKILL.md` and is fronted by YAML frontmatter (`name`, `description`) that tells Claude when to invoke it.

A skill activates when its `description` matches the current task — either via the user typing `/<skill-name>` or via Claude recognizing the task fits the skill's trigger conditions.

## Available skills

### `ui-designer`

Path: `.claude/skills/ui-designer/SKILL.md`

Triggers on any change to design tokens, shadcn primitives, widgets, views, page compositions, the dev playground, or user-facing strings — anything visible to end users. File-path triggers include `src/shared/components/ui/`, `src/widgets/`, `src/views/`, `src/app/globals.css`, `src/shared/locales/*.json`.

Enforces (summary; full rules in the skill file):

- Tokens only from `src/app/globals.css` (no hex / rgb / hsl / oklch literals).
- Tailwind v4 only — no CSS modules, no inline `style` for colour / spacing / layout, variants via `class-variance-authority`.
- `tw-animate-css` for utility animations; ASK before any animation library or non-trivial JS animation; `framer-motion` is **not** installed.
- FSD layer placement per `docs/architecture.md`: `app/` → `views/` → `widgets/` → `features/` → `shared/`. Never invert.
- Reuse existing shadcn primitives in **`src/shared/components/ui/`** before hand-rolling. New primitive → `npx shadcn@latest add <name>` (ASK first if it pulls a new package).
- All user-facing strings go through `next-intl` (see `docs/translations.md`). Three locales (`uz`, `en`, `ru`) must stay in sync.
- Per-page SEO metadata via `getPageMetadata` (see `docs/seo.md`).
- Copy guidelines: calm, factual, sentence-case, verb-led, anti-AI-ism word list, no exclamation marks in declarative copy.
- Image placeholders use `<Logo>` from `@/shared/custom/logo` — never lorem-picsum / unsplash / external services.
- Decide colours, layout, copy phrasing, simple animations autonomously; ASK only for installs, external animation libraries, scope changes, and removals/renames of public-facing tokens.

Read the skill file itself for the full ruleset.

### `doc-writer`

Path: `.claude/skills/doc-writer/SKILL.md`

Manually triggered only — via the `/doc-writer <topic>` slash command. Does not auto-activate on any file path.

Enforces:

- **Single source of discovery**: reads the `## Doc map` table in `CLAUDE.md`. Never crawls `docs/` to "explore".
- **Full coverage**: for one topic, updates *every* doc whose `Covers` column intersects — partial coverage defeats the skill.
- **New docs allowed**: if no existing doc fits, creates `docs/<kebab-name>.md` and adds a row to the Doc map in the same change.
- **No duplication**: shared facts live in their owning doc; other docs link to them.
- **Map upkeep**: any new doc, scope shift, or new sync trigger is reflected in `CLAUDE.md`'s Doc map immediately.
- **No git commands**: staging, commit, and PR are handled by the session hooks.

## Adding a new skill

1. Create `.claude/skills/<skill-name>/SKILL.md`.
2. Start with YAML frontmatter:
   ```markdown
   ---
   name: <skill-name>
   description: <one paragraph describing exactly when this skill should activate — be specific about file paths and task types>
   ---
   ```
3. Below the frontmatter, write the rules. Be concrete and enforceable: prefer "use X" / "never Y" over abstract advice. Reference relevant docs by path.
4. Update this doc with a short summary and link.

## Skill vs. CLAUDE.md vs. `docs/`

- **CLAUDE.md** — always loaded. Project overview, commands, workflow, pointer table to the rest. Keep short.
- **`docs/<topic>.md`** — loaded on demand by `inject-docs.sh` (once per session). Source of truth for individual subsystems (`architecture`, `translations`, `seo`, `claude-hooks`, `claude-skills`).
- **Skills** — activated by trigger description, not always loaded. Use for opinionated, task-shaped rulesets that only apply to certain kinds of work (e.g. `ui-designer` for UI changes).

If a rule applies everywhere → it belongs in `CLAUDE.md`. If it applies to a subsystem → write a doc. If it applies to a class of tasks → write a skill. **Never duplicate a rule across files.** When `CLAUDE.md` and a skill diverge, the relevant doc is the tiebreaker — fix whichever is wrong in the same change.
