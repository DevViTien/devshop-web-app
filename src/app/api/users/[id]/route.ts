import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { requireAdmin } from "@/lib/auth-utils";
import {
  successResponse,
  notFoundResponse,
  databaseErrorResponse,
} from "@/lib/api-utils";

// GET /api/users/[id] - Lấy thông tin user theo ID (Admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Kiểm tra quyền admin
    const authResult = await requireAdmin(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    const { id } = params;

    // Kết nối database
    await dbConnect();

    // Tìm user theo ID
    const user = await User.findById(id).select("-password");

    if (!user) {
      return notFoundResponse("Người dùng");
    }

    return successResponse(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role,
        image: user.image,
        profile: user.profile,
        preferences: user.preferences,
        sellerInfo: user.sellerInfo,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      "Lấy thông tin user thành công"
    );
  } catch (error) {
    return databaseErrorResponse(error);
  }
}
