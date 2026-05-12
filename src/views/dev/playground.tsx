import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { Toaster } from "@/shared/components/ui/sonner";

import { ButtonsSection } from "@/widgets/dev/playground/buttons";
import { CalendarSection } from "@/widgets/dev/playground/calendar";
import { ColorsSection } from "@/widgets/dev/playground/colors";
import { DataSection } from "@/widgets/dev/playground/data";
import { FeedbackSection } from "@/widgets/dev/playground/feedback";
import { FormsSection } from "@/widgets/dev/playground/forms";
import { PlaygroundHeader } from "@/widgets/dev/playground/header";
import { LayoutSection } from "@/widgets/dev/playground/layout";
import { LogoSection } from "@/widgets/dev/playground/logo";
import { NavigationSection } from "@/widgets/dev/playground/navigation";
import { OverlaysSection } from "@/widgets/dev/playground/overlays";
import { RadiusSection } from "@/widgets/dev/playground/radius";
import { SiteChromeSection } from "@/widgets/dev/playground/site-chrome";
import { TypographySection } from "@/widgets/dev/playground/typography";

export default function DevPlaygroundView() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <PlaygroundHeader />

        <main className="mx-auto max-w-6xl space-y-12 px-6 py-10">
          <ColorsSection />
          <TypographySection />
          <RadiusSection />
          <LogoSection />
          <SiteChromeSection />
          <ButtonsSection />
          <FormsSection />
          <FeedbackSection />
          <OverlaysSection />
          <NavigationSection />
          <DataSection />
          <LayoutSection />
          <CalendarSection />
        </main>

        <Toaster />
      </div>
    </TooltipProvider>
  );
}
