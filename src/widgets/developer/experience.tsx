"use client";

import { useEffect, useState } from "react";

type Experience = {
  company: string;
  role: string;
  period: string;
  dynamicFrom?: { year: number; month: number };
  isCurrent?: boolean;
  description: string;
};

const EXPERIENCES: Experience[] = [
  {
    company: "Marjon marketing agency",
    role: "Front-end engineer — Vue.js / React.js",
    period: "Oct 2025 — Present",
    dynamicFrom: { year: 2025, month: 10 },
    isCurrent: true,
    description:
      "Developing CRM and ERP systems with automated contract workflows, real-time vehicle tracking, and data-driven marketing dashboards for employees and customers.",
  },
  {
    company: "Iftixor private school",
    role: "Front-end engineer — React.js",
    period: "Mar 2025 — Oct 2025",
    description:
      "Developed and maintained CRM and ERP systems to streamline financial operations and academic processes. Covered employee payroll, student fee collection, contract tracking, and automated SMS alerts.",
  },
  {
    company: "Tenzorsoft",
    role: "Intern front-end developer — React.js / Next.js",
    period: "2024 — Mar 2025",
    description:
      "Worked as a frontend intern contributing to CRM system development, including UI implementation and core frontend logic.",
  },
] as const;

function calcDuration(from: { year: number; month: number }): string {
  const now = new Date();
  const total =
    (now.getFullYear() - from.year) * 12 + (now.getMonth() + 1 - from.month);
  if (total < 1) return "< 1 mo";
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const parts: string[] = [];
  if (yrs > 0) parts.push(`${yrs} yr${yrs > 1 ? "s" : ""}`);
  if (mos > 0) parts.push(`${mos} mo`);
  return parts.join(" ");
}

function DurationBadge({ from }: { from: { year: number; month: number } }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(calcDuration(from));
  }, [from.year, from.month]);

  if (!label) return null;
  return (
    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary">
      {label}
    </span>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <div className="group relative pl-7">
      {/* timeline track */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-px bg-border group-last:hidden"
      />
      {/* dot */}
      <span
        aria-hidden
        className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 bg-background ${
          item.isCurrent ? "border-primary" : "border-muted-foreground/40"
        }`}
      />

      <div className="flex flex-col gap-1.5 pb-10 group-last:pb-0">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <div>
            <p className="font-semibold text-foreground">{item.company}</p>
            <p className="text-sm text-muted-foreground">{item.role}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-xs text-muted-foreground">
              {item.period}
            </span>
            {item.dynamicFrom && <DurationBadge from={item.dynamicFrom} />}
            {item.isCurrent && !item.dynamicFrom && (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Current
              </span>
            )}
          </div>
        </div>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function DeveloperExperience() {
  return (
    <section
      aria-labelledby="developer-experience-title"
      className="border-b border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <div className="mb-14 flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Work experience
          </p>
          <h2
            id="developer-experience-title"
            className="font-heading text-3xl leading-tight text-balance text-foreground sm:text-4xl"
          >
            Where I&apos;ve worked.
          </h2>
        </div>

        <div className="max-w-2xl">
          {EXPERIENCES.map((item) => (
            <ExperienceCard key={item.company} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
