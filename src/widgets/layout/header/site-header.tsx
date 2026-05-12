import { getTranslations } from "next-intl/server";

import { Button } from "@/shared/components/ui/button";
import { CONTACT_INFOS } from "@/shared/constants/contact-infos";
import { LangSwitcher } from "@/shared/custom/lang-switcher";
import { Logo } from "@/shared/custom/logo";
import { Link } from "@/shared/lib/i18n/navigation";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export async function SiteHeader() {
  const t = await getTranslations("header");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={t("home")} className="shrink-0">
          <Logo variant="withText" size="md" colorMode="brand" />
        </Link>

        <div className="hidden md:block">
          <DesktopNav />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LangSwitcher />
          <Button asChild size="sm">
            <a
              href={CONTACT_INFOS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contactCta")}
            </a>
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
