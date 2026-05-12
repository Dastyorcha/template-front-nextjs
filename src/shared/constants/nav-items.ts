import { PAGE_NAMES } from "./page-names";
import { ROUTE_PATHS } from "./route-paths";

export type NavItem = {
  key: string;
  path: string;
  description?: string;
  children?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    key: PAGE_NAMES.HOME,
    path: ROUTE_PATHS[PAGE_NAMES.HOME].path,
  },
];
