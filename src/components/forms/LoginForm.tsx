"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { loginSchema, type LoginData } from "@/lib/validations/auth";
import {
  Form,
  FormField,
  FormLabel,
  FormError,
  FormButton,
  Container,
} from "@/components/ui";
import { FormInput } from "@/components/forms/FormInput";

interface LoginFormProps {
  redirectTo?: string;
  className?: string;
}

export const LoginForm = ({ redirectTo = "/", className }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LoginData) => {
    try {
      setIsLoading(true);

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Email hoặc mật khẩu không đúng");
        return;
      }

      if (result?.ok) {
        toast.success("Đăng nhập thành công!");
        router.push(redirectTo);
        router.refresh();
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
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
            Đăng nhập
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Chào mừng bạn quay trở lại DevShop
          </p>
        </div>

        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                autoComplete="current-password"
                disabled={isLoading}
              />
              <FormError>{errors.password?.message}</FormError>
            </FormField>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <FormButton
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              loadingText="Đang đăng nhập..."
              className="w-full"
            >
              Đăng nhập
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
              Chưa có tài khoản?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
