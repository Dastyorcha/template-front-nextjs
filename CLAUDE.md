# CLAUDE.md

Project guide for Claude Code. **Always loaded.** Keep it short — every detailed rule lives in a doc or skill below.

## What this project is

**Dastyorcha** — a production-ready Next.js 16 starter template by Muxsinjon Maxsudovich (muxsinjon.uz). Designed to be forked for new projects. Ships with i18n (uz/en/ru), SEO pipeline, dark mode, design tokens, and the shadcn primitive set already wired up. The home page is a single minimal hero; everything else is scaffolding for the next project to extend.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- No linter or test runner is configured

## Workflow & Git (MUST follow on every task)

This repo runs session-aware hooks that track every file you modify, enforce branch protection, and auto-open a PR on push. Committing before you finish is **mandatory** — the Stop hook blocks your stop until the working tree is clean.

1. **Never work on `main` / `master` / `develop`.** The `prepare-branch.sh` PreToolUse hook denies edits and file-mutating Bash on protected branches. If you start on one of these, switch first:
   ```bash
   git checkout -b feat/<kebab-desc>    # new feature
   git checkout -b fix/<kebab-desc>     # bug fix
   git checkout -b chore/<kebab-desc>   # refactor / cleanup / config
   ```
   The hook syncs the new branch with `origin/main` automatically (once per session).
2. **Make your edits.** Each Write / Edit / MultiEdit is recorded to `.claude/.session-markers/files-$SID.txt` by `track-session-files.sh`.
3. **Update relevant docs in the same change.** When you touch hooks, skills, design tokens, primitives, locales, or routing, update the matching doc(s). The `enforce-doc-sync.sh` Stop hook blocks stop if a hook script changes without `docs/claude-hooks.md`, or if a skill changes without `docs/claude-skills.md`. The full sync rule is in the relevant doc and in `SKILL.md`.
4. **Commit before stopping.** Use the helper, never `git add -A`:
   ```bash
   bash .claude/hooks/session-add.sh
   git commit -m "<concise message describing the change>"
   ```
5. **Stop normally.** `open-pr.sh` pushes the branch to `origin` and opens (or updates) a PR against `main`. **Do NOT run `git push` or `gh pr create` yourself** — the hook handles both. After 2 stop attempts with the tree still dirty, the hook gives up and logs a warning.

If a pre-commit hook fails, fix the underlying issue and create a **NEW** commit (never `--amend`). Never use `--no-verify` unless the user explicitly asks for it.

## Tech Stack

- **Next.js 16** App Router with React 19 (React Compiler enabled)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **shadcn/ui** primitives at `src/shared/components/ui/`, `radix-nova` style, RSC-enabled
- **TypeScript** strict mode; `@/*` maps to `./src/*`
- **next-intl v4** for i18n — three locales (`uz` default, `en`, `ru`), path-prefix routing (`/uz/...`, `/en/...`, `/ru/...`)
- **next-themes** for light/dark, toggled via `.dark` on the root element
- **Animations:** `tw-animate-css` utility classes only — `framer-motion` is **not** installed and must not be added without explicit approval
- **Icons:** `lucide-react`. Brand marks (Telegram/Instagram/etc.) come from `@/shared/custom/social-icons`
- **Toasts:** `sonner` (mounted globally)
- **Fonts** (loaded via `next/font/google` in `src/app/layout.tsx`):
  - `font-sans` → **Archivo** (`--font-archivo`, weights 400/500/600/700)
  - `font-heading` → **Archivo Black** (`--font-archivo-black`, weight 400 — distinct heavy display, not an alias of `font-sans`)
  - `font-mono` → **Geist Mono** (`--font-geist-mono`)

## Where the rules live

Don't ask "what's the convention" — read the relevant doc:

- **`.claude/skills/ui-designer/SKILL.md`** — strict ruleset for any UI / token / locale / copy change. Activates automatically on file paths under `src/shared/components/ui/`, `src/widgets/`, `src/views/`, `src/app/globals.css`, `src/shared/locales/*.json`. **Read it before any UI work.**
- **`.claude/skills/doc-writer/SKILL.md`** — manually triggered via `/doc-writer <topic>`. Documents a topic across all related docs using the Doc map below.

For individual docs, consult the **Doc map** below.

If a rule applies everywhere → it belongs here. If it applies to a subsystem → it belongs in a doc. If it applies to a class of tasks → it belongs in a skill. **Never duplicate a rule across files.** This file and `SKILL.md` must agree; when they diverge the docs are the tiebreaker.

## Token-efficient lookup (read in this order)

When you need information about this project, follow this ladder — **stop as soon as you have what you need.** Do not skip ahead, do not crawl source on a hunch.

1. **This `CLAUDE.md`** — always loaded. Most questions stop here.
2. **The Doc map below** → the single `docs/*.md` it points to. Read only that file.
3. **`docs/codemap.md`** — one line per file (`path · exports · purpose`). Cheap to read whole; jump straight to the right file.
4. **Only then** grep / find / Read source. For any search wider than ~3 greps or unknown locations, spawn the **Explore agent** — it returns a summary instead of dumping files into context.

### Hard rules

- **Never read** `node_modules/`, `.next/`, `.turbo/`, `build/`, `coverage/`, `*.log`.
- **Plan first** if a task will touch more than ~3 files: list intended file paths + intent before reading any of them. Plan mode discards files the plan rules out.
- **Update `docs/codemap.md` in the same change** whenever you add, remove, or rename an exported symbol under `src/`, or move a file. Do not regenerate the whole file — edit the affected lines only.
- **Doc auto-injection is off.** This repo previously injected matching docs on first edit via `inject-docs.sh`; removed in favour of the ladder above.

## Doc map

The single index of every `docs/*.md` file, what it covers, and what source-side changes should sync into it. `/doc-writer` reads this table to pick affected docs; when a new doc is created or its scope shifts, this table is updated in the same change. **Do not crawl `docs/` to "explore" — this table is the entry point.**

| Doc                       | Covers                                                                       | Sync triggers                                              |
| ------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `docs/architecture.md`    | FSD layering, file map, naming, routing constants (`PAGE_NAMES`, `ROUTE_PATHS`), dev playground, token families | `src/{app,views,widgets,features,shared}/`, `src/app/globals.css` (token list) |
| `docs/translations.md`    | Locale shape, namespaces, server vs client APIs, language switcher           | `src/shared/locales/*.json`, `src/shared/lib/i18n/`        |
| `docs/seo.md`             | `getPageMetadata` pipeline, JSON-LD, sitemap, robots, hreflang               | `src/shared/lib/seo/`, `src/app/**/page.tsx`               |
| `docs/fork-checklist.md`  | Repo fork/bootstrap steps                                                    | Project-bootstrap changes                                  |
| `docs/claude-hooks.md`    | Every shell hook in `.claude/hooks/`                                         | `.claude/hooks/`                                           |
| `docs/claude-skills.md`   | Every skill in `.claude/skills/`                                             | `.claude/skills/`                                          |
| `docs/codemap.md`         | One line per source file (`path · exports · purpose`); the third-tier lookup | Any add/remove/rename of an exported symbol under `src/`, or file move |

## Architecture summary (full version: `docs/architecture.md`)

Feature-Sliced layout under `src/`:

- `app/` — Next.js App Router (layouts, pages, global CSS). Locale-aware routes nest under `app/[locale]/`. Pages are routing-only — no logic, no styles beyond Next.js layout wrappers.
- `views/` — page-level compositions (e.g. `views/home/index.tsx`).
- `widgets/` — self-contained UI blocks with state and logic (e.g. `widgets/home/hero/hero.tsx`). Layout chrome lives at `widgets/layout/{header,footer}/`.
- `features/` — hooks and logic shared across 2+ widgets (empty in the starter).
- `shared/` —
  - `components/ui/` → shadcn/ui primitives
  - `custom/` → cross-cutting components (`logo.tsx`, `lang-switcher.tsx`, `social-icons.tsx`)
  - `hooks/` → generic hooks (`use-in-view.ts`, etc.)
  - `lib/` → `utils.ts` (`cn`), `i18n/` (typed nav), `seo/` (metadata helpers, JSON-LD)
  - `locales/` → `uz.json` (default), `en.json`, `ru.json` — keep all three in sync
  - `constants/` → `page-names.ts`, `route-paths.ts`, `nav-items.ts`, `contact-infos.ts` (`CONTACT_INFOS` = site/brand; `DEVELOPER_CONTACT_INFOS` = developer credit), `firm.ts` (just `LANGUAGES`), `playground-constants.ts`, `seo/`
  - `types/`, `contexts/`, `assets/`

**Data flow:** `app/[locale]/page.tsx` → `views/*` → `widgets/*` → `shared/components/ui/*`. Never invert.

**Naming:** files and folders are **kebab-case**; components/types are **PascalCase**; functions/variables are **camelCase**; hooks are `useX`; constants are `UPPER_SNAKE_CASE`.

**Tokens & i18n:** colours / radii / fonts come from `src/app/globals.css` only. User-facing text goes through `next-intl` (`useTranslations` / `getTranslations`). In-app navigation uses `@/shared/lib/i18n/navigation` (never `next/link` or `next/navigation`).

## Adding UI components

Use the shadcn CLI: `npx shadcn@latest add <component>` — installs to `src/shared/components/ui/`. ASK the user before installing a component that pulls a new package.

## Dev playground

Route: `/dev/playground`. Mirrors FSD layering:

- `src/app/dev/playground/page.tsx` — routing-only entry; imports the view.
- `src/views/dev/playground.tsx` — composes the playground sections.
- `src/widgets/dev/playground/*` — one widget per section (`colors`, `typography`, `radius`, `logo`, `site-chrome`, `buttons`, `forms`, `feedback`, `overlays`, `navigation`, `data`, `layout`, `calendar`), plus shared `header`, `section`, `color-swatch`. Sample data sits at `src/shared/constants/playground-constants.ts`.

The playground is the live showcase of every design token, primitive, widget, and view. **Verify every visual change here in both light and dark mode before completing the task.**

## Style-change sync rule (MUST follow)

When you change reusable design surface — `src/app/globals.css`, anything in `src/shared/components/ui/`, shared variant logic, or cross-cutting components in `src/shared/custom/` — you MUST in the same change:

1. Update `src/widgets/dev/playground/*` (or `constants.ts` for tokens) so the playground reflects the change. The page stays routing-only.
2. Update this file (`CLAUDE.md`) if project-level guidance shifts.
3. Update every relevant doc under `docs/` (`architecture.md`, `translations.md`, `seo.md`).
4. Update `.claude/skills/ui-designer/SKILL.md` if any rule changes.

`enforce-doc-sync.sh` enforces a subset of this at Stop time (hook scripts → `docs/claude-hooks.md`; skills → `docs/claude-skills.md`). The rest is on you — review which docs reference your change and update them in the same commit. State explicitly if no docs are affected.
