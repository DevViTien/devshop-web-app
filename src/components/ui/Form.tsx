"use client";

import React from "react";
import { cn } from "@/utils/cn";

// Form wrapper component
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <form ref={ref} className={cn("space-y-6", className)} {...props}>
        {children}
      </form>
    );
  }
);

Form.displayName = "Form";

// Form field container
interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {children}
      </div>
    );
  }
);

FormField.displayName = "FormField";

// Form label
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, required, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "block text-sm font-medium text-gray-700 dark:text-gray-300",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-red-500 dark:text-red-400">*</span>
        )}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";

// Form error message
interface FormErrorProps {
  children?: React.ReactNode;
  className?: string;
}

export const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ children, className }, ref) => {
    if (!children) return null;

    return (
      <p
        ref={ref}
        className={cn(
          "text-sm text-red-600 dark:text-red-400 flex items-center gap-1",
          className
        )}
      >
        <svg
          className="h-4 w-4 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {children}
      </p>
    );
  }
);

FormError.displayName = "FormError";

// Form helper text
interface FormHelperProps {
  children: React.ReactNode;
  className?: string;
}

export const FormHelper = React.forwardRef<
  HTMLParagraphElement,
  FormHelperProps
>(({ children, className }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
    >
      {children}
    </p>
  );
});

FormHelper.displayName = "FormHelper";

// Form submit button with loading state
interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  (
    {
      children,
      loading = false,
      loadingText = "Đang xử lý...",
      variant = "primary",
      size = "md",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600",
      secondary:
        "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600",
      outline:
        "border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
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
        )}
        {loading ? loadingText : children}
      </button>
    );
  }
);

FormButton.displayName = "FormButton";
