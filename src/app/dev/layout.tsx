import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { DEFAULT_LOCALE } from "@/shared/lib/i18n/routing";

export default async function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setRequestLocale(DEFAULT_LOCALE);
  const messages = await getMessages({ locale: DEFAULT_LOCALE });

  return (
    <NextIntlClientProvider locale={DEFAULT_LOCALE} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
