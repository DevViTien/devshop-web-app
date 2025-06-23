"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import {
  SunIcon as SunIconSolid,
  MoonIcon as MoonIconSolid,
} from "@heroicons/react/24/solid";

const themes = [
  {
    value: "light",
    key: "light",
    icon: SunIcon,
    activeIcon: SunIconSolid,
    emoji: "☀️",
  },
  {
    value: "dark",
    key: "dark",
    icon: MoonIcon,
    activeIcon: MoonIconSolid,
    emoji: "🌙",
  },
  {
    value: "system",
    key: "system",
    icon: ComputerDesktopIcon,
    activeIcon: ComputerDesktopIcon,
    emoji: "💻",
  },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("theme");

  // Tránh mismatch SSR/CSR
  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return (
      <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    );
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.activeIcon;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        aria-label={t("switchTheme")}
        title={t("switchTheme")}
        className="group relative flex items-center justify-center w-9 h-9 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="theme-menu"
      >
        <CurrentIcon className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200" />
      </button>

      {isOpen && (
        <div
          id="theme-menu"
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1 z-50 ring-1 ring-gray-200 dark:ring-gray-700 border border-gray-100 dark:border-gray-600 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            {t("selectTheme")}
          </div>
          <div className="py-1">
            {themes.map((themeOption) => {
              const Icon =
                theme === themeOption.value
                  ? themeOption.activeIcon
                  : themeOption.icon;
              const isActive = theme === themeOption.value;

              return (
                <button
                  key={themeOption.value}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-base" aria-hidden="true">
                      {themeOption.emoji}
                    </span>
                    <span>{t(themeOption.key)}</span>
                  </div>
                  <div className="flex items-center">
                    {isActive && (
                      <span className="mr-2 text-xs opacity-60">✓</span>
                    )}
                    <Icon className="w-4 h-4 opacity-60" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSwitcher;
