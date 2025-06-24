import { z } from "zod";

// Schema cho update user profile
export const updateUserProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được quá 50 ký tự")
    .optional(),
  profile: z
    .object({
      bio: z.string().max(500, "Bio không được quá 500 ký tự").optional(),
      website: z
        .string()
        .url("URL website không hợp lệ")
        .optional()
        .or(z.literal("")),
      location: z
        .string()
        .max(100, "Địa điểm không được quá 100 ký tự")
        .optional(),
      socialLinks: z
        .object({
          github: z
            .string()
            .url("URL GitHub không hợp lệ")
            .optional()
            .or(z.literal("")),
          linkedin: z
            .string()
            .url("URL LinkedIn không hợp lệ")
            .optional()
            .or(z.literal("")),
          twitter: z
            .string()
            .url("URL Twitter không hợp lệ")
            .optional()
            .or(z.literal("")),
        })
        .optional(),
    })
    .optional(),
  preferences: z
    .object({
      language: z
        .enum(["vi", "en", "zh", "hi"], {
          errorMap: () => ({ message: "Ngôn ngữ phải là vi, en, zh, hoặc hi" }),
        })
        .optional(),
      currency: z
        .enum(["VND", "USD", "EUR"], {
          errorMap: () => ({ message: "Tiền tệ phải là VND, USD, hoặc EUR" }),
        })
        .optional(),
      notifications: z
        .object({
          email: z.boolean().optional(),
          push: z.boolean().optional(),
          marketing: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
});

// Schema cho register seller
export const registerSellerSchema = z.object({
  businessName: z
    .string()
    .min(2, "Tên doanh nghiệp phải có ít nhất 2 ký tự")
    .max(100, "Tên doanh nghiệp không được quá 100 ký tự"),
  taxId: z
    .string()
    .min(5, "Mã số thuế phải có ít nhất 5 ký tự")
    .max(20, "Mã số thuế không được quá 20 ký tự")
    .optional(),
  paymentInfo: z
    .object({
      paypalEmail: z.string().email("Email PayPal không hợp lệ").optional(),
      stripeAccountId: z
        .string()
        .min(5, "Stripe Account ID không hợp lệ")
        .optional(),
    })
    .optional(),
});

// Schema cho change user role (admin only)
export const changeUserRoleSchema = z.object({
  role: z.enum(["buyer", "seller", "admin"], {
    errorMap: () => ({ message: "Role phải là buyer, seller, hoặc admin" }),
  }),
});

// Types cho TypeScript
export type UpdateUserProfileData = z.infer<typeof updateUserProfileSchema>;
export type RegisterSellerData = z.infer<typeof registerSellerSchema>;
export type ChangeUserRoleData = z.infer<typeof changeUserRoleSchema>;
