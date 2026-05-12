import { ColorSwatch } from "./color-swatch";
import { THEME_TOKENS } from "../../../shared/constants/playground-constants";
import { PlaygroundSection } from "./section";

export function ColorsSection() {
  return (
    <PlaygroundSection
      id="colors"
      title="Colors"
      description="Theme tokens read live from globals.css. Toggle dark mode in the header to see dark values."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {THEME_TOKENS.map((t) => (
          <ColorSwatch key={t} token={t} />
        ))}
      </div>
    </PlaygroundSection>
  );
}
