"use client";

import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/shared/lib/i18n/navigation";
import { LOCALES, type Locale } from "@/shared/lib/i18n/routing";

type LangSwitcherProps = {
  align?: "start" | "center" | "end";
  variant?: "outline" | "ghost" | "secondary";
  size?: "xs" | "sm" | "default" | "lg";
  className?: string;
};

export function LangSwitcher({
  align = "end",
  variant = "outline",
  size = "sm",
  className,
}: LangSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const t = useTranslations("langSwitcher");
  const [isPending, startTransition] = useTransition();

  const handleSelect = (next: Locale) => {
    if (next === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          aria-label={t("ariaLabel")}
          disabled={isPending}
          className={className}
        >
          <Globe className="size-4" />
          <span className="ml-2 uppercase">{currentLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {LOCALES.map((locale) => {
          const isActive = locale === currentLocale;
          return (
            <DropdownMenuItem
              key={locale}
              onSelect={() => handleSelect(locale)}
              className="flex items-center justify-between gap-3"
            >
              <span>{t(`languages.${locale}`)}</span>
              {isActive ? <Check className="size-4 text-primary" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
