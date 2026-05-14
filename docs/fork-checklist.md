# Fork checklist — adapting this template for a new project

Step-by-step guide for turning **Dastyorcha** into your own project. Each step lists the exact files and identifiers you need to touch.

This checklist intentionally **does not** cover the `/developer` and `/dev/*` (playground) routes — they live separately and can be deleted or kept as you wish without affecting the rebrand.

## Phase 0 — Pre-flight

Decide these up front so the rest of the checklist goes fast:

- **Project name** (e.g. `Bonbon`)
- **Primary domain** (e.g. `https://bonbon.uz`)
- **Locale strategy** — keep `uz/en/ru`, swap one out, add a new one, or reduce to a single language
- **Brand color** — a single hex (e.g. `#e6a95f`)
- **Fonts** — keep Archivo / Archivo Black / Geist Mono, or pick replacements
- **Logo** — SVG mark + wordmark

## Phase 1 — Package name

**`package.json`** — line 2: rename `"name"`.

```diff
- "name": "dastyorcha-template-front-nextjs",
+ "name": "bonbon",
```

## Phase 2 — Canonical domain

**`src/shared/constants/route-paths.ts`** — line 3: change `DOMAIN`.

```diff
- export const DOMAIN = "https://muxsinjon.uz";
+ export const DOMAIN = "https://bonbon.uz";
```

This single constant feeds `src/app/sitemap.ts`, `src/app/robots.ts`, `src/shared/lib/seo/get-page-metadata.ts`, `src/shared/lib/seo/get-organization-schema.ts`, and `src/shared/constants/seo/page-seo.ts`. No other URL edits needed.

## Phase 3 — Brand identity

### 3a. Brand color and palette

**`src/app/globals.css`**:

- **Line 63** — `--brand: #e6a95f;` → your hex.
- **Lines 62–99 (`:root`)** — light-mode palette: `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--chart-1..5`, `--sidebar-*`, and `--liquid-color-1..3` (lines 96–98).
- **Lines 101–136 (`.dark`)** — same tokens redefined for dark mode, including reversed liquid colors (lines 133–135).
- **Line 87** — `--radius: 0.625rem;` cascades to `--radius-sm/md/lg/xl/2xl/3xl/4xl` (lines 53–59).

All other colors are derived from these tokens — never use raw hex/rgb/oklch outside this file.

### 3b. Fonts

**`src/app/layout.tsx`**:

- **Line 2** — the `next/font/google` import: `Archivo`, `Archivo_Black`, `Geist_Mono`.
- **Lines 11–28** — font configs (variable names, weights, subsets).
- **Line 52** — applied to `<html>` via the className template.

**`src/app/globals.css`** — lines 21–23: keep the `@theme inline` mappings in sync if you change the CSS variable names.

```css
--font-sans: var(--font-archivo);
--font-mono: var(--font-geist-mono);
--font-heading: var(--font-archivo-black);
```

### 3c. Logo

**`src/shared/custom/logo.tsx`**:

- **Line 61** — `ariaLabel = "Dastyorcha"` → your project name.
- **Line 106** — the visible mark / wordmark JSX.

The logo is consumed by the header, footer, and the not-found page.

## Phase 4 — Site name, taglines, and copy

All user-facing brand text lives in the three locale files. **Keep all three in sync** even if you plan to reduce locales — do it after you finish translating.

**`src/shared/locales/uz.json`**, **`en.json`**, **`ru.json`** — the literal `"Dastyorcha"` appears at lines **3, 8, 27, 30, 55, 59** of each file. Replace every occurrence.

Namespaces to update:

| Namespace        | What it controls                                        |
| ---------------- | ------------------------------------------------------- |
| `common`         | Site name, tagline                                      |
| `hero`           | Hero eyebrow, title, tagline, CTA labels, contact label |
| `header`         | Header nav labels, menu CTA                             |
| `nav`            | Per-page nav labels (`nav.<pageName>.label`)            |
| `footer`         | Footer description, headings, copyright, social labels  |
| `langSwitcher`   | Language switcher labels                                |
| `notFound`       | 404 page copy                                           |
| `seo.<pageName>` | Per-page SEO title / description / keywords             |

The hero (`src/widgets/home/hero/hero.tsx`) pulls every string from the `hero.*` namespace — no hardcoded copy to chase.

## Phase 5 — Contact info and organization schema

### 5a. Brand contacts

**`src/shared/constants/contact-infos.ts`** — lines 1–52: replace every field in `CONTACT_INFOS` (phone, email, address, website, telegram, github, linkedin, twitter, facebook, substack). These power the hero's contact strip and the footer.

Drop or rename socials you don't need — every consumer destructures by key. If you remove a key, also remove its reference in `src/shared/lib/seo/get-organization-schema.ts` (`SAME_AS` array, lines 5–12) and in the locale `footer.social.*` namespace.

`DEVELOPER_CONTACT_INFOS` (lines 54–102) powers the `/developer` credit page — leave it alone unless you also rebuild that route.

### 5b. Organization JSON-LD

**`src/shared/lib/seo/get-organization-schema.ts`**:

- **Line 18** — `name: "Dastyorcha"` → your brand name.
- **Line 23** — description string mentioning "Muxsinjon Maxsudovich" → your brand description.

This object is injected as `<script type="application/ld+json">` from `src/app/layout.tsx` line 55 — it's how Google sees your brand identity.

## Phase 6 — SEO metadata and assets

### 6a. Layout metadata

**`src/shared/constants/seo/page-seo.ts`**:

- **Line 14** — `TWITTER_CREATOR = "@mxsnjon"` → your handle.
- **Lines 19–20** — `title.default` and `title.template` (`"%s | Dastyorcha"` → `"%s | YourBrand"`).
- **Line 23** — site-wide `description`.
- **Line 37** — `openGraph.siteName`.
- **Lines 42–43** — `twitter.title` and `twitter.description`.
- **Line 5** — `MAIN_OG_IMAGE_PATH = "/og-image.png"` if you change the OG file name.

### 6b. Per-page SEO copy

Each route reads its title/description/keywords from `seo.<pageName>.*` in the locale files. For the home page this is `seo.home.title`, `seo.home.description`, `seo.home.keywords` — already wired up; just rewrite the strings in all three locales.

### 6c. Public assets

The `public/` folder ships nearly empty. Add:

- `public/og-image.png` — 1200×630, used for OG / Twitter cards. Path must match `MAIN_OG_IMAGE_PATH`.
- `public/favicon.svg` — referenced by `LOGO_URL` (`src/shared/constants/seo/page-seo.ts` line 6) and the `icons.icon` field of `LAYOUT_METADATA`.
- `public/favicon.ico` — optional legacy fallback.
- `public/manifest.json` — optional, for PWA.

### 6d. Theme color

**`src/app/layout.tsx`** — lines 36–39: the `themeColor` viewport entries (`#ffffff` for light, `#1a1611` for dark). Match these to your new palette so mobile browser chrome blends in.

## Phase 7 — i18n strategy

Pick one path and apply only its steps.

### Option A — Keep all three locales (`uz` / `en` / `ru`)

No code changes. Translate the strings in `src/shared/locales/{uz,en,ru}.json`.

### Option B — Add a new locale (example: `tr` for Turkish)

1. Create `src/shared/locales/tr.json` — copy `uz.json`, translate every key.
2. **`src/shared/lib/i18n/routing.ts`** — line 3: `LOCALES = ["uz", "en", "ru", "tr"] as const;`
3. **`src/middleware.ts`** — line 8: mirror to `const LOCALES = ["uz", "en", "ru", "tr"];`
4. **`src/shared/constants/firm.ts`** — line 1: mirror to `LANGUAGES = ["uz", "ru", "en", "tr"] as const;`
5. In **every** locale file, add the new label under `langSwitcher.languages.tr`.

### Option C — Reduce to a single locale

1. **`src/shared/lib/i18n/routing.ts`** — set `LOCALES = ["uz"] as const;` and keep `DEFAULT_LOCALE = "uz"`.
2. **`src/middleware.ts`** — line 8: mirror `const LOCALES = ["uz"];`
3. **`src/shared/constants/firm.ts`** — line 1: mirror `LANGUAGES = ["uz"] as const;`
4. Delete the unused locale JSONs from `src/shared/locales/`.
5. Remove the other entries from `langSwitcher.languages.*` and either drop or hide the language switcher (`src/shared/custom/lang-switcher.tsx`).

Note: the `[locale]` URL segment will still render in single-locale mode (`/uz/...`). Collapsing the segment entirely is invasive — it touches `src/app/[locale]/`, `src/middleware.ts`, and the navigation helper. Out of scope for this checklist.

## Phase 8 — Adding a new page

The starter ships with only the home page. To add a new route (example: `/about`):

1. **`src/shared/constants/page-names.ts`** — append the key:

   ```ts
   export const PAGE_NAMES = {
     HOME: "home",
     ABOUT: "about",
   } as const;
   ```

2. **`src/shared/constants/route-paths.ts`** — append the route entry:

   ```ts
   [PAGE_NAMES.ABOUT]: {
     name: PAGE_NAMES.ABOUT,
     path: "/about",
   },
   ```

3. **`src/shared/constants/nav-items.ts`** — append a nav item (only if it should appear in the main nav):

   ```ts
   { key: PAGE_NAMES.ABOUT, path: ROUTE_PATHS[PAGE_NAMES.ABOUT].path },
   ```

4. **`src/shared/lib/seo/get-page-metadata.ts`** — append to the `PAGE_TO_ROUTE` map (lines 15–17):

   ```ts
   [PAGE_NAMES.ABOUT]: ROUTE_PATHS[PAGE_NAMES.ABOUT].path,
   ```

5. Create the route file **`src/app/[locale]/about/page.tsx`**:

   ```tsx
   import type { Metadata } from "next";

   import { PAGE_NAMES } from "@/shared/constants/page-names";
   import { getPageMetadata } from "@/shared/lib/seo/get-page-metadata";
   import type { Locale } from "@/shared/lib/i18n/routing";
   import { About } from "@/views/about";

   export async function generateMetadata({
     params,
   }: {
     params: Promise<{ locale: Locale }>;
   }): Promise<Metadata> {
     const { locale } = await params;
     return getPageMetadata(PAGE_NAMES.ABOUT, locale);
   }

   export default function AboutPage() {
     return <About />;
   }
   ```

6. Create the view at **`src/views/about/index.tsx`** and any widgets under **`src/widgets/about/`**. Page files are routing-only; logic goes in views/widgets per `docs/architecture.md`.

7. Add the SEO keys to **every** locale JSON under `seo.about`:

   ```json
   "about": {
     "title": "About — YourBrand",
     "description": "...",
     "keywords": ["...", "..."]
   }
   ```

   Plus the nav label under `nav.about.label` and any header/footer labels you need.

## Phase 9 — Final cleanup

- Rewrite **`README.md`** — project title, description, stack table, and the "Forking this template" section.
- Rotate any committed brand assets in `public/`.
- Optional: delete `/developer` and `/dev/playground` if you don't want them in your fork. Touchpoints: `src/app/developer/`, `src/app/dev/`, `src/views/developer/`, `src/views/dev/`, `src/widgets/dev/`, the `/developer` redirect logic in `src/middleware.ts` (lines 13–35), and the disallow rule in `src/app/robots.ts`.

## Verification

Run through these after every phase to catch regressions:

1. `npm run dev` — visit `/`, `/en`, `/ru`. Confirm new brand name, logo, color, hero copy in all locales.
2. `npm run build` — clean TypeScript and Next build.
3. Visit `/sitemap.xml` — confirm new domain and the expected locale routes.
4. Visit `/robots.txt` — confirm new domain.
5. View page source on `/` — `<title>`, `<meta name="description">`, OG tags, and the `<script type="application/ld+json">` block all reflect the new brand.
6. Toggle dark mode (header switch) — verify the dark palette.
7. Visit `/dev/playground` (if you kept it) — every primitive, color swatch, and widget should reflect the new tokens.

## Related docs

- [`architecture.md`](./architecture.md) — FSD layering, file map, naming conventions
- [`translations.md`](./translations.md) — i18n APIs, locale shape, language switcher
- [`seo.md`](./seo.md) — `getPageMetadata` pipeline, JSON-LD helpers, sitemap, robots
