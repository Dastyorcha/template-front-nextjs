import { RADIUS_TOKENS } from "../../../shared/constants/playground-constants";
import { PlaygroundSection } from "./section";

export function RadiusSection() {
  return (
    <PlaygroundSection
      id="radius"
      title="Border radius"
      description="Radius tokens derived from --radius."
    >
      <div className="flex flex-wrap gap-4">
        {RADIUS_TOKENS.map((r) => (
          <div key={r} className="flex flex-col items-center gap-2">
            <div
              className="size-16 border border-border bg-secondary"
              style={{ borderRadius: `var(--radius-${r})` }}
            />
            <span className="font-mono text-xs text-muted-foreground">
              --radius-{r}
            </span>
          </div>
        ))}
      </div>
    </PlaygroundSection>
  );
}
