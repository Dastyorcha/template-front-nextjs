---
name: doc-writer
description: Manually triggered via `/doc-writer <topic>`. Documents a single topic across ALL related `docs/*.md` files in this repo. Uses the Doc map in `CLAUDE.md` to decide which docs are affected — never reads every doc. Creates new doc files when no existing one fits, and updates the Doc map in the same change.
---

# Doc Writer (frontend)

Manually invoked. Documents a topic completely — every related doc, no half-coverage.

## Inputs

A free-form topic from the user (e.g. "design tokens", "language switcher", "new `/dashboard` route SEO", "playground typography section"). Treat it as a small spec for what to record.

## Workflow

1. **Read the Doc map.** Open `CLAUDE.md` and read the `## Doc map` table. This is the only discovery step — **do not** read every file under `docs/`.
2. **Pick affected docs.** From the topic, list every doc whose `Covers` column intersects the topic. Examples:
   - "new design token" → `architecture.md` (token families) + `claude-skills.md` only if `ui-designer` rules change.
   - "added Russian copy for the hero" → `translations.md` only.
   - "new route `/[locale]/dashboard`" → `architecture.md` (FSD placement, `ROUTE_PATHS`) + `seo.md` (metadata) + `translations.md` (new namespace, if any).
   - A single topic usually hits 1-3 docs. Stop only when you're sure no other doc is affected.
3. **Need a new doc?** If the topic does not fit any existing doc:
   - Create `docs/<kebab-name>.md` with H1 title, one-sentence summary, sections as needed.
   - Add a new row to the `## Doc map` table in `CLAUDE.md`.
   - Cross-link from any existing doc that mentions the new topic in passing.
4. **Read only the docs you will edit.** For each affected doc, read it first, then update in place — preserve existing tone, heading depth, and table style. Append new sections only when the topic doesn't fit an existing section.
5. **Update the Doc map.** If you created a new doc, added new sync triggers, or a doc's scope shifted, edit the `## Doc map` table in `CLAUDE.md`.
6. **Cross-references.** When the same fact appears in 2+ docs, the doc that owns it (per the map) holds the full version; others link to it. Never duplicate prose.

## Style

- Match the surrounding docs: calm, factual, sentence-case headings, code blocks for shapes/tokens/commands, tables for enumerations.
- Reference exact file paths and exported names (`src/shared/lib/i18n/navigation.ts:Link`).
- For tokens: name, paired `*-foreground` (if any), declaration in `src/app/globals.css`, where it is used in the playground (`src/widgets/dev/playground/colors.tsx` or `constants.ts`).
- For locales: namespace, key shape, all three locales (`uz`, `en`, `ru`) must be mentioned as kept in sync.
- For routes: path under `app/[locale]/`, view file under `views/`, widgets used, SEO entry in `getPageMetadata`, route constant in `src/shared/constants/route-paths.ts`.
- For components: FSD layer placement (`shared/components/ui/` vs `shared/custom/` vs `widgets/` vs `views/`), props shape, where it appears in `/dev/playground`.

## What NOT to do

- Do not read every file in `docs/` to "explore". The Doc map is the index.
- Do not create a new doc when an existing one has a section that fits.
- Do not write a topic into only one doc when the Doc map says it spans multiple — partial coverage defeats the skill.
- Do not duplicate content across docs; link instead.
- Do not run `git add` / `git commit` / `git push` — the session hooks handle staging and the Stop hook auto-opens the PR.

## When unsure

If the topic is ambiguous (e.g. "document i18n"), ask the user one targeted question before writing. If a single doc would balloon past ~400 lines, propose splitting it before writing.
