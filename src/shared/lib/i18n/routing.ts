import { defineRouting } from "next-intl/routing";

export const LOCALES = ["uz", "en", "ru"] as const;
export const DEFAULT_LOCALE = "uz";

export type Locale = (typeof LOCALES)[number];

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
});
