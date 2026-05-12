import { SiteFooter } from "@/widgets/layout/footer/site-footer";
import { SiteHeader } from "@/widgets/layout/header/site-header";

import { PlaygroundSection } from "./section";

export function SiteChromeSection() {
  return (
    <PlaygroundSection
      id="site-chrome"
      title="Header & footer"
      description="Page-level chrome shared across all locale routes. Header: sticky, Logo + nav (with optional children → NavigationMenu), language switcher, contact CTA; mobile shows logo + hamburger that opens a left-side Sheet. Footer: logo + description, nav links, contact info from CONTACT_INFOS, social row, bottom row with copyright and developer credit linking to DEVELOPER_CONTACT_INFOS.website (muxsinjon.uz)."
    >
      <div className="space-y-8">
        <div>
          <div className="mb-2 text-xs text-muted-foreground">
            widgets/layout/header/site-header
          </div>
          <div className="overflow-hidden rounded-md border border-border bg-background">
            <SiteHeader />
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs text-muted-foreground">
            widgets/layout/footer/site-footer
          </div>
          <div className="overflow-hidden rounded-md border border-border bg-background">
            <SiteFooter />
          </div>
        </div>
      </div>
    </PlaygroundSection>
  );
}
