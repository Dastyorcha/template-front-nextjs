"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { Separator } from "@/shared/components/ui/separator";
import { Spinner } from "@/shared/components/ui/spinner";

import { PlaygroundSection } from "./section";

export function FeedbackSection() {
  const [progress, setProgress] = useState(35);

  return (
    <PlaygroundSection
      id="feedback"
      title="Feedback"
      description="Progress, spinner, chart palette, toast (sonner)."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setProgress((p) => Math.max(0, p - 10))}
            >
              -10
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setProgress((p) => Math.min(100, p + 10))}
            >
              +10
            </Button>
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-3 text-foreground">
          <Spinner />
          <Spinner className="size-6" />
          <Spinner className="size-8 text-primary" />
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Chart palette</div>
          <div className="flex h-10 overflow-hidden rounded-md border border-border">
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <div
                key={n}
                className="flex-1"
                style={{ backgroundColor: `var(--chart-${n})` }}
                title={`--chart-${n}`}
              />
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => toast("Plain toast")}>Toast</Button>
          <Button
            variant="secondary"
            onClick={() => toast.success("Saved successfully")}
          >
            Success
          </Button>
          <Button variant="outline" onClick={() => toast.info("Heads up")}>
            Info
          </Button>
          <Button
            variant="destructive"
            onClick={() => toast.error("Something broke")}
          >
            Error
          </Button>
        </div>
      </div>
    </PlaygroundSection>
  );
}
