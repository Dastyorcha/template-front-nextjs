import Image from "next/image";

import { DEVELOPER_CONTACT_INFOS } from "@/shared/constants/contact-infos";

export default function DeveloperHero() {
  return (
    <section
      aria-labelledby="developer-hero-title"
      className="relative isolate overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-16 lg:py-32">
        <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-3xl bg-muted shadow-xl ring-1 ring-border sm:w-72 lg:w-full lg:max-w-sm">
          <Image
            src="/developer/portrait.jpg"
            alt={`${DEVELOPER_CONTACT_INFOS.name} — portrait`}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 18rem, 14rem"
            className="object-cover"
            priority
            fetchPriority="high"
          />
        </div>

        <div className="flex flex-col items-start gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary sm:text-sm">
            Independent software engineer
          </p>
          <h1
            id="developer-hero-title"
            className="font-heading text-4xl leading-[1.05] text-balance text-foreground sm:text-5xl lg:text-6xl"
          >
            {DEVELOPER_CONTACT_INFOS.name}
          </h1>
          <p className="max-w-prose text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {DEVELOPER_CONTACT_INFOS.role} from Tashkent. I design and build
            production-grade web products — fast pages, careful typography, real
            accessibility, multilingual by default. This site is one of them.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={DEVELOPER_CONTACT_INFOS.website.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Visit {DEVELOPER_CONTACT_INFOS.website.label}
            </a>
            <a
              href={`mailto:${DEVELOPER_CONTACT_INFOS.email.value}`}
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Email: {DEVELOPER_CONTACT_INFOS.email.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
