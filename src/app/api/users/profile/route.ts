import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth-utils";
import {
  successResponse,
  validationErrorResponse,
  notFoundResponse,
  databaseErrorResponse,
} from "@/lib/api-utils";
import { updateUserProfileSchema } from "@/lib/validations/user";
import { ZodError } from "zod";

// GET /api/users/profile - Lấy thông tin profile của user hiện tại
export async function GET(request: NextRequest) {
  try {
    // Kiểm tra authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    const { session } = authResult;

    // Kết nối database
    await dbConnect();

    // Tìm user trong database
    const user = await User.findById(session.user.id).select("-password");

    if (!user) {
      return notFoundResponse("Người dùng");
    }

    return successResponse(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        profile: user.profile,
        preferences: user.preferences,
        sellerInfo: user.role === "seller" ? user.sellerInfo : undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      "Lấy thông tin profile thành công"
    );
  } catch (error) {
    return databaseErrorResponse(error);
  }
}

// PUT /api/users/profile - Cập nhật thông tin profile của user hiện tại
export async function PUT(request: NextRequest) {
  try {
    // Kiểm tra authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    const { session } = authResult;

    // Parse request body
    const body = await request.json();

    // Validate request data với Zod
    const validatedData = updateUserProfileSchema.parse(body);

    // Kết nối database
    await dbConnect();

    // Tìm và cập nhật user
    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        ...validatedData,
        updatedAt: new Date(),
      },
      {
        new: true, // Trả về document sau khi update
        runValidators: true, // Chạy mongoose validators
        select: "-password", // Không trả về password
      }
    );

    if (!user) {
      return notFoundResponse("Người dùng");
    }

    return successResponse(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        profile: user.profile,
        preferences: user.preferences,
        updatedAt: user.updatedAt,
      },
      "Cập nhật profile thành công"
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error);
    }

    return databaseErrorResponse(error);
  }
}
