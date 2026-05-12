import { CONTACT_INFOS } from "@/shared/constants/contact-infos";
import { LOGO_URL } from "@/shared/constants/seo/page-seo";
import { DOMAIN } from "@/shared/constants/route-paths";

const SAME_AS: string[] = [
  CONTACT_INFOS.telegram.href,
  CONTACT_INFOS.github.href,
  CONTACT_INFOS.linkedin.href,
  CONTACT_INFOS.twitter.href,
  CONTACT_INFOS.facebook.href,
  CONTACT_INFOS.substack.href,
];

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dastyorcha",
    url: DOMAIN,
    logo: LOGO_URL,
    image: LOGO_URL,
    description:
      "Dastyorcha — production-ready Next.js starter template by Muxsinjon Maxsudovich.",
    email: CONTACT_INFOS.email.value,
    telephone: CONTACT_INFOS.phone.value,
    areaServed: "UZ",
    sameAs: SAME_AS,
  };
}

export function getWebsiteSchema(args: {
  name: string;
  description: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: args.name,
    description: args.description,
    url: args.url ?? DOMAIN,
  };
}
