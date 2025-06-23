"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    //prefers-color-scheme
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemeProvider>
  );
}

export default ThemeProvider;
