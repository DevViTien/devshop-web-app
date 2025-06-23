import React from "react";
import { cn } from "@/utils/cn";

// Typography variant types
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "body-large"
  | "body-small"
  | "caption"
  | "overline"
  | "code"
  | "code-inline";

// Typography component props
interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
  color?:
    | "primary"
    | "secondary"
    | "muted"
    | "accent"
    | "success"
    | "warning"
    | "error";
}

// Typography variant styles using Tailwind classes
const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
  h2: "text-3xl md:text-4xl font-bold leading-tight",
  h3: "text-2xl md:text-3xl font-bold leading-snug",
  h4: "text-xl md:text-2xl font-semibold leading-snug",
  h5: "text-lg md:text-xl font-semibold leading-normal",
  h6: "text-base md:text-lg font-semibold leading-normal",
  body: "text-base leading-relaxed",
  "body-large": "text-lg leading-relaxed",
  "body-small": "text-sm leading-relaxed",
  caption: "text-xs leading-normal",
  overline: "text-xs uppercase tracking-wide font-medium",
  code: "font-mono text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md",
  "code-inline":
    "font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded",
};

// Default HTML elements for each variant
const defaultElements: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  "body-large": "p",
  "body-small": "p",
  caption: "span",
  overline: "span",
  code: "pre",
  "code-inline": "code",
};

// Font weight styles
const weightStyles: Record<NonNullable<TypographyProps["weight"]>, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

// Text alignment styles
const alignStyles: Record<NonNullable<TypographyProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

// Color styles - following DevShop design system
const colorStyles: Record<NonNullable<TypographyProps["color"]>, string> = {
  primary: "text-blue-600 dark:text-blue-400",
  secondary: "text-gray-600 dark:text-gray-300",
  muted: "text-gray-500 dark:text-gray-400",
  accent: "text-orange-600 dark:text-orange-400",
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  error: "text-red-600 dark:text-red-400",
};

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  children,
  className,
  as,
  weight,
  align,
  color,
  ...props
}) => {
  const Component = as || defaultElements[variant];

  return (
    <Component
      className={cn(
        variantStyles[variant],
        weight && weightStyles[weight],
        align && alignStyles[align],
        color && colorStyles[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

// Convenience components for common use cases
export const Heading1: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h1" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h2" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h3" {...props} />
);

export const Heading4: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h4" {...props} />
);

export const Heading5: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h5" {...props} />
);

export const Heading6: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h6" {...props} />
);

export const Body: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="body" {...props} />
);

export const BodyLarge: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="body-large" {...props} />;

export const BodySmall: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="body-small" {...props} />;

export const Caption: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="caption" {...props} />
);

export const Code: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="code" {...props} />
);

export const CodeInline: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="code-inline" {...props} />;

export default Typography;
