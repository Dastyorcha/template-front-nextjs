"use client";

import { useEffect, useState } from "react";

export function ColorSwatch({ token }: { token: string }) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${token}`)
      .trim();
    setValue(v);
  }, [token]);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
      <div
        className="size-10 shrink-0 rounded-md border border-border"
        style={{ backgroundColor: `var(--${token})` }}
      />
      <div className="min-w-0 flex-1">
        <div className="truncate font-mono text-xs font-medium text-foreground">
          --{token}
        </div>
        <div className="truncate font-mono text-[10px] text-muted-foreground">
          {value || "—"}
        </div>
      </div>
    </div>
  );
}
