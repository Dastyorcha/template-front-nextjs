"use client";

import { ChevronDownIcon, MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { cn } from "@/shared/lib/utils";
import { CONTACT_INFOS } from "@/shared/constants/contact-infos";
import { NAV_ITEMS } from "@/shared/constants/nav-items";
import { LangSwitcher } from "@/shared/custom/lang-switcher";
import { Logo } from "@/shared/custom/logo";
import { Link, usePathname } from "@/shared/lib/i18n/navigation";

export function MobileNav() {
  const t = useTranslations("nav");
  const tHeader = useTranslations("header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (key: string) =>
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={tHeader("openMenu")}
          className="md:hidden"
        >
          <MenuIcon className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[88vw] max-w-sm flex-col gap-0 p-0"
      >
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle asChild>
            <Link href="/" onClick={closeSheet} aria-label={tHeader("home")}>
              <Logo variant="withText" size="md" colorMode="brand" />
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">
            {tHeader("menuDescription")}
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname === item.path ||
                  pathname.startsWith(`${item.path}/`);

            if (item.children?.length) {
              const isOpen = openGroups[item.key] ?? false;
              return (
                <div key={item.key} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.key)}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
                      isActive && "bg-muted/60",
                    )}
                    aria-expanded={isOpen}
                  >
                    <span>{t(`${item.key}.label`)}</span>
                    <ChevronDownIcon
                      className={cn(
                        "size-4 transition-transform",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  {isOpen ? (
                    <ul className="mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <Link
                            href={child.path}
                            onClick={closeSheet}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            {t(`${item.key}.children.${child.key}`)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.path}
                onClick={closeSheet}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted",
                  isActive && "bg-muted/60",
                )}
              >
                {t(`${item.key}.label`)}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-3 border-t border-border p-4">
          <LangSwitcher className="w-full justify-start" align="start" />
          <Button asChild className="w-full" onClick={closeSheet}>
            <a
              href={CONTACT_INFOS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tHeader("contactCta")}
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
