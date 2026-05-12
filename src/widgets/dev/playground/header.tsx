"use client";

import { useEffect, useState } from "react";

import { Button } from "@/shared/components/ui/button";

import { PLAYGROUND_SECTIONS } from "../../../shared/constants/playground-constants";

export function PlaygroundHeader() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="font-heading text-xl font-semibold text-foreground">
            Dev Playground
          </h1>
          <p className="text-xs text-muted-foreground">
            All components, colors, and tokens. Read-only showcase for design
            QA.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={toggleTheme}>
          {isDark ? "Light" : "Dark"} mode
        </Button>
      </div>
      <nav className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 pb-3 text-xs text-muted-foreground">
        {PLAYGROUND_SECTIONS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="whitespace-nowrap hover:text-foreground"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
