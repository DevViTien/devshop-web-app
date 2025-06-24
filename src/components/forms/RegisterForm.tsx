"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { registerSchema, type RegisterData } from "@/lib/validations/auth";
import {
  Form,
  FormField,
  FormLabel,
  FormError,
  FormHelper,
  FormButton,
  Container,
} from "@/components/ui";
import { FormInput } from "@/components/forms/FormInput";

interface RegisterFormProps {
  redirectTo?: string;
  className?: string;
}

export const RegisterForm = ({
  redirectTo = "/auth/login",
  className,
}: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: RegisterData) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Có lỗi xảy ra khi đăng ký");
        return;
      }

      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      router.push(redirectTo);
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" className={className}>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tạo tài khoản
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Tham gia cộng đồng lập trình viên DevShop
          </p>
        </div>

        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField>
              <FormLabel htmlFor="name" required>
                Họ và tên
              </FormLabel>
              <FormInput
                name="name"
                type="text"
                placeholder="Nguyễn Văn A"
                autoComplete="name"
                disabled={isLoading}
              />
              <FormError>{errors.name?.message}</FormError>
            </FormField>

            <FormField>
              <FormLabel htmlFor="email" required>
                Email
              </FormLabel>
              <FormInput
                name="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                disabled={isLoading}
              />
              <FormError>{errors.email?.message}</FormError>
            </FormField>

            <FormField>
              <FormLabel htmlFor="password" required>
                Mật khẩu
              </FormLabel>
              <FormInput
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isLoading}
              />
              <FormHelper>
                Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và
                số
              </FormHelper>
              <FormError>{errors.password?.message}</FormError>
            </FormField>

            <FormField>
              <FormLabel htmlFor="confirmPassword" required>
                Xác nhận mật khẩu
              </FormLabel>
              <FormInput
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isLoading}
              />
              <FormError>{errors.confirmPassword?.message}</FormError>
            </FormField>

            <FormField>
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  {...methods.register("agreeToTerms")}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                  disabled={isLoading}
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Tôi đồng ý với{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    target="_blank"
                  >
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    target="_blank"
                  >
                    Chính sách bảo mật
                  </Link>
                </label>
              </div>
              <FormError>{errors.agreeToTerms?.message}</FormError>
            </FormField>

            <FormButton
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              loadingText="Đang tạo tài khoản..."
              className="w-full"
            >
              Tạo tài khoản
            </FormButton>
          </Form>
        </FormProvider>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Hoặc
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Đã có tài khoản?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
