import type { Metadata } from "next";

import { DOMAIN } from "../route-paths";

export const MAIN_OG_IMAGE_PATH = "/og-image.png";
export const LOGO_URL = `${DOMAIN}/favicon.svg`;

export const OG_LOCALES: Record<string, string> = {
  uz: "uz_UZ",
  en: "en_US",
  ru: "ru_RU",
};

export const TWITTER_CREATOR = "@mxsnjon";

export const LAYOUT_METADATA: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: "Dastyorcha — Next.js starter template",
    template: "%s | Dastyorcha",
  },
  description:
    "Dastyorcha — production-ready Next.js 16 starter template with i18n, SEO, dark mode, and accessible UI primitives.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Dastyorcha",
    images: [{ url: MAIN_OG_IMAGE_PATH, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dastyorcha",
    description:
      "Production-ready Next.js 16 starter template by Muxsinjon Maxsudovich.",
    creator: TWITTER_CREATOR,
    images: [LOGO_URL],
  },
  icons: { icon: LOGO_URL },
};
