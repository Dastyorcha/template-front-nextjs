const HIGHLIGHTS = [
  {
    label: "Stack",
    value: "Next.js · React · TypeScript · Node · Tailwind v4",
  },
  {
    label: "Studio",
    value: "Founder of Dastyorcha — we ship websites for businesses",
  },
  {
    label: "Based in",
    value: "Tashkent, Uzbekistan — open to remote work worldwide",
  },
  {
    label: "Working languages",
    value: "O‘zbek · Русский · English",
  },
] as const;

export default function DeveloperBio() {
  return (
    <section
      aria-labelledby="developer-bio-title"
      className="border-b border-border"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            About
          </p>
          <h2
            id="developer-bio-title"
            className="font-heading text-3xl leading-tight text-balance text-foreground sm:text-4xl"
          >
            I build the kind of website you wish more businesses had.
          </h2>
          <div className="flex flex-col gap-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I started writing software because I wanted the things I used
              every day to feel a little less broken. That instinct still drives
              the work — I sweat the load times, the keyboard navigation, the
              way text wraps on a 320px screen. None of it is glamorous. All of
              it shows up in how a page feels.
            </p>
            <p>
              Through Dastyorcha, my studio, I work with founders, law firms,
              clinics, and small product teams across Central Asia. Most of what
              we ship is a marketing site, a booking flow, or an internal tool —
              built once, shipped fast, easy to hand back. This template is one
              of ours.
            </p>
            <p>
              If you have a project in mind, I prefer a short message describing
              the problem over a brief. Numbers and screenshots are welcome.
            </p>
          </div>
        </div>

        <dl className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-pretty text-base text-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
