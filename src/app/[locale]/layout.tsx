import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { AppProvider } from "@/contexts/AppProvider";
import { Header } from "@/components/layout/Header";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Open_Sans({
  subsets: ["latin", "vietnamese", "latin-ext"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "DevShop",
  description: "",
  icons: [
    { rel: "icon", type: "image/x-icon", url: "/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/android-chrome-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      url: "/android-chrome-512x512.png",
    },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
  ],
  manifest: "/site.webmanifest",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <NextIntlClientProvider>
          <AppProvider>
            <Header />
            <div className="flex flex-1 relative">
              <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">{children}</div>
              </main>
            </div>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
