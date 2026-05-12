const FRONTEND_SKILLS = [
  "React",
  "Vue.js",
  "Next.js",
  "Nuxt.js",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "CSS / Framer",
  "Ant Design",
  "shadcn/ui",
  "Material UI",
  "i18Next",
  "Redux / Redux Toolkit",
  "Zustand",
  "React Query",
  "Postman / Swagger",
  "React Hook Form",
] as const;

const BACKEND_SKILLS = [
  "Node.js",
  "ExpressJS",
  "MongoDB",
  "Linux Ubuntu",
  "Git",
  "GitHub / GitLab",
] as const;

const SOFT_SKILLS = [
  "Problem Solving",
  "Creative Thinking",
  "Adaptability to Change",
  "Team Collaboration",
  "Time Management",
  "Attention to Detail",
  "Continuous Learning",
] as const;

const LANGUAGES = [
  { name: "Uzbek", level: "Native" },
  { name: "English", level: "Fluent" },
] as const;

export default function DeveloperSkills() {
  return (
    <section
      aria-labelledby="developer-skills-title"
      className="border-b border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <div className="mb-14 flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Skills &amp; tools
          </p>
          <h2
            id="developer-skills-title"
            className="font-heading text-3xl leading-tight text-balance text-foreground sm:text-4xl"
          >
            What I work with.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* Left — tech skills */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {FRONTEND_SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/8"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Additional — Backend &amp; DevOps
              </h3>
              <div className="flex flex-wrap gap-2">
                {BACKEND_SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — soft skills + languages */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Soft skills
              </h3>
              <ul className="flex flex-col gap-3">
                {SOFT_SKILLS.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Languages
              </h3>
              <dl className="flex flex-col gap-3">
                {LANGUAGES.map(({ name, level }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm font-medium text-foreground">
                      {name}
                    </dt>
                    <dd className="rounded-full border border-border bg-background px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                      {level}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
