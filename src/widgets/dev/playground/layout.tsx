import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

import { PlaygroundSection } from "./section";

export function LayoutSection() {
  return (
    <PlaygroundSection
      id="layout"
      title="Layout"
      description="Scroll area, resizable, carousel."
    >
      <div className="space-y-6">
        <ScrollArea className="h-40 rounded-md border border-border bg-background p-4">
          <div className="space-y-2 text-sm text-foreground">
            {Array.from({ length: 30 }).map((_, i) => (
              <p key={i}>Scrollable line {i + 1}</p>
            ))}
          </div>
        </ScrollArea>

        <ResizablePanelGroup className="h-40 rounded-md border border-border">
          <ResizablePanel defaultSize={50} className="p-3 text-sm text-foreground">
            Left
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} className="p-3 text-sm text-foreground">
            Right
          </ResizablePanel>
        </ResizablePanelGroup>

        <Carousel className="mx-12">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <Card>
                  <CardContent className="flex h-32 items-center justify-center text-2xl font-semibold text-foreground">
                    {i + 1}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </PlaygroundSection>
  );
}
