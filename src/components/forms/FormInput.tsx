import React from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { Input, InputProps } from "@/components/ui/Input";

interface FormInputProps extends Omit<InputProps, "errorMessage"> {
  name: string;
  rules?: RegisterOptions;
  showErrorMessage?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, rules, showErrorMessage = true, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = errors[name];
    const errorMessage = error?.message as string;

    return (
      <Input
        {...props}
        {...register(name, rules)}
        ref={ref}
        variant={error ? "error" : props.variant}
        errorMessage={showErrorMessage ? errorMessage : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    );
  }
);

FormInput.displayName = "FormInput";
