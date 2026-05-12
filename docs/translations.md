> **Read this whenever a task touches user-facing strings, locales, language switching, or `src/shared/locales/*.json`.** This is the source of truth for how i18n is wired in this project. See `docs/architecture.md` for FSD layering and `docs/seo.md` for how locales feed into metadata.

# Translations (i18n)

The site is multilingual on three locales — **`uz` (default), `en`, `ru`** — built on **`next-intl` v4**. Routing is path-based with the locale always visible (`/uz/...`, `/en/...`, `/ru/...`). The default locale is **never hidden**: `/` redirects to `/uz`.

---

## File map

```
src/
├── middleware.ts                       # next-intl locale routing + /dev → /developer redirect + standalone-route bypass
├── shared/
│   ├── locales/
│   │   ├── uz.json                     # Uzbek (default)
│   │   ├── en.json                     # English
│   │   └── ru.json                     # Russian
│   ├── lib/i18n/
│   │   ├── routing.ts                  # locales, defaultLocale, Locale type, routing config
│   │   ├── request.ts                  # getRequestConfig — loads messages per request
│   │   └── navigation.ts               # typed Link / useRouter / usePathname / redirect
│   └── custom/
│       └── lang-switcher.tsx           # reusable dropdown component
└── app/
    ├── layout.tsx                      # root layout, <html lang> from getLocale()
    ├── [locale]/
    │   ├── layout.tsx                  # NextIntlClientProvider + setRequestLocale
    │   └── page.tsx                    # home — params.locale → getPageMetadata + translations
    └── dev/
        └── layout.tsx                  # dev playground provider (default locale only)

next.config.ts                          # wraps NextConfig with createNextIntlPlugin
```

---

## How it fits together

1. **`middleware.ts`** intercepts requests and runs three steps in order:
   - **Redirect** — if the path is `/dev` or any `/dev/*` (except `/dev/playground` and its subroutes), redirect to `/developer`.
   - **Bypass** — if the path starts with `/dev/` (i.e. `/dev/playground`) or `/developer`, return `NextResponse.next()` so the i18n middleware does not touch it.
   - **Locale routing** — otherwise hand off to the `next-intl` middleware (`createMiddleware(routing)`), which detects the locale from the URL and rewrites if needed.

   The matcher only excludes `api`, `_next`, `_vercel`, and any path with a file extension — `/dev/*` and `/developer` flow through the function body so the bypass/redirect logic above can run. To add a new non-localised standalone route, extend the bypass `if` in `src/middleware.ts` rather than touching the matcher.

2. **`createNextIntlPlugin`** in `next.config.ts` points to `src/shared/lib/i18n/request.ts`, which loads the JSON file for the active locale on every server request.
3. **`app/layout.tsx`** is the top-level root layout. It reads the locale via `getLocale()` and sets `<html lang>` accordingly. It applies to every route, including `/dev/*`.
4. **`app/[locale]/layout.tsx`** wraps locale-aware pages with `NextIntlClientProvider` and calls `setRequestLocale(locale)` so `useTranslations` works in nested server components and static rendering is enabled.
5. **`app/dev/layout.tsx`** wraps `/dev/*` (which lives outside the `[locale]` segment) with the default-locale provider so showcased widgets keep rendering. Dev pages do not get translated content beyond what defaults provide.

---

## Translation keys (the JSON shape)

All three JSON files share the same key tree. **Adding a key in one file requires adding it in all three** — keep them in sync. The starter ships with the minimum surface for a one-page hero; add new namespaces here as you build out the project.

```jsonc
{
  "common":       { "siteName", "tagline" },                          // brand strings reused anywhere
  "hero": {                                                           // home hero (src/widgets/home/hero/hero.tsx)
    "eyebrow": "...",
    "title": "...",
    "tagline": "...",
    "ctaDeveloper": "...",                                            // primary CTA — links to /developer
    "ctaContact": "...",                                              // secondary CTA — links to CONTACT_INFOS.telegram.href
    "contactsLabel": "..."                                            // aria-label for the contact-icon row
  },
  "header":       { "home", "openMenu", "menuDescription", "contactCta" },
  "nav": {                                                            // shared header/footer nav labels (keyed by NAV_ITEMS[].key)
    "home":     { "label": "..." }
                                                                      // add new pages here as { "<key>": { "label": "..." } }
                                                                      // for grouped menus, add "children": { "<subKey>": "..." }
  },
  "footer": {                                                         // src/widgets/layout/footer/site-footer.tsx
    "home": "...",
    "description": "...",
    "navHeading": "...",
    "contactHeading": "...",
    "copyright": "© {year} ...",
    "developer": "...",                                               // label rendered before the developer-name link
    "social": { "telegram", "github", "linkedin", "twitter", "facebook", "substack" }
  },
  "langSwitcher": {                                                   // language switcher labels (native names stay in their own language)
    "label": "...",
    "ariaLabel": "...",
    "languages": { "uz": "...", "en": "...", "ru": "..." }
  },
  "notFound": {                                                       // /[locale]/not-found.tsx + /[locale]/[...rest] catch-all
    "title": "...",
    "subtitle": "...",
    "ctaPrimary": "...",
    "ctaSecondary": "...",
    "logoAlt": "..."
  },
  "seo": {                                                            // per-page SEO copy (keyed by PAGE_NAMES)
    "home": { "title": "...", "description": "...", "keywords": [] }
                                                                      // add a block per new PAGE_NAMES entry
  }
}
```

- Keys use **camelCase** (`ctaPrimary`, `ariaLabel`).
- Group by **surface area / namespace**, not by component name (e.g. `hero`, not `HomePageHeroContent`).
- Arrays are read with `t.raw("keys")` (see `getPageMetadata` for the SEO keywords pattern).
- Language _display_ names inside `langSwitcher.languages` are intentionally written in their **native language** (so an English speaker still recognises "Русский").

---

## Using translations in code

### Server Components — `getTranslations`

```tsx
import { getTranslations } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return <h1>{t("title")}</h1>;
}
```

Always pass `{ locale }` explicitly when you have it from route params — this enables static rendering. If the function is invoked outside a request scope (e.g. in `generateMetadata`), pass the locale.

### Client Components — `useTranslations`

```tsx
"use client";
import { useTranslations } from "next-intl";

export function Cta() {
  const t = useTranslations("hero");
  return <button>{t("ctaPrimary")}</button>;
}
```

The component must be inside a `<NextIntlClientProvider>` tree (set up in `app/[locale]/layout.tsx` automatically).

### Reading raw values (e.g. arrays)

```ts
const keywords = t.raw("keywords") as string[];
```

Use sparingly — only for non-string values like arrays/objects.

---

## Linking and navigation — always use the typed helpers

```ts
import {
  Link,
  useRouter,
  usePathname,
  redirect,
} from "@/shared/lib/i18n/navigation";
```

- `<Link href="/services">` — automatically prefixes the active locale (`/uz/services`).
- `useRouter().push("/about")` — same.
- `useRouter().replace(pathname, { locale: "en" })` — switch locale while preserving the current path. **This is what the language switcher does.**
- `usePathname()` returns the path **without** the locale prefix, so it round-trips cleanly through `replace(pathname, { locale })`.
- **Never** import from `next/link` or `next/navigation` for app routes — you'd skip locale handling.

---

## The language switcher (`shared/custom/lang-switcher.tsx`)

A reusable client component. Drop it anywhere a switcher is needed:

```tsx
import { LangSwitcher } from "@/shared/custom/lang-switcher";

<LangSwitcher align="end" variant="outline" size="sm" />;
```

Props (all optional):

| prop        | values                                | default     |
| ----------- | ------------------------------------- | ----------- |
| `align`     | `"start" \| "center" \| "end"`        | `"end"`     |
| `variant`   | `"outline" \| "ghost" \| "secondary"` | `"outline"` |
| `size`      | `"xs" \| "sm" \| "default" \| "lg"`   | `"sm"`      |
| `className` | string                                | —           |

It wraps `DropdownMenu` from `components/ui/`, reads the active locale via `useLocale`, and switches via `useRouter().replace(pathname, { locale })`. Labels come from the `langSwitcher.languages.<locale>` keys — language display names are kept in their native form so they're recognisable across locales.

---

## SEO and locales

Every page's metadata is locale-aware. See `docs/seo.md` for the full pipeline. Short version:

- `getPageMetadata(pageName, locale)` reads `seo.<pageName>` from the active locale's JSON.
- `alternates.languages` is generated for all locales + `x-default` (Uzbek) so search engines pick the right hreflang.
- `openGraph.locale` and `alternateLocale` are set per locale (`uz_UZ`, `en_US`, `ru_RU`).
- The sitemap (`app/sitemap.ts`) emits one entry **per locale per route** with cross-language `alternates.languages` blocks.

---

## Adding a new translation key — checklist

1. Add the key to **all three** JSONs (`uz.json`, `en.json`, `ru.json`) with appropriate translations. Same path in each file.
2. Reference it in code with `t("namespace.key")` (or `useTranslations("namespace")` + `t("key")`).
3. If the key is for SEO copy, place it under `seo.<pageName>` and `getPageMetadata` will pick it up automatically.
4. If you introduce a new top-level namespace, document it in this file's "Translation keys" section.

## Adding a new locale — checklist

1. Add the locale code to `LOCALES` in `src/shared/lib/i18n/routing.ts` (e.g. `["uz", "en", "ru", "kk"]`).
2. Create `src/shared/locales/<code>.json` with **every** key from `uz.json` translated.
3. Add an entry to `OG_LOCALES` in `src/shared/constants/seo/page-seo.ts` (e.g. `kk: "kk_KZ"`).
4. Add the language display name to `langSwitcher.languages.<code>` in **all** locale JSONs.
5. The sitemap, hreflang alternates, and switcher all pick the new locale up automatically.

## Removing a key

Remove it from **all three** JSONs at once. A missing key produces a runtime warning and falls back to the key path string — easy to spot in dev.

---

## Rules / what NOT to do

- ❌ Don't hard-code user-facing strings in `views/`, `widgets/`, or `app/`. Always go through `t(...)`.
- ❌ Don't import from `next/link` / `next/navigation` for in-app routes — use `@/shared/lib/i18n/navigation`.
- ❌ Don't keep locale JSON files out of sync. If you add a key in `uz.json`, add it to `en.json` and `ru.json` in the same change.
- ❌ Don't translate route paths themselves — `ROUTE_PATHS` stays the same for every locale; only the locale prefix changes (`/uz/services`, `/en/services`).
- ❌ Don't translate `/dev/*` content — it's a dev-only design QA surface and uses the default locale.
- ✅ Do group keys by surface area (`hero`, `seo.home`), not by component name.
- ✅ Do use `getTranslations({ locale, ... })` in server contexts where the locale comes from params.
- ✅ Do use the `LangSwitcher` component as-is rather than inlining a switcher.

---

## Style-change sync rule (i18n)

Any change that affects the i18n surface — `LOCALES`, default locale, namespace shape in JSON files, the routing/request/navigation config, or the `LangSwitcher` API — MUST in the same change:

1. Update **this file** (`docs/translations.md`) so it reflects the new shape/behaviour.
2. Update `CLAUDE.md` if it alters project-level guidance.
3. Update `docs/architecture.md` if it touches the FSD layering or shared file map.
4. Update `docs/seo.md` if the SEO pipeline (per-locale alternates, OG locale codes, sitemap shape) is affected.

i18n is part of the project's reusable surface; docs and code must not drift.
