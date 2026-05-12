import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { Spinner } from "@/shared/components/ui/spinner";

import { PlaygroundSection } from "./section";

export function ButtonsSection() {
  return (
    <PlaygroundSection
      id="buttons"
      title="Buttons"
      description="Variants × sizes from button.tsx."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">xs</Button>
          <Button size="sm">sm</Button>
          <Button size="default">default</Button>
          <Button size="lg">lg</Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled</Button>
          <Button>
            <Spinner /> Loading
          </Button>
        </div>
      </div>
    </PlaygroundSection>
  );
}
