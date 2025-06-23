import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Image from "next/image";

// Card variants using CVA
const cardVariants = cva(
  // Base styles
  "rounded-lg border bg-white shadow-sm transition-all dark:bg-gray-800 dark:border-gray-700",
  {
    variants: {
      variant: {
        default: "border-gray-200 hover:shadow-md",
        elevated: "border-gray-200 shadow-lg hover:shadow-xl",
        outline: "border-2 border-gray-300 shadow-none hover:border-gray-400",
        ghost:
          "border-transparent shadow-none hover:bg-gray-50 dark:hover:bg-gray-700",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      clickable: {
        true: "cursor-pointer hover:shadow-lg active:scale-[0.99] transition-transform",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      clickable: false,
    },
  }
);

// Card component props
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

// Main Card component
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, clickable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, clickable, className }))}
      {...props}
    />
  )
);

Card.displayName = "Card";

// Card Header component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  noBorder?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, noBorder = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 py-4",
        !noBorder && "border-b border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

// Card Title component
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = "h3", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100",
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

// Card Description component
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 dark:text-gray-400", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

// Card Content component
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
));

CardContent.displayName = "CardContent";

// Card Footer component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  noBorder?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, noBorder = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center px-6 py-4",
        !noBorder && "border-t border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

// Card Image component for template previews
export interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "video" | "wide" | "auto";
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  (
    {
      className,
      aspectRatio = "auto",
      alt,
      src,
      fill = true,
      width,
      height,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-t-lg",
        aspectRatio === "square" && "aspect-square",
        aspectRatio === "video" && "aspect-video",
        aspectRatio === "wide" && "aspect-[21/9]"
      )}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          "object-cover transition-transform hover:scale-105",
          className
        )}
      />
    </div>
  )
);

CardImage.displayName = "CardImage";

// Badge component for template categories/tags
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300":
            variant === "default",
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300":
            variant === "primary",
          "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300":
            variant === "secondary",
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300":
            variant === "success",
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300":
            variant === "warning",
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300":
            variant === "error",
        },
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  Badge,
  cardVariants,
};

export default Card;
