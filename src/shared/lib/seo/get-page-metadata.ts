import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PAGE_NAMES } from "@/shared/constants/page-names";
import {
  LOGO_URL,
  MAIN_OG_IMAGE_PATH,
  OG_LOCALES,
  TWITTER_CREATOR,
} from "@/shared/constants/seo/page-seo";
import { DOMAIN, ROUTE_PATHS } from "@/shared/constants/route-paths";
import { LOCALES, type Locale } from "@/shared/lib/i18n/routing";
import type { PageName } from "@/shared/types/seo/metadata.types";

const PAGE_TO_ROUTE: Record<PageName, string> = {
  [PAGE_NAMES.HOME]: ROUTE_PATHS[PAGE_NAMES.HOME].path,
};

function buildLocalizedUrl(locale: Locale, pagePath: string) {
  const trimmedPath = pagePath === "/" ? "" : pagePath;
  return `${DOMAIN}/${locale}${trimmedPath}`;
}

export async function getPageMetadata(
  pageName: PageName,
  locale: Locale,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `seo.${pageName}` });

  const pagePath = PAGE_TO_ROUTE[pageName];
  const canonical = buildLocalizedUrl(locale, pagePath);

  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, buildLocalizedUrl(l, pagePath)]),
  );

  const title = t("title");
  const description = t("description");
  const keywords = t.raw("keywords") as string[];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": buildLocalizedUrl("uz", pagePath),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALES[l],
      ),
      images: [{ url: MAIN_OG_IMAGE_PATH }],
    },
    twitter: {
      title,
      description,
      images: [MAIN_OG_IMAGE_PATH ?? LOGO_URL],
      creator: TWITTER_CREATOR,
    },
  };
}
