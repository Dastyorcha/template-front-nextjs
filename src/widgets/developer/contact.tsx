import { AtSign, Globe, Mail, Newspaper, Phone } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from "@/shared/custom/social-icons";
import { DEVELOPER_CONTACT_INFOS } from "@/shared/constants/contact-infos";

type ContactLink = {
  key: string;
  label: string;
  value: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const LINKS: ContactLink[] = [
  {
    key: "email",
    label: "Email",
    value: DEVELOPER_CONTACT_INFOS.email.label,
    href: DEVELOPER_CONTACT_INFOS.email.href,
    Icon: Mail,
  },
  {
    key: "phone",
    label: "Phone",
    value: DEVELOPER_CONTACT_INFOS.phone.label,
    href: DEVELOPER_CONTACT_INFOS.phone.href,
    Icon: Phone,
  },
  {
    key: "website",
    label: "Personal site",
    value: DEVELOPER_CONTACT_INFOS.website.label,
    href: DEVELOPER_CONTACT_INFOS.website.href,
    Icon: Globe,
  },
  {
    key: "github",
    label: "GitHub",
    value: DEVELOPER_CONTACT_INFOS.github.label,
    href: DEVELOPER_CONTACT_INFOS.github.href,
    Icon: GithubIcon,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: DEVELOPER_CONTACT_INFOS.linkedin.label,
    href: DEVELOPER_CONTACT_INFOS.linkedin.href,
    Icon: LinkedinIcon,
  },
  {
    key: "telegram",
    label: "Telegram",
    value: DEVELOPER_CONTACT_INFOS.telegram.label,
    href: DEVELOPER_CONTACT_INFOS.telegram.href,
    Icon: TelegramIcon,
  },
  {
    key: "twitter",
    label: "X (Twitter)",
    value: DEVELOPER_CONTACT_INFOS.twitter.label,
    href: DEVELOPER_CONTACT_INFOS.twitter.href,
    Icon: TwitterIcon,
  },
  {
    key: "facebook",
    label: "Facebook",
    value: DEVELOPER_CONTACT_INFOS.facebook.label,
    href: DEVELOPER_CONTACT_INFOS.facebook.href,
    Icon: FacebookIcon,
  },
  {
    key: "substack",
    label: "Substack",
    value: DEVELOPER_CONTACT_INFOS.substack.label,
    href: DEVELOPER_CONTACT_INFOS.substack.href,
    Icon: Newspaper,
  },
];

function isExternal(href: string) {
  return href.startsWith("http");
}

export default function DeveloperContact() {
  return (
    <section
      aria-labelledby="developer-contact-title"
      className="border-b border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <div className="flex max-w-prose flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <AtSign className="mr-1 inline size-3.5" aria-hidden /> Get in touch
          </p>
          <h2
            id="developer-contact-title"
            className="font-heading text-3xl leading-tight text-balance text-foreground sm:text-4xl"
          >
            Anywhere I am online.
          </h2>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Email and Telegram are the fastest. For project work, please include
            a couple of sentences about what you’re trying to build.
          </p>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map(({ key, label, value, href, Icon }) => (
            <li key={key}>
              <a
                href={href}
                target={isExternal(href) ? "_blank" : undefined}
                rel={isExternal(href) ? "noopener noreferrer" : undefined}
                className="group flex h-full items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <Icon className="size-5" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {label}
                  </span>
                  <span className="truncate text-sm font-medium text-foreground sm:text-base">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
