import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  databaseErrorResponse,
} from "@/lib/api-utils";
import { registerSchema } from "@/lib/validations/auth";
import { ZodError } from "zod";

// POST /api/auth/register - Đăng ký user mới
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request data với Zod
    const validatedData = registerSchema.parse(body);

    // Kết nối database
    await dbConnect();

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return errorResponse("Email này đã được sử dụng", "EMAIL_EXISTS", 400);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(
      validatedData.password,
      saltRounds
    );

    // Tạo user mới
    const newUser = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      role: "buyer", // Mặc định là buyer
      profile: {
        bio: "",
        socialLinks: {},
      },
      preferences: {
        language: "vi", // Mặc định tiếng Việt
        currency: "VND",
        notifications: {
          email: true,
          push: true,
          marketing: false,
        },
        theme: "system",
      },
      status: "active",
    });

    // Lưu user vào database
    const savedUser = await newUser.save();

    // Trả về response (không bao gồm password)
    return successResponse(
      {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        status: savedUser.status,
        createdAt: savedUser.createdAt,
      },
      "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.",
      201
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error);
    }

    // Xử lý lỗi duplicate key từ MongoDB
    if (error instanceof Error && error.message.includes("E11000")) {
      return errorResponse("Email này đã được sử dụng", "EMAIL_EXISTS", 400);
    }

    return databaseErrorResponse(error);
  }
}
