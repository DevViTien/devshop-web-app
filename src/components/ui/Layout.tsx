"use client";

import React from "react";
import { cn } from "@/utils/cn";

// Container component
interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, maxWidth = "xl", className }, ref) => {
    const maxWidths = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      full: "max-w-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          maxWidths[maxWidth],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

// Section component
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className, padding = "md" }, ref) => {
    const paddings = {
      none: "",
      sm: "py-8",
      md: "py-12",
      lg: "py-16",
    };

    return (
      <section ref={ref} className={cn(paddings[padding], className)}>
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

// Grid component
interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ children, cols = 1, gap = "md", className }, ref) => {
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-12",
    };

    const gaps = {
      none: "gap-0",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn("grid", gridCols[cols], gaps[gap], className)}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

// Flex component
interface FlexProps {
  children: React.ReactNode;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      children,
      direction = "row",
      align = "start",
      justify = "start",
      wrap = false,
      gap = "none",
      className,
    },
    ref
  ) => {
    const directions = {
      row: "flex-row",
      col: "flex-col",
    };

    const alignments = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };

    const justifications = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    const gaps = {
      none: "gap-0",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directions[direction],
          alignments[align],
          justifications[justify],
          wrap && "flex-wrap",
          gaps[gap],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";
