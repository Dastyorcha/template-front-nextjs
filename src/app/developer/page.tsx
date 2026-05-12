import type { Metadata } from "next";

import { DEVELOPER_CONTACT_INFOS } from "@/shared/constants/contact-infos";
import { JsonLd } from "@/shared/lib/seo/json-ld";
import DeveloperPageView from "@/views/developer";

const DEVELOPER_URL = "https://muxsinjon.uz/developer";
const DEVELOPER_DESCRIPTION =
  "Muxsinjon Maxsudovich — software engineer building fast, accessible, multilingual web products for businesses across Central Asia.";

export const metadata: Metadata = {
  title: `${DEVELOPER_CONTACT_INFOS.name} — ${DEVELOPER_CONTACT_INFOS.role}`,
  description: DEVELOPER_DESCRIPTION,
  keywords: [
    "Muxsinjon Maxsudovich",
    "muxsinjon",
    "muxsinjon.uz",
    "software engineer Uzbekistan",
    "Dastyorcha",
    "Tashkent web developer",
    "Next.js developer Uzbekistan",
    "React engineer",
    "full-stack engineer Tashkent",
  ],
  alternates: { canonical: DEVELOPER_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "profile",
    url: DEVELOPER_URL,
    title: `${DEVELOPER_CONTACT_INFOS.name} — ${DEVELOPER_CONTACT_INFOS.role}`,
    description: DEVELOPER_DESCRIPTION,
    siteName: DEVELOPER_CONTACT_INFOS.name,
    images: [
      {
        url: "/developer/portrait.jpg",
        width: 1080,
        height: 1080,
        alt: `${DEVELOPER_CONTACT_INFOS.name} — portrait`,
      },
    ],
    firstName: "Muxsinjon",
    lastName: "Maxsudovich",
    username: "muxsinjon",
  },
  twitter: {
    card: "summary_large_image",
    title: `${DEVELOPER_CONTACT_INFOS.name} — ${DEVELOPER_CONTACT_INFOS.role}`,
    description: DEVELOPER_DESCRIPTION,
    creator: "@muxsinjon",
    images: ["/developer/portrait.jpg"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DEVELOPER_CONTACT_INFOS.name,
  givenName: "Muxsinjon",
  familyName: "Maxsudovich",
  alternateName: "muxsinjon",
  jobTitle: DEVELOPER_CONTACT_INFOS.role,
  url: DEVELOPER_CONTACT_INFOS.website.href,
  image: `${DEVELOPER_CONTACT_INFOS.website.href}/developer/portrait.jpg`,
  email: DEVELOPER_CONTACT_INFOS.email.value,
  telephone: DEVELOPER_CONTACT_INFOS.phone.value,
  nationality: { "@type": "Country", name: "Uzbekistan" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tashkent",
    addressCountry: "UZ",
  },
  knowsAbout: [
    "React",
    "Vue.js",
    "Next.js",
    "Nuxt.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Redux",
    "Zustand",
    "React Query",
    "Node.js",
    "ExpressJS",
    "MongoDB",
    "CRM systems",
    "ERP systems",
    "Web performance",
    "Accessibility",
    "Internationalization",
  ],
  sameAs: [
    DEVELOPER_CONTACT_INFOS.website.href,
    DEVELOPER_CONTACT_INFOS.github.href,
    DEVELOPER_CONTACT_INFOS.linkedin.href,
    DEVELOPER_CONTACT_INFOS.twitter.href,
    DEVELOPER_CONTACT_INFOS.facebook.href,
    DEVELOPER_CONTACT_INFOS.telegram.href,
    DEVELOPER_CONTACT_INFOS.substack.href,
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: DEVELOPER_CONTACT_INFOS.name,
      item: DEVELOPER_CONTACT_INFOS.website.href,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: DEVELOPER_CONTACT_INFOS.name,
      item: DEVELOPER_URL,
    },
  ],
};

export default function DeveloperPage() {
  return (
    <>
      <JsonLd id="developer-person-schema" schema={personSchema} />
      <JsonLd id="developer-breadcrumb-schema" schema={breadcrumbSchema} />
      <DeveloperPageView />
    </>
  );
}
