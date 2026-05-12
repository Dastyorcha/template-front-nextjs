import { BookOpen, Mail, MapPin, Phone } from "lucide-react";

import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from "@/shared/custom/social-icons";
import { getTranslations } from "next-intl/server";

import { Separator } from "@/shared/components/ui/separator";
import {
  CONTACT_INFOS,
  DEVELOPER_CONTACT_INFOS,
} from "@/shared/constants/contact-infos";
import { NAV_ITEMS } from "@/shared/constants/nav-items";
import { Logo } from "@/shared/custom/logo";
import { Link } from "@/shared/lib/i18n/navigation";

const SOCIAL_LINKS = [
  { key: "telegram", href: CONTACT_INFOS.telegram.href, Icon: TelegramIcon },
  { key: "github", href: CONTACT_INFOS.github.href, Icon: GithubIcon },
  { key: "linkedin", href: CONTACT_INFOS.linkedin.href, Icon: LinkedinIcon },
  { key: "twitter", href: CONTACT_INFOS.twitter.href, Icon: TwitterIcon },
  { key: "facebook", href: CONTACT_INFOS.facebook.href, Icon: FacebookIcon },
  { key: "substack", href: CONTACT_INFOS.substack.href, Icon: BookOpen },
] as const;

export async function SiteFooter() {
  const tFooter = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link href="/" aria-label={tFooter("home")} className="shrink-0">
              <Logo variant="withText" size="lg" colorMode="brand" />
            </Link>
            <p className="max-w-prose text-sm text-muted-foreground">
              {tFooter("description")}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ key, href, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tFooter(`social.${key}`)}
                    className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground">
              {tFooter("navHeading")}
            </h2>
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tNav(`${item.key}.label`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground">
              {tFooter("contactHeading")}
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={CONTACT_INFOS.phone.href}
                  className="inline-flex items-start gap-2 transition-colors hover:text-foreground"
                >
                  <Phone className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>{CONTACT_INFOS.phone.label}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFOS.email.href}
                  className="inline-flex items-start gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>{CONTACT_INFOS.email.label}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFOS.address.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 transition-colors hover:text-foreground"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>{CONTACT_INFOS.address.label}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>{tFooter("copyright", { year })}</p>
          <p className="inline-flex items-center gap-1">
            <span>{tFooter("developer")}:</span>
            <a
              href={DEVELOPER_CONTACT_INFOS.website.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              {DEVELOPER_CONTACT_INFOS.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
