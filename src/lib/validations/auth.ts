import { z } from "zod";

// Schema cho đăng ký user mới
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(50, "Tên không được quá 50 ký tự")
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Tên chỉ được chứa chữ cái và khoảng trắng"),

    email: z.string().email("Email không hợp lệ").toLowerCase(),

    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"
      ),

    confirmPassword: z.string(),

    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý với điều khoản sử dụng",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

// Schema cho đăng nhập
export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ").toLowerCase(),

  password: z.string().min(1, "Mật khẩu không được để trống"),

  remember: z.boolean().optional(),
});

// Schema cho reset password
export const resetPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ").toLowerCase(),
});

// Schema cho change password
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mật khẩu hiện tại không được để trống"),

    newPassword: z
      .string()
      .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Mật khẩu mới phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"
      ),

    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmNewPassword"],
  });

// Types cho TypeScript
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
