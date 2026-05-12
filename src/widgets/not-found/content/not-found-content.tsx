import { useTranslations } from "next-intl";

import { Button } from "@/shared/components/ui/button";
import { PAGE_NAMES } from "@/shared/constants/page-names";
import { ROUTE_PATHS } from "@/shared/constants/route-paths";
import { Logo } from "@/shared/custom/logo";
import { Link } from "@/shared/lib/i18n/navigation";

export default function NotFoundContent() {
  const t = useTranslations("notFound");

  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 py-20 text-center sm:gap-8 sm:py-24"
    >
      <Logo
        variant="single"
        size="xl"
        colorMode="current"
        className="text-muted-foreground/40"
        ariaLabel={t("logoAlt")}
      />
      <p
        aria-hidden
        className="font-heading text-7xl leading-none text-foreground/30 sm:text-8xl lg:text-9xl"
      >
        <span className="font-mono tabular-nums">404</span>
      </p>
      <div className="flex flex-col gap-3 sm:gap-4">
        <h1
          id="not-found-title"
          className="font-heading text-3xl leading-tight text-balance text-foreground sm:text-4xl"
        >
          {t("title")}
        </h1>
        <p className="max-w-prose text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
      </div>
      <div className="mt-2 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
        <Button asChild size="lg" className="min-h-11">
          <Link href={ROUTE_PATHS[PAGE_NAMES.HOME].path}>
            {t("ctaPrimary")}
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="min-h-11">
          <Link href="/contact">{t("ctaSecondary")}</Link>
        </Button>
      </div>
    </section>
  );
}
