import { DEVELOPER_CONTACT_INFOS } from "@/shared/constants/contact-infos";

export default function DeveloperFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 px-6 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-sm">
        <p>
          © {year} {DEVELOPER_CONTACT_INFOS.name}. All rights reserved.
        </p>
        <a
          href={DEVELOPER_CONTACT_INFOS.website.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground transition-colors hover:text-primary"
        >
          {DEVELOPER_CONTACT_INFOS.website.label}
        </a>
      </div>
    </footer>
  );
}
