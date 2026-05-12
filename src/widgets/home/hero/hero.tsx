import { ArrowRight, Mail, Phone } from "lucide-react";
import NextLink from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/shared/components/ui/button";
import { CONTACT_INFOS } from "@/shared/constants/contact-infos";
import { Logo } from "@/shared/custom/logo";
import {
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
} from "@/shared/custom/social-icons";

type ContactLink = {
  key: string;
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const CONTACT_LINKS: ContactLink[] = [
  {
    key: "telegram",
    href: CONTACT_INFOS.telegram.href,
    label: CONTACT_INFOS.telegram.label,
    Icon: TelegramIcon,
  },
  {
    key: "email",
    href: CONTACT_INFOS.email.href,
    label: CONTACT_INFOS.email.label,
    Icon: Mail,
  },
  {
    key: "phone",
    href: CONTACT_INFOS.phone.href,
    label: CONTACT_INFOS.phone.label,
    Icon: Phone,
  },
  {
    key: "github",
    href: CONTACT_INFOS.github.href,
    label: CONTACT_INFOS.github.label,
    Icon: GithubIcon,
  },
  {
    key: "linkedin",
    href: CONTACT_INFOS.linkedin.href,
    label: CONTACT_INFOS.linkedin.label,
    Icon: LinkedinIcon,
  },
];

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28">
        <Logo
          variant="single"
          size="xl"
          colorMode="brand"
          className="h-20 sm:h-24"
        />

        <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {t("eyebrow")}
        </span>

        <h1 className="font-heading text-5xl tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>

        <p className="max-w-prose text-base text-muted-foreground sm:text-lg">
          {t("tagline")}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <NextLink href="/developer">
              {t("ctaDeveloper")}
              <ArrowRight className="size-4" aria-hidden />
            </NextLink>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href={CONTACT_INFOS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("ctaContact")}
            </a>
          </Button>
        </div>

        <ul
          aria-label={t("contactsLabel")}
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
        >
          {CONTACT_LINKS.map(({ key, href, label, Icon }) => (
            <li key={key}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
