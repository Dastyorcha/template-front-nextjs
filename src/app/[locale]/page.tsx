import { getTranslations } from "next-intl/server";

import { PAGE_NAMES } from "@/shared/constants/page-names";
import type { Locale } from "@/shared/lib/i18n/routing";
import { getPageMetadata } from "@/shared/lib/seo/get-page-metadata";
import { getWebsiteSchema } from "@/shared/lib/seo/get-organization-schema";
import { JsonLd } from "@/shared/lib/seo/json-ld";
import HomeView from "@/views/home";

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  return await getPageMetadata(PAGE_NAMES.HOME, locale);
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: `seo.${PAGE_NAMES.HOME}`,
  });

  const title = t("title");
  const description = t("description");

  return (
    <>
      <JsonLd
        id="website-schema"
        schema={getWebsiteSchema({
          name: title,
          description,
        })}
      />
      <div className="sr-only">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <HomeView />
    </>
  );
}
