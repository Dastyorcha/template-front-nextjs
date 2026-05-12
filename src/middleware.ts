import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/shared/lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const LOCALES = ["uz", "en", "ru"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /dev and /dev/* (except /dev/playground) → /developer
  const isDevRoot = pathname === "/dev";
  const isDevSub =
    pathname.startsWith("/dev/") && !pathname.startsWith("/dev/playground");
  if (isDevRoot || isDevSub) {
    return NextResponse.redirect(new URL("/developer", request.url));
  }

  // /{locale}/dev and /{locale}/dev/* → /developer
  const localeDevMatch = LOCALES.some(
    (locale) =>
      pathname === `/${locale}/dev` ||
      (pathname.startsWith(`/${locale}/dev/`) &&
        !pathname.startsWith(`/${locale}/dev/playground`)),
  );
  if (localeDevMatch) {
    return NextResponse.redirect(new URL("/developer", request.url));
  }

  // Standalone non-locale routes bypass intl middleware
  if (pathname.startsWith("/dev/") || pathname.startsWith("/developer")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
