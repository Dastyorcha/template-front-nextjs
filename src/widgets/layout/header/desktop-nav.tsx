"use client";

import { useTranslations } from "next-intl";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu";
import { cn } from "@/shared/lib/utils";
import { NAV_ITEMS, type NavItem } from "@/shared/constants/nav-items";
import { Link, usePathname } from "@/shared/lib/i18n/navigation";

function isItemActive(pathname: string, item: NavItem): boolean {
  if (item.path === "/") return pathname === "/";
  return pathname === item.path || pathname.startsWith(`${item.path}/`);
}

export function DesktopNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="gap-1">
        {NAV_ITEMS.map((item) => {
          const active = isItemActive(pathname, item);

          if (item.children?.length) {
            return (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuTrigger className={cn(active && "bg-muted/60")}>
                  {t(`${item.key}.label`)}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 p-2">
                    {item.children.map((child) => (
                      <li key={child.key}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={child.path}
                            className="flex flex-col gap-1 rounded-md p-2 hover:bg-muted focus-visible:bg-muted"
                          >
                            <span className="text-sm font-medium text-foreground">
                              {t(`${item.key}.children.${child.key}`)}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={item.key}>
              <NavigationMenuLink asChild active={active}>
                <Link
                  href={item.path}
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                >
                  {t(`${item.key}.label`)}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
