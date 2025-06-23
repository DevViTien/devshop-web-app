"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import {  GlobeAltIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/navigation";

const languages = [
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    direction: "ltr",
    color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
  },
  {
    code: "en",
    name: "English", 
    nativeName: "English",
    flag: "🇺🇸",
    direction: "ltr",
    color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳", 
    direction: "ltr",
    color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    direction: "ltr", 
    color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
  },
];

export default function LanguageSelector() {
  const t = useTranslations("language");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const currentLanguage =
    languages.find((lang) => lang.code === locale) ||
    languages.find((lang) => lang.code === "vi") ||
    languages[0];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        aria-label={t("selectLanguage")}
        title={t("selectLanguage")}
        className={`group relative flex items-center justify-center w-9 h-9 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600 ${
          isPending ? "opacity-60 cursor-wait" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="language-menu"
        disabled={isPending}
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200" aria-hidden="true">
          {currentLanguage.flag}
        </span>
      </button>

      {isOpen && (
        <div
          id="language-menu"
          className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1 z-50 ring-1 ring-gray-200 dark:ring-gray-700 border border-gray-100 dark:border-gray-600 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <GlobeAltIcon className="w-3 h-3 mr-1.5" />
            {t("selectLanguage")}
          </div>
          <div className="py-1">
            {languages.map((language) => (
              <Link
                key={language.code}
                href="/"
                locale={language.code}
                className={`group flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                  locale === language.code
                    ? `${language.color} font-medium`
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => {
                  startTransition(() => {
                    setIsOpen(false);
                  });
                }}
                role="menuitem"
              >
                <div className="flex items-center">
                  <span className="mr-3 text-base transition-transform duration-200 group-hover:scale-110">
                    {language.flag}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium">{language.nativeName}</span>
                    <span className="text-xs opacity-60">{language.name}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {locale === language.code && (
                    <span className="mr-2 text-xs opacity-60">✓</span>
                  )}
                  <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    locale === language.code 
                      ? "bg-current opacity-100" 
                      : "bg-gray-300 dark:bg-gray-600 opacity-50 group-hover:opacity-75"
                  }`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
