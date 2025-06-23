"use client";

import { Link } from "@/i18n/navigation";
import { Typography } from "@/components/ui";
import LanguageSelector from "@/components/layout/LanguageSelector";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("navigation");

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Typography
              variant="h4"
              className="text-blue-600 dark:text-blue-400"
            >
              🚀 DevShop
            </Typography>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              href="/demo"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              {t("demo")}
            </Link>
            <Link
              href="/templates"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              {t("templates")}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
