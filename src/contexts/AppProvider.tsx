"use client";

import React, { ReactNode } from "react";
import ToastProvider from "@/components/providers/ToastProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
      <ToastProvider />
    </ThemeProvider>
  );
};
