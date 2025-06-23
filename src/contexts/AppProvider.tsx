"use client";

import React, { ReactNode } from "react";
import ToastProvider from "@/components/providers/ToastProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SessionProvider from "@/components/providers/SessionProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <ToastProvider />
      </ThemeProvider>
    </SessionProvider>
  );
};
