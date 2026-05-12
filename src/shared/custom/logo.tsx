import { cn } from "@/shared/lib/utils";

type LogoVariant = "single" | "withText";
type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";
type LogoColorMode = "brand" | "foreground" | "primary" | "current";

type LogoProps = {
  variant?: LogoVariant;
  size?: LogoSize;
  colorMode?: LogoColorMode;
  className?: string;
  ariaLabel?: string;
};

const SIZE_MAP: Record<LogoVariant, Record<LogoSize, string>> = {
  single: {
    xs: "h-6",
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-16",
  },
  withText: {
    xs: "h-4",
    sm: "h-5",
    md: "h-7",
    lg: "h-9",
    xl: "h-12",
  },
};

const COLOR_CLASS: Record<LogoColorMode, string> = {
  brand: "text-brand",
  foreground: "text-foreground",
  primary: "text-primary",
  current: "text-current",
};

function MarkPaths() {
  return (
    <>
      <path
        transform="translate(20)"
        fill="currentColor"
        d="m0 0h31l27 16 22 14 39 20 19 12 35 21 24 14 26 14 21 13 20 12 18 10 24 14 18 10 21 13 24 15 19 11 26 14 15 9 28 17 19 12 22 12 16 8 22 13 28 17 22 13 23 12 21 12 22 14 17 11 16 8 21 11 18 11 33 21 12 9 11 8 5 3 16-2 8-4 19-14 13-8 15-9 19-12 28-15 22-12 20-13 25-15 25-14 28-16 22-13 18-12 23-12 17-8 17-12 20-12 23-14 24-14 19-10 23-15 27-16 25-15 19-10 36-21 21-14 17-10 24-12 22-14 26-15 17-11 19-10 16-8 18-11 13-9 17-11 1-1h30l3 2-1 3-1 1v29l1 10v95l1 57v653l-1 235v94h1v28l-1 14v52l1 4v6l-2 1 2 1v11l-1 1 1 6-4 3-17-8-22-12-20-13-19-11-17-9-16-8-14-8-16-10-24-14-14-9-40-20-19-12-15-9-25-14-16-9-25-13-23-14-15-10-26-14-27-15-22-12-27-16-21-13-21-11-16-8-18-10-16-10-23-13-16-10-14-7-21-10-18-11-17-10-23-13-21-12-21-11-26-16-32-19-15-9-23-12-22-12-18-10-23-14-21-12-23-12-24-14-29-17-14-9-22-11-21-10-24-15-19-12-26-14-30-16-20-12-19-12-15-9-19-9-9-4-1 24-1 58-2 58-1 45v64l-3 5-20 11-22 13-14 8-16 7-21 9-23 14-17 11-6 1-1-6-1-24-2-111-1-42-2-145-1-151-1-71v-30l3-1 21 12 40 20 24 14 21 13 20 12 23 12 27 15 23 12 17 11 15 9 14 8 16 8 35 21 16 9 14 9 14 8 16 7 22 12 15 10 14 8 19 11 26 14 22 12 25 15 10 7 14 8 24 13 19 9 19 10 38 24 13 8 18 10 27 14 48 28 8 5 16 8 24 13 17 11 20 12 15 8 14 8 16 8 17 9 17 10 19 12 21 12 23 13 22 12 18 10 39 24 27 14 25 13 43 25 15 10 38 19 24 15 22 12 14 7 1-57v-720l-1-48-10 3-16 8-24 14-23 12-20 12-33 22-27 14-21 12-22 13-26 16-17 10-28 15-18 12-20 13-21 13-23 13-19 10-15 9-15 11-11 6-46 25-13 8-22 13-25 15-12 8-14 6-20 12-15 10-22 14-18 11-19 11-9 4h-13l-14-4-13-7-12-10-11-6-22-11-10-8-3-3-11-6-27-14-14-9-19-12-28-17-23-13-22-13-23-15-17-11-16-9-20-11-19-12-15-9-12-8-19-12-16-10-29-15-18-12-21-13-26-15-27-16-23-14-18-12-14-9-24-12-14-8-18-12-15-9-21-10-2 18-1 40v711l1 47 1 16 12-4 21-11 19-12 16-9 23-11 11-7 13-9 14-8 26-15 16-9 24-13 15-9 18-11 11-8 26-14 20-11 16-10 24-14 15-10 16-10 17-9 14-7 15-9 19-11 13-8 9-5 5 1 11 9 16 10 15 11 17 10 21 14 25 15 14 10 3 3-2 4-8 5-25 12-18 11-15 10-35 21-21 12-31 16-11 7-17 12-23 13-21 11-24 15-14 8-16 10-14 9-35 18-11 8-16 10-13 8-24 14-17 11-16 8-18 10-24 15-11 7-43 24-21 13-15 9-23 14-17 10-27 14-21 14-21 13-15 9-16 8-4 1-1-3-1-16-1-94-1-202v-569l1-418z"
      />
      <path
        transform="translate(1403,362)"
        fill="currentColor"
        d="m0 0h2l-1 151-1 197-3 236-1 15-2 1-11-6-13-10-18-14-30-20-17-10-24-16-17-12-5-5 2-10 1-66 2-78 1-62 1-34v-31l-15 5-11 6-11 7-23 12-11 6-18 12-20 13-18 11-17 11-16 8-19 10-19 14-17 10-10 6-14 8-9 3-10-4-19-12-13-8-21-14-17-11-19-14-14-10 5-4 16-9 34-22 24-13 17-10 22-14 15-9 18-10 20-11 19-12 17-10 11-7 10-7 18-10 24-12 15-10 19-11 22-13 26-16 16-8 18-10 22-15 16-10 18-10 8-5 25-13 12-8z"
      />
    </>
  );
}

export function Logo({
  variant = "single",
  size = "md",
  colorMode = "brand",
  className,
  ariaLabel = "Dastyorcha",
}: LogoProps) {
  const heightClass = SIZE_MAP[variant][size];
  const wordmarkColor =
    colorMode === "brand" ? "text-foreground" : COLOR_CLASS[colorMode];

  if (variant === "single") {
    return (
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox="0 0 1600 1313"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "w-auto shrink-0",
          heightClass,
          COLOR_CLASS[colorMode],
          className,
        )}
      >
        <MarkPaths />
      </svg>
    );
  }

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-2 leading-none",
        heightClass,
        wordmarkColor,
        className,
      )}
    >
      <svg
        viewBox="0 0 1600 1313"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={cn("h-full w-auto shrink-0", COLOR_CLASS[colorMode])}
      >
        <MarkPaths />
      </svg>
      <span className="font-heading text-[1.1em] font-semibold tracking-tight">
        Dastyorcha
      </span>
    </span>
  );
}
