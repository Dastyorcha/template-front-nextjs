import type { MetadataRoute } from "next";

import { DOMAIN, ROUTE_PATHS } from "@/shared/constants/route-paths";
import { LOCALES } from "@/shared/lib/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = Object.values(
    ROUTE_PATHS,
  ).flatMap((route) => {
    const trimmedPath = route.path === "/" ? "" : route.path;
    const isHome = route.path === "/";

    return LOCALES.map((locale) => {
      const url = `${DOMAIN}/${locale}${trimmedPath}`;
      const alternates = Object.fromEntries(
        LOCALES.map((l) => [l, `${DOMAIN}/${l}${trimmedPath}`]),
      );

      return {
        url,
        lastModified,
        changeFrequency: isHome ? ("weekly" as const) : ("monthly" as const),
        priority: isHome ? 1 : 0.8,
        alternates: {
          languages: alternates,
        },
      };
    });
  });

  const developerEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${DOMAIN}/developer`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${DOMAIN}/developer`]),
      ),
    },
  }));

  return [...staticEntries, ...developerEntries];
}
