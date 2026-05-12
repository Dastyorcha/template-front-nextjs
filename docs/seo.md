> **Read this whenever a task touches metadata, titles, descriptions, OG/Twitter tags, JSON-LD, sitemap, or robots.** This is the source of truth for how SEO is wired in this project. See `docs/architecture.md` for the routing constants (`PAGE_NAMES`, `ROUTE_PATHS`) that SEO is built on top of, and `docs/translations.md` for the locale system.

# SEO

SEO is centralized so each page only needs to declare its key and pass the active locale. Everything else (titles, descriptions, OG, Twitter, JSON-LD, sitemap, robots) is driven by shared constants, per-locale translation messages, and helpers — pages never hard-code SEO copy or URLs.

The site is multilingual (`uz` default, `en`, `ru`). All SEO surfaces are locale-aware: titles, descriptions, and keywords come from `src/shared/locales/<locale>.json` under the `seo.<pageName>` namespace; canonical URLs and `alternates.languages` (hreflang) are generated from `LOCALES × ROUTE_PATHS`.

---

## File map

```
src/app/
├── layout.tsx                     # root layout — <html lang> from getLocale(), Organization JSON-LD
├── [locale]/
│   ├── layout.tsx                 # NextIntlClientProvider + setRequestLocale(locale)
│   └── page.tsx                   # generateMetadata({params}) → getPageMetadata(HOME, locale)
├── sitemap.ts                     # iterates LOCALES × ROUTE_PATHS → /sitemap.xml with hreflang
└── robots.ts                      # /robots.txt rules + sitemap reference

src/shared/locales/
├── uz.json                        # SEO copy under seo.<pageName>.{title,description,keywords}
├── en.json
└── ru.json

src/shared/constants/seo/
└── page-seo.ts                    # LAYOUT_METADATA, OG_LOCALES, MAIN_OG_IMAGE_PATH, LOGO_URL, TWITTER_CREATOR

src/shared/lib/seo/
├── get-page-metadata.ts           # getPageMetadata(pageName, locale) → Metadata (reads translations)
├── get-organization-schema.ts     # getOrganizationSchema(), getWebsiteSchema({ name, description })
└── json-ld.tsx                    # <JsonLd id schema /> — renders <script type="application/ld+json">

src/shared/types/seo/
└── metadata.types.ts              # PageMetadata, PageName
```

---

## Layered responsibilities

### 1. Site-wide defaults — `LAYOUT_METADATA` (in `shared/constants/seo/page-seo.ts`)

A single object exported and used as `app/layout.tsx`'s `metadata`. It defines what every page inherits from Next.js's metadata merging:

- `metadataBase: new URL(DOMAIN)` — makes all relative URLs in metadata resolve against the production origin.
- `title: { default: "Dastyorcha — Next.js starter template", template: "%s | Dastyorcha" }` — per-page titles get the suffix automatically.
- `description` — fallback when a page omits one.
- `robots` — global crawler directives (index/follow + Googlebot specifics).
- `openGraph` / `twitter` — site-wide defaults (siteName, default image, card type, creator). Per-locale `openGraph.locale` is set per page in `getPageMetadata`.
- `icons` — favicon.

Per-page metadata returned from `generateMetadata` is merged on top of this by Next.js — pages override only what they need.

The root layout (`app/layout.tsx`) sets `<html lang>` dynamically via `await getLocale()` so each rendered page declares the correct language to crawlers and assistive tech.

### 2. Per-page metadata — `seo.<pageName>` namespace in locale JSONs

Per-page SEO copy now lives in the translation files (`shared/locales/{uz,en,ru}.json`) under the `seo` namespace:

```jsonc
{
  "seo": {
    "home": {
      "title": "Dastyorcha — Next.js 16 starter template",
      "description": "...",
      "keywords": ["dastyorcha", "next.js starter", "..."],
    },
    // add new PAGE_NAMES entries here as you scaffold more pages
  },
}
```

Rules:

- One block per `PAGE_NAMES.*` key, present in **every** locale JSON. A missing entry → runtime warning + key path leaks to crawlers (so it's loud).
- Never hard-code SEO copy in `app/<segment>/page.tsx` or in helpers.
- Page → URL path mapping lives in `PAGE_TO_ROUTE` inside `shared/lib/seo/get-page-metadata.ts`. Adding a new page means extending that map alongside `PAGE_NAMES` / `ROUTE_PATHS`.

### 3. The builder — `getPageMetadata(pageName, locale)`

`shared/lib/seo/get-page-metadata.ts` returns a fully-resolved Next.js `Metadata` object built from the locale's translations + routing constants:

```ts
import { getPageMetadata } from "@/shared/lib/seo/get-page-metadata";

const meta = await getPageMetadata(PAGE_NAMES.HOME, locale);
```

What it produces:

- `title`, `description`, `keywords` — read via `getTranslations({ locale, namespace: "seo.<pageName>" })`.
- `alternates.canonical` — `${DOMAIN}/${locale}${path}` (root path `/` collapses).
- `alternates.languages` — every `LOCALES` entry plus `x-default` (Uzbek).
- `openGraph.locale` + `alternateLocale` — from `OG_LOCALES` (`uz_UZ`, `en_US`, `ru_RU`).
- `openGraph.images` / `twitter.images` — `MAIN_OG_IMAGE_PATH`, falling back to `LOGO_URL`.
- `twitter.creator` — `TWITTER_CREATOR` constant.

Keep this helper pure: it composes constants + translations, no fetches, no side effects. If a page needs CMS-driven copy, introduce a separate async helper.

### 4. Page-level wiring — `app/[locale]/<segment>/page.tsx`

Pages are routing-only (per FSD). The SEO contract is:

```tsx
import { PAGE_NAMES } from "@/shared/constants/page-names";
import { getPageMetadata } from "@/shared/lib/seo/get-page-metadata";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/shared/lib/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return await getPageMetadata(PAGE_NAMES.HOME, locale);
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: `seo.${PAGE_NAMES.HOME}`,
  });
  const title = t("title");
  const description = t("description");

  return (
    <>
      <JsonLd
        id="website-schema"
        schema={getWebsiteSchema({ name: title, description })}
      />
      <div className="sr-only">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <HomeView />
    </>
  );
}
```

Why these pieces:

- `params.locale` is forwarded into `getPageMetadata` and `getTranslations`. Awaiting `params` is required (Next.js 15+).
- `generateMetadata` — Next.js calls this to render `<head>`.
- `getTranslations` re-reads locale-specific copy for JSON-LD and the `sr-only` H1/lead.
- `JsonLd` — page-specific structured data.
- `sr-only` block — see "Accessibility-for-SEO pattern" below.
- The view (`HomePageHeroSection`) is the only visual content — pages still don't contain layout/logic.

---

## JSON-LD (structured data)

Schema.org JSON-LD is injected via `<JsonLd id="..." schema={...} />` (`shared/lib/seo/json-ld.tsx`), which renders a `<script type="application/ld+json">` tag with a stable `id`.

Two helpers exist in `shared/lib/seo/get-organization-schema.ts`:

- `getOrganizationSchema()` — `Organization` schema for the site/brand (Dastyorcha by default — change the `name`, `description`, and `sameAs` entries when forking). Injected **once** in `app/layout.tsx` with `id="organization-schema"`. Don't repeat it on individual pages.
- `getWebsiteSchema({ name, description, url? })` — `WebSite` schema. Injected per page (e.g. `app/page.tsx` uses `id="website-schema"`).

When a new page needs richer structured data (e.g. `Service`, `BreadcrumbList`, `FAQPage`, `Article`), add a new pure helper next to the existing ones — `getXxxSchema(args) → object` — and call it from the page with a unique `id`. Keep helpers pure: take args, return a plain object, no side effects.

---

## Sitemap & robots

Both files live in `src/app/` and are pure functions of the routing constants — no manual maintenance per page:

- **`app/sitemap.ts`** generates `/sitemap.xml` by iterating `LOCALES × ROUTE_PATHS`, plus any dynamic-record constants the sitemap explicitly enumerates:
  - One entry per `(locale, route)` pair for static routes, URL `${DOMAIN}/${locale}${path}`, with `alternates.languages` mapping every locale — proper hreflang for every page.
  - Home (`path === "/"`) → `priority: 1`, `changeFrequency: "weekly"`.
  - Other static routes → `priority: 0.8`, `changeFrequency: "monthly"`.
  - Dynamic record routes (e.g. `/team/<slug>` from `TEAM_MEMBERS`) → `priority: 0.6`, `changeFrequency: "monthly"`. The sitemap iterates the slug constant directly; adding a record to that constant appears in the sitemap automatically.
  - Adding a static route to `ROUTE_PATHS` or a new locale to `LOCALES` is auto-picked up; adding a NEW dynamic record type requires extending `sitemap.ts` to iterate that constant.
- **`app/robots.ts`** generates `/robots.txt`:
  - `allow: "/"` for all user-agents.
  - `disallow: ["/dev/", "/api/"]` — keep internal tooling and the playground under `/dev/` so they stay out of search results.
  - `sitemap: ${DOMAIN}/sitemap.xml`, `host: DOMAIN`.

If you add a new internal/tooling route, place it under `/dev/` (or extend `disallow`) so crawlers skip it.

### Standalone non-localised routes (`/developer`, `/dev/playground`)

`/developer` is a special case: it is **deliberately discoverable by crawlers** (full title/description/OG, `Person` JSON-LD with `sameAs` to every external profile, `BreadcrumbList`) but is **not linked from anywhere on the site** (not in `NAV_ITEMS`, not in `app/sitemap.ts`, disallowed-adjacent — see redirect below). The page lives outside `[locale]` (English only), defines its own `metadata` and `JsonLd` blocks inline, and bypasses the i18n middleware via an explicit branch in `src/middleware.ts`. `/dev/playground` follows the same standalone pattern but is internal tooling (covered by `robots.ts` disallow).

**`/dev/*` redirect rule.** `src/middleware.ts` redirects `/dev` and any `/dev/*` path (except `/dev/playground` and its subroutes) to `/developer`. This funnels stray "where's the dev page?" guesses to the canonical developer profile without exposing the playground.

To allow this pattern for new standalone routes:

- Place the route at `app/<segment>/page.tsx` outside `[locale]`.
- Define `metadata` directly on the page (do NOT call `getPageMetadata` — it requires a `PAGE_NAMES` entry).
- Wrap with a minimal `app/<segment>/layout.tsx` that does NOT mount `SiteHeader` / `SiteFooter`.
- Add a `pathname.startsWith("/<segment>")` branch to the bypass `if` in `src/middleware.ts` that returns `NextResponse.next()` so the i18n middleware doesn't try to add a locale prefix. (The matcher itself no longer carries the negative list — `/dev/*` and `/developer` flow through the function body.)
- Do NOT add the route to `NAV_ITEMS`, `PAGE_NAMES`, `ROUTE_PATHS`, or `app/sitemap.ts`.

---

## Accessibility-for-SEO pattern

A page that renders mostly a hero/visual section should also output an `sr-only` block with the page's H1 and lead paragraph, sourced from the per-locale `seo.<pageName>` translations:

```tsx
const t = await getTranslations({
  locale,
  namespace: `seo.${PAGE_NAMES.HOME}`,
});

<div className="sr-only">
  <h1>{t("title")}</h1>
  <p>{t("description")}</p>
</div>;
```

This guarantees every page has exactly one crawler-visible H1 and a lead paragraph in the active locale, regardless of how the visual design treats headings. Apply the same pattern to every new page.

---

## Keywords (per-locale)

Keyword arrays live alongside titles/descriptions inside each locale's JSON, under `seo.<pageName>.keywords`. There is no shared `seo-keywords.ts` anymore — keywords are localized just like the rest of the SEO copy. If you want a baseline set repeated on every page, repeat it in each page's `keywords` array (DRY-ing this in code would require localizing the shared list, which is no simpler than just listing the terms per page).

Localize keywords in **every** locale JSON for the page — search engines weight keywords per language, so don't ship Uzbek keywords on the English page.

---

## Adding SEO for a new page — checklist

1. **Routing first.** Add the key to `PAGE_NAMES` and an entry to `ROUTE_PATHS` (see `docs/architecture.md` → Routing constants).
2. **Page → URL mapping.** Add an entry to `PAGE_TO_ROUTE` inside `shared/lib/seo/get-page-metadata.ts`.
3. **Localized SEO copy** in **all three** `shared/locales/{uz,en,ru}.json` files:
   ```jsonc
   "seo": {
     "<pageName>": { "title": "...", "description": "...", "keywords": ["..."] }
   }
   ```
4. **The route** at `src/app/[locale]/<segment>/page.tsx`:
   - `params: Promise<{ locale: Locale }>`.
   - `generateMetadata({ params })` awaits locale and calls `getPageMetadata(PAGE_NAMES.X, locale)`.
   - Re-read translations for the `sr-only` H1/lead via `getTranslations({ locale, namespace: \`seo.${PAGE_NAMES.X}\` })`.
   - Inject any extra JSON-LD via `<JsonLd id="..." schema={...} />`.
   - Render exactly one view from `src/views/`. No logic in the page.
5. **Sitemap auto-updates** — no edit needed; new `ROUTE_PATHS` × `LOCALES` are picked up.

### Dynamic detail pages (e.g. `/blog/[slug]`)

The starter does not ship a dynamic detail route. When you add one, detail routes do NOT use `getPageMetadata` / `PAGE_NAMES`. Build metadata inline in the route's `generateMetadata`:

- Look up the record by slug; if missing, return `{}` (page itself will `notFound()`).
- Read locale-specific copy via `getTranslations` from the relevant namespace (e.g. `blog.posts.<slug>`).
- Title pattern: `${record.title}` — the layout template appends `| Dastyorcha`.
- `alternates.canonical` and `alternates.languages` use the same `${DOMAIN}/${locale}${parentPath}/${slug}` shape, including an `x-default` pointing at `uz`.
- Reuse `OG_LOCALES`, `MAIN_OG_IMAGE_PATH`, `LOGO_URL`, and `TWITTER_CREATOR` from `shared/constants/seo/page-seo.ts`.
- Add each dynamic record to `app/sitemap.ts` (see sitemap section above).

---

## Rules / what NOT to do

- ❌ Don't put titles, descriptions, or OG copy inside view or widget components. SEO copy lives in `shared/locales/<locale>.json` under `seo.<pageName>`.
- ❌ Don't hard-code paths or absolute URLs anywhere. Always use `ROUTE_PATHS` + `DOMAIN` (and prefix with `/${locale}` for canonical/alternate URLs — `getPageMetadata` does this).
- ❌ Don't import `getPageMetadata` without passing the locale — it's `(pageName, locale) => Promise<Metadata>`.
- ❌ Don't repeat the Organization JSON-LD on individual pages — it's already in `app/layout.tsx`.
- ❌ Don't keep locale JSONs out of sync. If you add `seo.<page>` to one, add it to all three.
- ❌ Don't index dev-only pages — keep them under `/dev/` so `robots.ts` disallows them.
- ✅ Do keep `app/[locale]/<segment>/page.tsx` thin: `generateMetadata` + JSON-LD + `sr-only` block + one view.
- ✅ Do build absolute URLs as `${DOMAIN}/${locale}${ROUTE_PATHS.X.path}` (with `/` collapsing).

---

## Style-change sync rule (SEO)

Any change to SEO surface — `LAYOUT_METADATA`, the `seo` namespace shape, `getPageMetadata` signature/output, JSON-LD helpers, `PageMetadata` type, sitemap/robots logic, hreflang/locale code mapping — MUST in the same change:

1. Update this file (`docs/seo.md`) so it reflects the new shape/behavior.
2. Update `docs/translations.md` if the change touches locale JSONs or the i18n surface.
3. Update `CLAUDE.md` if the change alters project-level guidance.
4. Update `docs/architecture.md` if it touches routing constants or layering.

SEO is part of the project's reusable design surface; docs and code must not drift.
