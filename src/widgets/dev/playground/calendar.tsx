"use client";

import { useState } from "react";

import { Calendar } from "@/shared/components/ui/calendar";

import { PlaygroundSection } from "./section";

export function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <PlaygroundSection
      id="calendar"
      title="Calendar"
      description="react-day-picker (shadcn)."
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border border-border bg-background"
      />
    </PlaygroundSection>
  );
}
