import { PlaygroundSection } from "./section";

export function TypographySection() {
  return (
    <PlaygroundSection
      id="typography"
      title="Typography"
      description="Headings use font-heading (Archivo Black, heavy display); body uses font-sans (Archivo); code uses font-mono (Geist Mono)."
    >
      <div className="space-y-6 text-foreground">
        <div>
          <div className="text-xs text-muted-foreground">
            display / 6xl — font-heading (Archivo Black)
          </div>
          <p className="font-heading text-6xl tracking-tight uppercase text-balance">
            Dastyorcha
          </p>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">
            h1 / 4xl — font-heading
          </div>
          <p className="font-heading text-4xl tracking-tight">
            The quick brown fox
          </p>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">
            h2 / 2xl — font-heading
          </div>
          <p className="font-heading text-2xl tracking-tight">
            The quick brown fox
          </p>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">
            h3 / xl — font-heading
          </div>
          <p className="font-heading text-xl tracking-tight">
            The quick brown fox
          </p>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">
            body / base — font-sans 400 (Archivo Regular)
          </div>
          <p className="text-base font-normal">
            The quick brown fox jumps over the lazy dog. 0123456789.
          </p>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">
            body / base — font-sans 500 (Archivo Medium)
          </div>
          <p className="text-base font-medium">
            The quick brown fox jumps over the lazy dog. 0123456789.
          </p>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">
            body / sm — font-sans 600 (Archivo SemiBold)
          </div>
          <p className="text-sm font-semibold">
            The quick brown fox jumps over the lazy dog. 0123456789.
          </p>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">muted / xs</div>
          <p className="text-xs text-muted-foreground">
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">
            mono — font-mono (Geist Mono)
          </div>
          <p className="font-mono text-sm">
            const x = &quot;hello world&quot;;
          </p>
        </div>
      </div>
    </PlaygroundSection>
  );
}
