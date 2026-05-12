# Dastyorcha — Next.js starter template

Production-ready Next.js 16 starter by **Muxsinjon Maxsudovich** ([muxsinjon.uz](https://muxsinjon.uz)). Designed to be forked for new projects. Ships with i18n (uz/en/ru), an SEO pipeline, dark mode, design tokens, and the shadcn primitive set already wired up. The home page is a single minimal hero — everything else is scaffolding for the next project to extend.

- **Studio:** [dastyorcha.uz](https://dastyorcha.uz)
- **Locales:** `uz` (default) · `en` · `ru` — path-prefix routing (`/uz/...`, `/en/...`, `/ru/...`)
- **Standalone routes:** `/developer` (Muxsinjon Maxsudovich's profile) · `/dev/playground` (design-system QA surface)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npx tsc --noEmit     # typecheck (also runs on every commit via husky)
```

There is no test runner or linter wired up — TypeScript strict mode + the husky `pre-commit` typecheck are the only gates. Commit subjects must match `[<type>] <description>` where `<type>` is one of `feat | fix | docs | refactor | test | style | task | chore` (enforced by `.husky/commit-msg`).

## Tech stack

| Concern    | Choice                                                                                 |
| ---------- | -------------------------------------------------------------------------------------- |
| Framework  | Next.js **16** (App Router, Turbopack, React Compiler)                                 |
| UI runtime | React **19**                                                                           |
| Styling    | Tailwind CSS **v4** via `@tailwindcss/postcss`, tokens in `src/app/globals.css`        |
| Primitives | [shadcn/ui](https://ui.shadcn.com) (`radix-nova` style) at `src/shared/components/ui/` |
| i18n       | `next-intl` **v4** — three locales, path-prefix, JSON-only translation files           |
| Theming    | `next-themes` — light/dark via `.dark` on `<html>`                                     |
| Icons      | `lucide-react` + custom brand SVGs in `src/shared/custom/social-icons.tsx`             |
| Animations | `tw-animate-css` utilities only (no `framer-motion`)                                   |
| Toasts     | `sonner`                                                                               |
| Fonts      | Archivo (sans), Archivo Black (heading display), Geist Mono (mono)                     |

## Project layout

Feature-Sliced Design under `src/`:

```
src/
├── app/        # Next.js routes (locale-aware under [locale]/, standalone /dev and /developer)
├── views/      # Page compositions
├── widgets/    # Self-contained UI blocks (state, logic, sub-components)
├── features/   # Hooks/logic shared across 2+ widgets (empty in the starter)
└── shared/     # UI primitives, i18n, SEO helpers, constants, locale JSONs
```

Data flow is one-way: `app → views → widgets → shared`. Never invert.

See [`docs/architecture.md`](./docs/architecture.md) for the full layering rules and naming conventions.

## Forking this template

When you start a new project from this template:

1. Replace branding — update `CONTACT_INFOS` in `src/shared/constants/contact-infos.ts`, the `Logo` component in `src/shared/custom/logo.tsx`, and the brand color tokens in `src/app/globals.css`.
2. Update `DOMAIN` in `src/shared/constants/route-paths.ts` to your production origin.
3. Rewrite the hero copy in `src/shared/locales/{uz,en,ru}.json` under the `hero` namespace, and the SEO copy under `seo.home`.
4. Update `getOrganizationSchema()` in `src/shared/lib/seo/get-organization-schema.ts` with the new `name` / `description` / `sameAs` list.
5. Add new pages following the checklist in `docs/architecture.md` (PAGE_NAMES → ROUTE_PATHS → NAV_ITEMS → locale `seo.<pageName>` + `nav.<pageName>` blocks → route file under `app/[locale]/`).
6. Leave the developer credit in the footer if you keep the template's defaults — it points to `DEVELOPER_CONTACT_INFOS.website` (muxsinjon.uz). Remove or rewire if you don't want the credit.

## Where to look

- [`CLAUDE.md`](./CLAUDE.md) — always-loaded guide for [Claude Code](https://claude.com/claude-code) (commands, workflow, sync rules)
- [`docs/architecture.md`](./docs/architecture.md) — FSD layers, routing constants (`PAGE_NAMES` / `ROUTE_PATHS`), dev playground
- [`docs/translations.md`](./docs/translations.md) — i18n surface: locale JSONs, server/client APIs, language switcher, adding keys/locales
- [`docs/seo.md`](./docs/seo.md) — `getPageMetadata` pipeline, JSON-LD, sitemap, robots, hreflang, standalone-route pattern
- [`docs/claude-hooks.md`](./docs/claude-hooks.md) — every shell hook in `.claude/hooks/` and what it does
- [`docs/claude-skills.md`](./docs/claude-skills.md) — Claude Code skills (`ui-designer`) and when they activate
- [`.claude/skills/ui-designer/SKILL.md`](./.claude/skills/ui-designer/SKILL.md) — strict ruleset for any UI / token / locale / copy change

## Dev playground

`/dev/playground` is the live showcase of every design token, primitive, and the layout chrome in this codebase. Visit it in both light and dark mode whenever a UI change touches reusable surface — that's the project's only visual-QA gate.

## Adding UI components

```bash
npx shadcn@latest add <component>
```

Installs into `src/shared/components/ui/`.
