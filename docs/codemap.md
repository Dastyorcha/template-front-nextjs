# Codemap

_Update affected lines in-place when adding/removing/renaming exports. Do not regenerate wholesale._

## Root Config Files

- `next.config.ts` — `withNextIntl` — Next.js config with next-intl plugin for i18n.
- `tsconfig.json` — TypeScript configuration with `@/*` alias.
- `postcss.config.mjs` — PostCSS configuration for Tailwind.
- `components.json` — shadcn/ui configuration.

## App Layer

- `src/app/layout.tsx` — `metadata`, `viewport`, `RootLayout` — Root HTML layout with fonts and global metadata.
- `src/app/globals.css` — Tailwind imports, animations, theme tokens.
- `src/app/robots.ts` — `robots` — robots.txt generation with disallow rules.
- `src/app/sitemap.ts` — `sitemap` — XML sitemap with locale alternates.
- `src/middleware.ts` — `middleware`, `intlMiddleware`, `LOCALES` — i18n routing middleware with `/dev` redirects.
- `src/app/[locale]/layout.tsx` — `generateStaticParams`, `LocaleLayout` — Locale-based layout with header/footer wrapper.
- `src/app/[locale]/page.tsx` — `generateMetadata`, `HomePage` — Home page with SEO metadata and JSON-LD schema.
- `src/app/[locale]/not-found.tsx` — `LocaleNotFoundPage` — Locale-aware 404 page.
- `src/app/[locale]/[...rest]/page.tsx` — `CatchAllPage` — Catch-all page triggering notFound() for unmatched routes.
- `src/app/developer/layout.tsx` — `DeveloperLayout` — Container layout for developer page.
- `src/app/developer/page.tsx` — `metadata`, `personSchema`, `breadcrumbSchema`, `DeveloperPage` — Developer profile page with Person + BreadcrumbList JSON-LD schemas.
- `src/app/dev/layout.tsx` — `DevLayout` — Dev playground layout (sets default locale and provides messages).
- `src/app/dev/playground/page.tsx` — `DevPlaygroundPage` — Routes to DevPlaygroundView.

## Views Layer

- `src/views/home/index.tsx` — `HomeView` — Home page composition.
- `src/views/not-found.tsx` — `NotFoundView` — 404 page composition.
- `src/views/developer/index.tsx` — `DeveloperPageView` — Composes developer profile sections (Hero, Bio, Experience, Skills, Contact, Footer).
- `src/views/dev/playground.tsx` — `DevPlaygroundView` — Composes all playground sections with TooltipProvider and Toaster.

## Widgets Layer

### Layout Widgets

- `src/widgets/layout/header/site-header.tsx` — `SiteHeader` — Sticky header with logo, navigation, language switcher, CTA.
- `src/widgets/layout/header/desktop-nav.tsx` — `DesktopNav` — Desktop navigation menu.
- `src/widgets/layout/header/mobile-nav.tsx` — `MobileNav` — Sheet-based mobile navigation drawer.
- `src/widgets/layout/footer/site-footer.tsx` — `SiteFooter` — Footer with nav links, social icons, copyright.

### Home Widgets

- `src/widgets/home/hero/hero.tsx` — `Hero` — Hero section with logo, tagline, CTA buttons, social icons.

### Developer Widgets

- `src/widgets/developer/hero.tsx` — `DeveloperHero` — Developer hero section with photo, name, role, contact links.
- `src/widgets/developer/bio.tsx` — `DeveloperBio` — Developer highlights and background.
- `src/widgets/developer/experience.tsx` — `DeveloperExperience` — Work experience timeline.
- `src/widgets/developer/skills.tsx` — `DeveloperSkills` — Skills and expertise list.
- `src/widgets/developer/contact.tsx` — `DeveloperContact` — Contact CTA section.
- `src/widgets/developer/footer.tsx` — `DeveloperFooter` — Developer page footer.

### Dev Playground Widgets

- `src/widgets/dev/playground/header.tsx` — `PlaygroundHeader` — Sticky header with title, description, theme toggle, anchor nav.
- `src/widgets/dev/playground/section.tsx` — `PlaygroundSection` — Reusable section wrapper.
- `src/widgets/dev/playground/colors.tsx` — `ColorsSection` — Color palette showcase via THEME_TOKENS.
- `src/widgets/dev/playground/color-swatch.tsx` — `ColorSwatch` — Single color token swatch with computed CSS value.
- `src/widgets/dev/playground/typography.tsx` — `TypographySection` — Typography styles showcase.
- `src/widgets/dev/playground/radius.tsx` — `RadiusSection` — Border radius tokens showcase.
- `src/widgets/dev/playground/buttons.tsx` — `ButtonsSection` — Button variants × sizes.
- `src/widgets/dev/playground/forms.tsx` — `FormsSection` — Form inputs and controls.
- `src/widgets/dev/playground/feedback.tsx` — `FeedbackSection` — Toast, spinner, progress showcase.
- `src/widgets/dev/playground/overlays.tsx` — `OverlaysSection` — Dialog, drawer, popover, sheet showcase.
- `src/widgets/dev/playground/navigation.tsx` — `NavigationSection` — Tabs and pagination.
- `src/widgets/dev/playground/data.tsx` — `DataSection` — Card and table components.
- `src/widgets/dev/playground/layout.tsx` — `LayoutSection` — ScrollArea, ResizablePanelGroup, Carousel.
- `src/widgets/dev/playground/calendar.tsx` — `CalendarSection` — Calendar in single-date mode.
- `src/widgets/dev/playground/logo.tsx` — `LogoSection` — Logo variants showcase.
- `src/widgets/dev/playground/site-chrome.tsx` — `SiteChromeSection` — Embeds live SiteHeader and SiteFooter.

### Not-Found Widgets

- `src/widgets/not-found/content/not-found-content.tsx` — `NotFoundContent` — 404 error page with large "404", heading, Logo, home link.

## Shared Layer

### UI Components (shadcn/ui)

- `src/shared/components/ui/accordion.tsx` — `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` — Collapsible content.
- `src/shared/components/ui/button.tsx` — `Button`, `buttonVariants` — Button with variants and sizes.
- `src/shared/components/ui/calendar.tsx` — `Calendar` — react-day-picker wrapper.
- `src/shared/components/ui/card.tsx` — `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardAction`, `CardDescription`, `CardContent` — Card primitives.
- `src/shared/components/ui/carousel.tsx` — `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` — embla-carousel slider.
- `src/shared/components/ui/checkbox.tsx` — `Checkbox` — Checkbox input.
- `src/shared/components/ui/dialog.tsx` — `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription` — Modal dialog.
- `src/shared/components/ui/drawer.tsx` — `Drawer`, drawer sub-components — Bottom sheet drawer.
- `src/shared/components/ui/dropdown-menu.tsx` — `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` — Dropdown menu.
- `src/shared/components/ui/input.tsx` — `Input` — Text input.
- `src/shared/components/ui/label.tsx` — `Label` — Form label.
- `src/shared/components/ui/navigation-menu.tsx` — `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `navigationMenuTriggerStyle` — Header navigation.
- `src/shared/components/ui/pagination.tsx` — `Pagination`, sub-components — Page navigation.
- `src/shared/components/ui/popover.tsx` — `Popover`, `PopoverTrigger`, `PopoverContent` — Floating popover.
- `src/shared/components/ui/progress.tsx` — `Progress` — Progress bar.
- `src/shared/components/ui/radio-group.tsx` — `RadioGroup`, `RadioGroupItem` — Radio button group.
- `src/shared/components/ui/resizable.tsx` — `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` — Resizable split panels.
- `src/shared/components/ui/scroll-area.tsx` — `ScrollArea`, `ScrollBar` — Scrollable container.
- `src/shared/components/ui/separator.tsx` — `Separator` — Divider line.
- `src/shared/components/ui/sheet.tsx` — `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription` — Side sheet drawer.
- `src/shared/components/ui/sonner.tsx` — `Toaster` — sonner toast provider.
- `src/shared/components/ui/spinner.tsx` — `Spinner` — Loading spinner.
- `src/shared/components/ui/switch.tsx` — `Switch` — Toggle switch.
- `src/shared/components/ui/table.tsx` — `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell` — Data table.
- `src/shared/components/ui/tabs.tsx` — `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — Tabbed content.
- `src/shared/components/ui/textarea.tsx` — `Textarea` — Multi-line text input.
- `src/shared/components/ui/tooltip.tsx` — `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` — Tooltip.

### Custom Components

- `src/shared/custom/logo.tsx` — `Logo` — Reusable brand logo with variants, sizes, color modes.
- `src/shared/custom/lang-switcher.tsx` — `LangSwitcher` — Language picker dropdown.
- `src/shared/custom/social-icons.tsx` — `TelegramIcon`, `InstagramIcon`, etc. — SVG brand icons.

### Hooks

- `src/shared/hooks/use-in-view.ts` — `useInView` — IntersectionObserver hook with threshold/once options.

### Lib

- `src/shared/lib/utils.ts` — `cn` — clsx + tailwind-merge composer.
- `src/shared/lib/i18n/routing.ts` — `LOCALES`, `DEFAULT_LOCALE`, `Locale`, `routing` — next-intl routing config (uz default, en, ru, always-prefix).
- `src/shared/lib/i18n/request.ts` — Default `getRequestConfig` — next-intl server config; loads messages per locale with fallback.
- `src/shared/lib/i18n/navigation.ts` — `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` — Type-safe navigation exports.
- `src/shared/lib/seo/get-page-metadata.ts` — `getPageMetadata` — Metadata builder (title, description, canonical, hreflang, OG, Twitter).
- `src/shared/lib/seo/get-organization-schema.ts` — `getOrganizationSchema`, `getWebsiteSchema` — JSON-LD schema generators.
- `src/shared/lib/seo/json-ld.tsx` — `JsonLd` — Script component injecting JSON-LD.

### Constants

- `src/shared/constants/page-names.ts` — `PAGE_NAMES` — Page identifier keys.
- `src/shared/constants/route-paths.ts` — `DOMAIN`, `ROUTE_PATHS` — Site domain and route mappings.
- `src/shared/constants/nav-items.ts` — `NavItem`, `NAV_ITEMS` — Navigation menu items.
- `src/shared/constants/firm.ts` — `LANGUAGES`, `FirmLanguage` — Language constants and type.
- `src/shared/constants/contact-infos.ts` — `CONTACT_INFOS`, `DEVELOPER_CONTACT_INFOS`, `ContactKey`, `DeveloperContactKey` — Contact details.
- `src/shared/constants/playground-constants.ts` — `THEME_TOKENS`, `RADIUS_TOKENS`, `PLAYGROUND_SECTIONS` — Playground tokens.
- `src/shared/constants/seo/page-seo.ts` — `LAYOUT_METADATA`, `MAIN_OG_IMAGE_PATH`, `LOGO_URL`, `OG_LOCALES`, `TWITTER_CREATOR` — Global SEO config.

### Locales

- `src/shared/locales/en.json` — English translations.
- `src/shared/locales/ru.json` — Russian translations.
- `src/shared/locales/uz.json` — Uzbek translations (default).

### Types

- `src/shared/types/seo/metadata.types.ts` — `PageMetadata`, `PageName` — SEO metadata type definitions.
