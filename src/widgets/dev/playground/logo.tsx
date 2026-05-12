import { Logo } from "@/shared/custom/logo";

import { PlaygroundSection } from "./section";

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
const COLOR_MODES = ["brand", "foreground", "primary", "current"] as const;

export function LogoSection() {
  return (
    <PlaygroundSection
      id="logo"
      title="Logo"
      description="Reusable Logo from /shared/custom/logo. Variants: single | withText. Sizes: xs–xl. Color modes: brand, foreground, primary, current."
    >
      <div className="space-y-8">
        <div>
          <div className="mb-3 text-xs text-muted-foreground">
            variant=single — sizes
          </div>
          <div className="flex flex-wrap items-end gap-6 rounded-md border border-border bg-background p-4">
            {SIZES.map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                <Logo variant="single" size={size} />
                <span className="text-xs text-muted-foreground">{size}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 text-xs text-muted-foreground">
            variant=withText — sizes
          </div>
          <div className="flex flex-wrap items-end gap-6 rounded-md border border-border bg-background p-4">
            {SIZES.map((size) => (
              <div key={size} className="flex flex-col items-start gap-1">
                <Logo variant="withText" size={size} />
                <span className="text-xs text-muted-foreground">{size}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 text-xs text-muted-foreground">
            color modes (variant=withText, size=md)
          </div>
          <div className="flex flex-wrap items-center gap-6 rounded-md border border-border bg-background p-4">
            {COLOR_MODES.map((mode) => (
              <div key={mode} className="flex flex-col items-start gap-1">
                <Logo variant="withText" size="md" colorMode={mode} />
                <span className="text-xs text-muted-foreground">{mode}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 text-xs text-muted-foreground">
            on dark surface
          </div>
          <div className="flex flex-wrap items-center gap-6 rounded-md border border-border bg-foreground p-4 text-background">
            <Logo variant="single" size="lg" colorMode="brand" />
            <Logo variant="withText" size="lg" colorMode="current" />
          </div>
        </div>
      </div>
    </PlaygroundSection>
  );
}
