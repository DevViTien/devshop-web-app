import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth-utils";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  databaseErrorResponse,
} from "@/lib/api-utils";
import { registerSellerSchema } from "@/lib/validations/user";
import { ZodError } from "zod";

// POST /api/users/register-seller - Đăng ký trở thành seller
export async function POST(request: NextRequest) {
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
    const validatedData = registerSellerSchema.parse(body);

    // Kết nối database
    await dbConnect();

    // Tìm user hiện tại
    const user = await User.findById(session.user.id);

    if (!user) {
      return notFoundResponse("Người dùng");
    }

    // Kiểm tra xem user đã là seller chưa
    if (user.role === "seller") {
      return errorResponse("Bạn đã là seller rồi", "ALREADY_SELLER", 400);
    }

    // Cập nhật user thành seller
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        role: "seller",
        sellerInfo: {
          isVerified: false,
          businessName: validatedData.businessName,
          taxId: validatedData.taxId,
          paymentInfo: validatedData.paymentInfo,
          rating: {
            average: 0,
            count: 0,
          },
          totalSales: 0,
          totalEarnings: 0,
        },
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
        select: "-password",
      }
    );

    return successResponse(
      {
        id: updatedUser?._id,
        name: updatedUser?.name,
        email: updatedUser?.email,
        role: updatedUser?.role,
        sellerInfo: updatedUser?.sellerInfo,
        updatedAt: updatedUser?.updatedAt,
      },
      "Đăng ký seller thành công! Tài khoản của bạn sẽ được xét duyệt trong vòng 24-48 giờ."
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error);
    }

    return databaseErrorResponse(error);
  }
}
