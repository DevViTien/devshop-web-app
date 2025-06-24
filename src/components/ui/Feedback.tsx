"use client";

import React from "react";
import { cn } from "@/utils/cn";

// Loading Spinner
interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ size = "md", text, className }, ref) => {
    const sizes = {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center space-y-2",
          className
        )}
      >
        <svg
          className={cn(
            "animate-spin text-blue-600 dark:text-blue-400",
            sizes[size]
          )}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />
          <path
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            className="opacity-75"
          />
        </svg>
        {text && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
        )}
      </div>
    );
  }
);

Loading.displayName = "Loading";

// Alert component
interface AlertProps {
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      variant = "info",
      title,
      dismissible = false,
      onDismiss,
      className,
    },
    ref
  ) => {
    const variants = {
      info: {
        container:
          "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
        icon: "text-blue-600 dark:text-blue-400",
        title: "text-blue-800 dark:text-blue-300",
        text: "text-blue-700 dark:text-blue-300",
      },
      success: {
        container:
          "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
        icon: "text-green-600 dark:text-green-400",
        title: "text-green-800 dark:text-green-300",
        text: "text-green-700 dark:text-green-300",
      },
      warning: {
        container:
          "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
        icon: "text-yellow-600 dark:text-yellow-400",
        title: "text-yellow-800 dark:text-yellow-300",
        text: "text-yellow-700 dark:text-yellow-300",
      },
      error: {
        container:
          "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
        icon: "text-red-600 dark:text-red-400",
        title: "text-red-800 dark:text-red-300",
        text: "text-red-700 dark:text-red-300",
      },
    };

    const icons = {
      info: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
      success: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      warning: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      error: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border rounded-lg p-4",
          variants[variant].container,
          className
        )}
      >
        <div className="flex">
          <div className={cn("flex-shrink-0", variants[variant].icon)}>
            {icons[variant]}
          </div>
          <div className="ml-3 flex-1">
            {title && (
              <h3
                className={cn("text-sm font-medium", variants[variant].title)}
              >
                {title}
              </h3>
            )}
            <div
              className={cn(
                "text-sm",
                title ? "mt-2" : "",
                variants[variant].text
              )}
            >
              {children}
            </div>
          </div>
          {dismissible && (
            <div className="ml-auto pl-3">
              <button
                type="button"
                onClick={onDismiss}
                className={cn(
                  "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  variants[variant].icon,
                  "hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

// FeedbackBadge component
interface FeedbackBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FeedbackBadge = React.forwardRef<
  HTMLSpanElement,
  FeedbackBadgeProps
>(({ children, variant = "default", size = "md", className }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-sm",
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
});

FeedbackBadge.displayName = "FeedbackBadge";
