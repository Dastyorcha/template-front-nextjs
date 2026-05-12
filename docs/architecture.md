# File structure — FSD (Feature-Sliced Design) for Next.js

```
src/
├── app/          # Layer 1: Routing
├── views/        # Layer 2: Page compositions
├── widgets/      # Layer 3: Self-contained UI blocks
├── features/     # Layer 4: Actions & business logic
├── shared/       # Layer 5: Reusable cross-project code
```

---

## Layers

### App — Next.js routing only

- Contains `page.tsx` files with SEO metadata
- Imports one view component per page, nothing else
- No business logic, no state, no styles (except layout wrappers from Next.js)
- Locale-aware routes nest under `app/[locale]/` — the `locale` route param flows into `generateMetadata({ params })` and the page itself.
- `app/layout.tsx` is the **root** layout: sets `<html lang>` from `getLocale()`, mounts the Organization JSON-LD. Applies to every route, including `/dev/*`.
- `app/[locale]/layout.tsx` mounts `NextIntlClientProvider`, calls `setRequestLocale(locale)` for static rendering, and wraps children with the shared site chrome (`SiteHeader` from `widgets/layout/header/site-header.tsx` and `SiteFooter` from `widgets/layout/footer/site-footer.tsx`). The chrome is only mounted under `[locale]/` — `/dev/*` and `/developer` do **not** use it.
- `app/dev/layout.tsx` provides the default locale to the dev playground (which lives outside `[locale]`).
- `app/developer/layout.tsx` is the standalone wrapper for the `/developer` page (non-localised, hardcoded English). The route lives outside `[locale]`, bypasses the i18n middleware (handled explicitly in `src/middleware.ts`), is not present in `NAV_ITEMS`, and has its own minimal chrome — it is intentionally orphan content for SEO discoverability without internal linking.
- **`/dev` redirect rule:** `src/middleware.ts` redirects `/dev` and any `/dev/*` path (except `/dev/playground` and its subroutes) to `/developer`. The i18n middleware is bypassed for both `/dev/*` and `/developer` routes; all other routes are handled by `next-intl`.

### Views — full page compositions

- Assembles widgets into a page layout
- Handles layout: centering, grids, background, spacing
- Can hold minimal coordination state between widgets (e.g. `selectedId` passed to two widgets)
- **Does NOT** contain forms, API calls, or heavy logic

### Widgets — self-contained working blocks

- The main working unit: owns its state, handlers, API calls, modals
- Uses `useCreate`, `useGetList` and other hooks internally
- Uses shared UI components (Button, Input, Card, Dialog...)
- Can contain sub-components that only this widget uses
- **Rule:** if a component has `useState`, `useForm`, or `useCreate` — it's probably a widget

### Layout chrome — `widgets/layout/`

Shared header and footer mounted from `app/[locale]/layout.tsx`:

- `widgets/layout/header/site-header.tsx` — sticky header. Composes `Logo` (withText), `DesktopNav`, `LangSwitcher`, and a contact CTA. Mobile reduces to logo + hamburger; the hamburger opens a left-side `Sheet` containing the same nav, language switcher, and CTA.
- `widgets/layout/header/desktop-nav.tsx` — uses `NavigationMenu`. Top-level items without `children` render as `Link`s; items with `children` render as a `NavigationMenuTrigger` with a popover list.
- `widgets/layout/header/mobile-nav.tsx` — `Sheet` (`side="left"`); items with `children` collapse into expandable groups.
- `widgets/layout/footer/site-footer.tsx` — logo + description, footer nav from `NAV_ITEMS`, contact column from `CONTACT_INFOS`, social row using brand SVGs from `shared/custom/social-icons.tsx`. Bottom row: `© {year} ...` on the left, developer credit linking to `DEVELOPER_CONTACT_INFOS.website.href` with `DEVELOPER_CONTACT_INFOS.name` as the label (opens in a new tab) on the right.

Nav data flows from `shared/constants/nav-items.ts` (which is built off `PAGE_NAMES` / `ROUTE_PATHS`). To add a top-level link or a sub-menu, update `NAV_ITEMS` and add the matching `nav.<key>.label` (and `nav.<key>.children.<subKey>` for sub-items) in **all three** locale JSONs.

### Features — reusable actions & logic

- Hooks and logic that are **used by multiple widgets**
- If a hook is only used in one widget, keep it in that widget
- Examples: `useQuizSocket`, domain-specific hooks

### Shared — cross-project reusable code

- `components/ui/` — shadcn/ui primitives (accordion, button, calendar, card, carousel, checkbox, dialog, drawer, dropdown-menu, input, label, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, separator, sheet, sonner, spinner, switch, table, tabs, textarea, tooltip)
- `components/custom/` — non-shadcn JS/CSS components shipping their own assets (`liquid-ether.jsx` + `liquid-ether.css` — the animated hero background, dynamically imported with `ssr: false`)
- `hooks/` — generic hooks (e.g. `use-in-view.ts`)
- `custom/` — reusable cross-cutting components built on shadcn primitives (`lang-switcher.tsx`, `logo.tsx`, `social-icons.tsx` — exports `TelegramIcon`, `InstagramIcon`, `FacebookIcon`, `TwitterIcon`, `LinkedinIcon`, `GithubIcon`)
- `types/` — TypeScript type definitions (e.g. `types/seo/metadata.types.ts`)
- `lib/` — utility functions
  - `lib/utils.ts` — `cn()` Tailwind class merger
  - `lib/i18n/` — `routing.ts` (locales, default, `Locale` type), `request.ts` (`getRequestConfig`), `navigation.ts` (typed `Link` / `useRouter` / `usePathname` / `redirect`)
  - `lib/seo/` — `get-page-metadata.ts` (locale-aware), `get-organization-schema.ts`, `json-ld.tsx`
- `locales/` — i18n translation JSONs (`uz.json`, `en.json`, `ru.json`)
- `constants/` — `page-names.ts`, `route-paths.ts`, `nav-items.ts` (header/footer nav, can declare `children` for grouped menus), `contact-infos.ts` (`CONTACT_INFOS` — site/brand contacts (phone, email, address, website, telegram, github, linkedin, twitter, facebook, substack); `DEVELOPER_CONTACT_INFOS` — Muxsinjon Maxsudovich's personal contacts (name, role, website = muxsinjon.uz, email, phone, github, linkedin, telegram, facebook, twitter, substack). All links in the starter point to Muxsinjon's handles — when forking, swap both blocks for your brand and developer credit), `firm.ts` (just `LANGUAGES` tuple), `playground-constants.ts` (dev-playground sample data), and SEO tokens under `constants/seo/page-seo.ts`
- `assets/` — images, icons

---

## Naming conventions

| What                  | Convention               | Example                                    |
| --------------------- | ------------------------ | ------------------------------------------ |
| Files                 | kebab-case               | `login-form-card.tsx`, `use-create.ts`     |
| Folders               | kebab-case               | `widgets/auth/`, `shared/hooks/`           |
| Components            | PascalCase               | `LoginFormCard`, `ForgotPasswordModal`     |
| Types / Interfaces    | PascalCase               | `User`, `NewUser`, `QuizRoom`              |
| Variables / Functions | camelCase                | `handleSubmit`, `loginUser`, `isLoading`   |
| Hooks                 | camelCase + `use` prefix | `useCreate`, `useGetList`, `useQuizSocket` |
| Constants             | UPPER_SNAKE_CASE         | `AUTH.LOGIN`, `USERS.GET_BY_ID`            |
| Enums                 | PascalCase               | `UserRole.Admin`                           |

**One rule:** all files and folders are always kebab-case. No exceptions.

---

## Dev playground

The playground is composed strictly along FSD layers:

- `src/app/dev/playground/page.tsx` — routing only; imports the view.
- `src/views/dev/playground.tsx` — composes section widgets and global providers (`TooltipProvider`, `Toaster`).
- `src/widgets/dev/playground/` — one widget per concern:
  - `header.tsx`, `section.tsx`, `color-swatch.tsx` — shared playground primitives
  - `colors.tsx`, `typography.tsx`, `radius.tsx`, `logo.tsx`, `site-chrome.tsx`, `buttons.tsx`, `forms.tsx`, `feedback.tsx`, `overlays.tsx`, `navigation.tsx`, `data.tsx`, `layout.tsx`, `calendar.tsx` — section widgets
- `src/shared/constants/playground-constants.ts` — sample data shared across playground sections (tables, calendars, etc.). Kept under `shared/constants/` so it can be reused freely without coupling to the playground widget tree.

`src/app/dev/playground/page.tsx` (route: `/dev/playground`) is the canonical showcase of:

- All theme color tokens (read live from `globals.css` CSS variables)
- Typography scale and font tokens (`font-sans` → Archivo, `font-heading` → Archivo Black, `font-mono` → Geist Mono)
- Radius tokens (`--radius-sm` … `--radius-4xl`)
- Every primitive in `src/shared/components/ui/`
- Project widgets and views

It is the single place to visually QA the design system in both light and dark mode.

## Style-change sync rule

Any change that affects reusable design surface — `src/app/globals.css`, anything in `src/shared/components/ui/`, shared variant logic, or cross-cutting components in `src/shared/custom/` — MUST in the same change:

1. Update the corresponding section widget in `src/widgets/dev/playground/*` (or `constants.ts` for tokens) to reflect the new state. Keep `page.tsx` and the view thin.
2. Update `CLAUDE.md` if project-level guidance is affected.
3. Update `.claude/skills/ui-designer/SKILL.md` if any UI rule changes (e.g. new primitive, token, variant, animation policy).
4. Update every relevant doc under `docs/`.

Docs, the skill, and the playground must not drift from the implementation. The `enforce-doc-sync.sh` Stop hook enforces a subset of this automatically (hook scripts → `docs/claude-hooks.md`; skills → `docs/claude-skills.md`); the rest is on the author.

---

## Routing constants

Two small constant files in `src/shared/constants/` are the single source of truth for every route in the app. Anything that needs a URL (sitemap, SEO metadata, `<Link>`s, schema.org JSON-LD) reads from them — never hard-code a path.

### `page-names.ts` — the page key registry

```ts
export const PAGE_NAMES = {
  HOME: "home",
} as const;
```

- A flat map of stable string keys, one per **localised** page. The starter ships with `HOME` only — add new keys here as you build out the project.
- `PageName` is derived from this object: `type PageName = (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES]`.
- These keys are used as object keys in `ROUTE_PATHS` and `PAGE_METADATA`. Adding a localised page = adding a key here first.
- Never use raw strings (`"home"`, `"about"`) at call sites — always `PAGE_NAMES.HOME`.
- **Standalone routes (`/dev/*`, `/developer`) deliberately do NOT have `PAGE_NAMES` entries** — they live outside the locale system, define their own metadata inline, and are excluded from `NAV_ITEMS`, `ROUTE_PATHS`, and the sitemap.

### `route-paths.ts` — page key → URL path

```ts
export const DOMAIN = "https://muxsinjon.uz";

export const ROUTE_PATHS = {
  [PAGE_NAMES.HOME]: { name: PAGE_NAMES.HOME, path: "/" },
};
```

- Maps each `PAGE_NAMES.*` key to a `{ name, path }` entry.
- `DOMAIN` is the canonical production origin used to build absolute URLs.
- Locale prefixes are NOT part of `ROUTE_PATHS`. Build absolute URLs as `${DOMAIN}/${locale}${ROUTE_PATHS.X.path}` (with `path: "/"` collapsing to no trailing path) — `getPageMetadata` and `app/sitemap.ts` already do this.
- Consumed by `app/sitemap.ts`, `app/robots.ts`, `shared/constants/seo/page-seo.ts`, `shared/lib/seo/get-page-metadata.ts`, `shared/lib/seo/get-organization-schema.ts`, and any link in widgets/views.

### Adding a new page — checklist

1. Add a new key to `PAGE_NAMES` (e.g. `ABOUT: "about"`).
2. Add a matching entry to `ROUTE_PATHS` with its `path`.
3. Add the key to `NAV_ITEMS` if it should appear in the header/footer nav.
4. Add an `seo.<pageName>` block (`title`, `description`, `keywords`) and a `nav.<pageName>.label` to **all three** locale JSONs in `shared/locales/`, and a route mapping in `shared/lib/seo/get-page-metadata.ts` (`PAGE_TO_ROUTE`).
5. Create the route under `src/app/[locale]/<segment>/page.tsx` whose `generateMetadata({ params })` awaits `params.locale` and calls `getPageMetadata(PAGE_NAMES.ABOUT, locale)`. Render exactly one view from `src/views/`.
6. The sitemap picks up the new route automatically (it iterates `ROUTE_PATHS × LOCALES`).

### Dynamic routes (e.g. `/blog/[slug]`)

Detail pages backed by a known set of records (e.g. each blog post at `/blog/<slug>`) live under `app/[locale]/<parent>/[slug]/page.tsx`:

- The slug list comes from a typed constant — define one under `shared/constants/` (e.g. `BLOG_POSTS`).
- `generateStaticParams()` returns `{ slug }` for every record so all detail pages prerender statically; the `[locale]` segment is paired in by the parent layout's `generateStaticParams`.
- The page calls `notFound()` from `next/navigation` when the slug is unknown — never invent a fallback.
- `generateMetadata` builds canonical + `alternates.languages` (hreflang) for every locale × slug pair manually, since `getPageMetadata` only covers static `PAGE_NAMES`. Reuse `DOMAIN`, `ROUTE_PATHS`, and the SEO constants (`OG_LOCALES`, `MAIN_OG_IMAGE_PATH`, `TWITTER_CREATOR`) — do not hard-code anything.
- Detail-page entries must also be added to `app/sitemap.ts` (it iterates the same slug constant) so each record appears in `/sitemap.xml` with per-locale alternates.

---

## SEO

SEO is centralized via shared constants and helpers, driven off `PAGE_NAMES` / `ROUTE_PATHS` and per-locale messages in `shared/locales/`. See **`docs/seo.md`** for the full guide: file map, layered responsibilities (`LAYOUT_METADATA`, `getPageMetadata`), JSON-LD helpers, sitemap/robots, hreflang/`alternates.languages`, the `sr-only` H1 pattern, and the per-page checklist.

## i18n (translations)

Three locales (`uz` default, `en`, `ru`) on path-prefix routing (`/uz/...`). User-facing strings live in `shared/locales/{uz,en,ru}.json`; SEO copy is namespaced under `seo.<pageName>`. See **`docs/translations.md`** for the full guide: file map, namespace shape, server vs client APIs, `LangSwitcher`, adding keys/locales.
