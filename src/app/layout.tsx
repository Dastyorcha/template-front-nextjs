import type { Viewport } from "next";
import { Archivo, Archivo_Black, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";

import { LAYOUT_METADATA } from "@/shared/constants/seo/page-seo";
import { getOrganizationSchema } from "@/shared/lib/seo/get-organization-schema";
import { JsonLd } from "@/shared/lib/seo/json-ld";

import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = LAYOUT_METADATA;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1611" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${archivoBlack.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd id="organization-schema" schema={getOrganizationSchema()} />
        {children}
      </body>
    </html>
  );
}
