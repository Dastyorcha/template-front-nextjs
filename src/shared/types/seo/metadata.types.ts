import { PAGE_NAMES } from "@/shared/constants/page-names";

export type PageMetadata = {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  alternates: {
    canonical: string;
    languages: Record<string, string>;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    locale: string;
    images: { url: string }[];
  };
  twitter: {
    title: string;
    description: string;
    images: string[];
    creator: string;
  };
};

export type PageName = (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES];
