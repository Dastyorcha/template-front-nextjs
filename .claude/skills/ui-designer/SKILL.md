---
name: ui-designer
description: Use this skill on any change to design tokens, shadcn primitives, widgets, views, page compositions, the dev playground, or user-facing strings. Triggers on file paths under `src/shared/components/ui/`, `src/widgets/`, `src/views/`, `src/app/globals.css`, `src/shared/locales/*.json`, and on tasks involving adding or updating components, design tokens, color/radius/font, theming, dark mode, animations, responsive layout, accessibility, forms, typography, copy, page SEO metadata, locales, translations, the language switcher, or anything visible to end users. Read `CLAUDE.md`, `docs/architecture.md`, `docs/translations.md`, and `docs/seo.md` before applying these rules.
---

# UI Designer

Strict ruleset for any visual or i18n change in this Next.js 16 + Tailwind v4 + shadcn/ui starter template (Dastyorcha). Every rule is enforceable. Where a rule references a path or subsystem, the linked doc is the source of truth — read it.

This skill and `CLAUDE.md` must agree. If they ever disagree, the docs under `docs/` are the tiebreaker — fix whichever is wrong in the same change.

## Decide autonomously vs. ASK the user

Make professional design decisions on your own. Ask only for changes the user must explicitly own.

### Decide autonomously

- **Colors** — pick from tokens in `src/app/globals.css` (`bg-primary`, `text-foreground`, `var(--chart-N)`, etc.). Never invent or hardcode.
- **Typography** — heading scale from Tailwind defaults (`text-base` through `text-9xl`); no arbitrary `text-[…]px` unless a `clamp()` is genuinely justified.
- **Layout** — cards vs list vs row, column counts, alignment, spacing, eyebrow labels, icon picks (from `lucide-react`).
- **Card / button style** — variant, outlined, ghost, filled with `bg-card` — pick what reads best for the surrounding sections.
- **Copy phrasing** — within the tone guide below.
- **Section ordering** within a page.
- **Simple `tw-animate-css` utility animations** — fade, slide, scale; default durations 150 ms (micro) / 250 ms (UI) / 400 ms (page); always with a `prefers-reduced-motion` fallback.

### ASK the user before

- **Installing any new package** (`npm install …`, a shadcn primitive that pulls a new dependency, etc.).
- **Adding any animation library or non-trivial JS animation** — orchestrated sequences, layout animations, gestures, custom keyframes, `AnimatePresence`-style transitions. `framer-motion` is **not** installed and must not be installed without explicit approval.
- **Removing or renaming a public-facing token, primitive, or namespace** that other code depends on.
- **Major scope changes** — adding a page, restructuring a route, new locale, new shadcn primitive that hasn't been requested.

When in doubt, prefer to act and explain the choice afterwards rather than ping-ponging clarifications.

## Tokens — only from `src/app/globals.css`

- Color classes: `bg-background`, `bg-card`, `bg-primary`, `bg-secondary`, `bg-muted`, `bg-accent`, `bg-destructive`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`.
- Charts: `var(--chart-1)` through `var(--chart-5)`.
- Radius: `var(--radius-sm/md/lg/xl/2xl/3xl/4xl)` or the `rounded-*` utility mapped to it.
- Fonts: `font-sans` (Archivo body), `font-heading` (Archivo Black, distinct heavy display), `font-mono` (Geist Mono).
- **Never** write hex / rgb / hsl / oklch literals in components.
- New token → add to `@theme` in `globals.css` first, then use it. A new token is a design-system change → trigger the Style-change sync rule below.

## Tailwind only

- No `.module.css`, no `<style>` blocks, no inline `style` for color / spacing / layout.
- Conditional classes via `cn()` from `@/shared/lib/utils`.
- Variants via `class-variance-authority` — match the pattern in `src/shared/components/ui/button.tsx`.
- Tailwind v4: extend tokens via `@theme` in `globals.css`, never via a config file.
- Avoid arbitrary values (e.g. `w-[437px]`) unless no scale value fits.

## Animation

- Default library: `tw-animate-css` (already installed). Use its utility classes for fade, slide, zoom, rotate, bounce.
- Animate only `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `box-shadow`.
- Default durations: 150 ms (micro), 250 ms (UI), 400 ms (page).
- Always honour `prefers-reduced-motion: reduce` — short-circuit to the final state, no transform / opacity transition.
- Decide simple utility animations on your own. ASK before adding a library, custom keyframes, scroll-orchestrated sequences, or anything that needs a JS-driven IntersectionObserver beyond a one-shot reveal.

## FSD layer placement (per `docs/architecture.md`)

- `src/app/` — routing only; one view import per page; no logic, no styles beyond Next.js layout wrappers.
- `src/views/` — page composition and layout; only minimal cross-widget coordination state.
- `src/widgets/` — the state-holding unit; owns hooks, handlers, modals, API calls.
- `src/features/` — hooks and logic shared across 2+ widgets (e.g. `useQuizSocket`).
- `src/shared/` — `components/ui/` (shadcn primitives), `custom/` (cross-cutting components like `Logo`, `LangSwitcher`), `hooks/`, `lib/` (`utils.ts`, `i18n/`, `seo/`), `types/`, `config/`, `constants/`, `contexts/`, `locales/`, `assets/`.
- shadcn primitives live at **`src/shared/components/ui/`** — keep them there.
- Never invert dependencies: a widget cannot import from a view; `app/` only imports views.

## Reuse before creating

Check `src/shared/components/ui/` first. Currently installed primitives:

`button`, `calendar`, `card`, `carousel`, `checkbox`, `dialog`, `drawer`, `dropdown-menu`, `input`, `label`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `separator`, `sheet`, `sonner`, `spinner`, `switch`, `table`, `tabs`, `textarea`, `tooltip`.

- New primitive → `npx shadcn@latest add <name>`. ASK first if it pulls a new dependency. Do not hand-roll.
- Icons: `lucide-react` only — never mix icon libraries. Brand marks (Telegram, Instagram, Facebook, Twitter, LinkedIn) come from `@/shared/custom/social-icons.tsx`.
- Toasts: `sonner` (`<Toaster />` is already mounted).
- Drawers: `vaul` via shadcn `drawer`.
- Resizable panels: `react-resizable-panels` via shadcn `resizable`.

## Theming

- Dark mode toggled via `.dark` class on root, managed by `next-themes`.
- Use semantic tokens only — never `dark:bg-zinc-900` or any literal dark variant.
- Verify every visual change at `/dev/playground` in both themes before completing the task.

## Responsive

- Mobile-first: write base styles for mobile, layer up with `sm:` `md:` `lg:` `xl:`.
- Test every change at 320, 768, 1024, and 1440 px.
- Use `rem` / `em` for type, never raw `px`.
- Fluid type via `clamp()` in arbitrary values when needed (e.g. `text-[clamp(1rem,2vw,1.5rem)]`).
- Container widths come from Tailwind `container` utility or token-based `max-w-*` — no arbitrary widths.
- Touch targets ≥ 44 × 44 px on mobile.

## Performance

- All images via `next/image` with explicit `width` and `height` to prevent CLS.
- Mark `"use client"` only when the file actually needs hooks, browser APIs, or event handlers — keep server components by default.
- Heavy or below-the-fold widgets → import via `next/dynamic`.
- Use `next/font` for any custom font (already wired via `--font-archivo`, `--font-archivo-black`, `--font-geist-mono`).
- No `<img>` tags for project assets — only for external URLs that `next/image` cannot handle.
- Lazy-load offscreen carousels and modals.

## Required component states

- Default, hover, `focus-visible:ring-ring`, active, disabled.
- Any data view defines loading + empty + error states.
- Use `Spinner` from `src/shared/components/ui/spinner.tsx` for action loading.

## Forms

- Use shadcn primitives only: `Input`, `Label`, `Textarea`, `Checkbox`, `RadioGroup`, `Switch`, `Select`.
- `<Label>` always above its input, linked via `htmlFor`.
- Validate on blur, not on every keystroke.
- Error messages explain **how to fix**, not just "invalid".
- Required fields marked clearly (visible indicator + `aria-required`).
- Submit button disabled only when a reason is shown nearby.
- All form copy goes through `t(...)` — no hardcoded labels, placeholders, or errors.

## Accessibility

- Do not strip Radix `aria-*` props or `asChild`.
- Contrast ≥ 4.5:1 for text, ≥ 3:1 for UI in both themes.
- Touch targets ≥ 44 × 44 px on mobile.
- Decorative `lucide` icons get `aria-hidden`; standalone icons get a localized `aria-label`.
- Every form field has an associated `<Label>` via `htmlFor`.

## Typography hierarchy

- Heading scale comes from Tailwind defaults (`text-xs` / `sm` / `base` / `lg` / `xl` / `2xl` / … / `9xl`) — no arbitrary sizes.
- One `<h1>` per page; nest `h2` → `h3` → `h4` in order, no skipping levels.
- Line-height: `leading-tight` for headings, `leading-relaxed` for body, `leading-normal` default.
- Long-form text width: `max-w-prose` (≈ 65ch) for readability.
- `text-balance` on headings, `text-pretty` on long paragraphs.
- Numerical / tabular content: `font-mono tabular-nums`.
- Display headings (hero, section titles) use `font-heading` (Archivo Black). Body uses `font-sans` (Archivo).

## Copy — write like a careful product engineer, not an AI

This is a starter template — copy is calm, factual, specific, and confident. **Avoid the sound of generated marketing prose.** When forking for a new project, the same rules apply to whatever brand voice the new project adopts.

### Forbidden words / phrases

Do not ship copy containing any of these unless the user explicitly approves:

`delve`, `tapestry`, `navigate the [X] of`, `in the realm of`, `leveraging`, `robust`, `seamless`, `comprehensive solutions`, `cutting-edge`, `harness the power of`, `vibrant`, `bustling`, `elevate`, `unlock`, `synergy`, `ecosystem`, `pivotal`, `intricate`, `myriad`, `plethora`, `unparalleled`, `world-class`, `revolutionary`, `rest assured`, `our team of dedicated professionals`, `at the forefront of`, `dive into`.

### Stylistic rules

- **Active voice, verb-led**, sentence-case throughout. No Title Case for buttons / labels / headings.
- **Specific over generic.** "Three locales out of the box, hreflang generated automatically" beats "Multilingual support". Numbers, library versions, and concrete behaviors carry more weight than adjectives.
- **No filler:** drop `simply`, `really`, `very`, `truly`, `definitely`, `actually`.
- **No hedging:** drop `might want to`, `could potentially`, `helps you to`. State what the template does.
- **No exclamation marks** in declarative copy.
- **Use em-dashes sparingly.** A clean comma or full stop usually reads better. Em-dashes are fine for genuine asides, not as default punctuation.
- **Buttons start with an action verb** ("Book a consultation", "Read more", not "OK" or "Submit").
- **Empty states explain what the user can do next.** Errors explain how to fix.
- **Every user-facing string goes through `t(...)`** — never hardcoded. See `docs/translations.md`.

### Voice

- Confident, factual, conservative. Avoid hype.
- Refer to the project by its brand name ("Dastyorcha" by default; whatever the fork renames to). Use "we" only when the section is explicitly first-person.
- Cite concrete proof points (library versions, feature names, supported locales, included primitives) where it strengthens credibility.
- Avoid casual contractions in primary copy ("we're" → "we are") unless the surface is conversational (FAQ, transient toasts).

## Image placeholders — use the brand `Logo`

When a section needs an image but a final asset isn't yet available, render `<Logo>` from `@/shared/custom/logo` as the placeholder. **Do not** use external placeholder services, lorem-picsum, unsplash, or stock photo URLs.

```tsx
import { Logo } from "@/shared/custom/logo";

<Logo variant="single" size="lg" colorMode="primary" className="mx-auto" />;
```

When the final asset arrives, swap the `<Logo>` for `<Image>` from `next/image` with explicit `width` / `height` and a localized `alt` via `t(...)`.

## Naming (per `docs/architecture.md`)

- Files and folders: **kebab-case** — no exceptions.
- Components, types, interfaces, enums: **PascalCase**.
- Variables and functions: **camelCase**.
- Hooks: camelCase + `use` prefix (`useCreate`, `useGetList`).
- Constants: **UPPER_SNAKE_CASE**.

## Translations (per `docs/translations.md`)

- Never hardcode user-facing strings in `views/`, `widgets/`, or `app/`.
- All copy goes through `t(...)` from `next-intl`.
- Adding a key requires adding it to **all three** locale files in the same change: `src/shared/locales/uz.json`, `en.json`, `ru.json`.
- Group keys by surface area (`hero`, `aboutTeaser`, `whyChooseUs`, `stats`, `seo.<page>`), not by component name.
- Keys are camelCase (`ctaPrimary`, `ariaLabel`).
- Server components: `getTranslations({ locale, namespace })` — pass `locale` from route params for static rendering.
- Client components: `useTranslations(namespace)` inside `<NextIntlClientProvider>`.
- Arrays read via `t.raw("keys")`.
- Navigation: import `Link`, `useRouter`, `usePathname`, `redirect` from `@/shared/lib/i18n/navigation` — **never** from `next/link` or `next/navigation`.
- Use `<LangSwitcher>` from `@/shared/custom/lang-switcher` as-is — do not reimplement.
- `/dev/*` is excluded from i18n by middleware; do not translate dev playground content.

## SEO — pages only, never components (per `docs/seo.md`)

- Routes come from `PAGE_NAMES` and `ROUTE_PATHS` in `src/shared/constants/` — never hardcode paths.
- Page metadata uses `getPageMetadata(pageName, locale)` which reads `seo.<pageName>` from locale JSONs.
- **Never** add metadata, OG tags, or hreflang to widgets, views, or components — only on `src/app/[locale]/<route>/page.tsx`.
- Hreflang `alternates.languages` is auto-generated for all locales plus `x-default` (uz).
- SEO copy keys (`title`, `description`, `keywords`) live under `seo.<pageName>` in all three locale JSONs.

## Style-change sync rule (mandatory)

Any change that affects reusable design surface or the i18n surface MUST update **in the same change**:

1. `src/widgets/dev/playground/*` (or `constants.ts`) — when a new variant, size, or token is added.
2. `CLAUDE.md` — if project-level guidance shifts.
3. `docs/architecture.md` — if layering, file map, or naming changes.
4. `docs/translations.md` — if locale list, namespace shape, or i18n API changes.
5. `docs/seo.md` — if SEO pipeline (per-locale alternates, OG codes, sitemap shape) changes.
6. **This file** (`SKILL.md`) — if any of the rules above shift.

If a change does not affect any of the above, state that explicitly when reporting it. The `enforce-doc-sync.sh` Stop hook blocks finishing the task if a hook script changes without `docs/claude-hooks.md`, or if a skill changes without `docs/claude-skills.md` — the rest of this rule is on you.

## Reference patterns to follow

- cva variants → `src/shared/components/ui/button.tsx`
- Overlays → `src/shared/components/ui/dialog.tsx`, `sheet.tsx`, `drawer.tsx`
- Form atoms → `src/shared/components/ui/input.tsx`, `label.tsx`, `textarea.tsx`
- Widget composition → `src/widgets/home/hero/hero-content.tsx`
- View composition → `src/views/dev/playground.tsx`, `src/views/home/hero.tsx`
- Playground section template → `src/widgets/dev/playground/section.tsx` + `header.tsx`
- i18n typed nav → `src/shared/lib/i18n/navigation.ts`
- LangSwitcher → `src/shared/custom/lang-switcher.tsx`
- Logo (placeholder pattern) → `src/shared/custom/logo.tsx`
- Token source → `src/app/globals.css` (`@theme`, `:root`, `.dark` blocks)
