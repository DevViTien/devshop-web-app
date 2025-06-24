import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    // Kết nối database
    await dbConnect();

    // Test tạo một user mẫu để kiểm tra schema
    const testUser = {
      name: "Test User",
      email: "test@devshop.dev",
      role: "buyer",
      profile: {
        bio: "Test user for schema validation",
      },
    };

    // Validate schema mà không lưu vào database
    const userValidation = new User(testUser);
    const validationError = userValidation.validateSync();

    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          message: "Schema validation failed",
          errors: validationError.errors,
        },
        { status: 400 }
      );
    }

    // Đếm số users hiện có
    const userCount = await User.countDocuments();

    return NextResponse.json(
      {
        success: true,
        message: "User model hoạt động tốt!",
        userCount: userCount,
        testValidation: "Passed",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi test models:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi test models",
        error: error instanceof Error ? error.message : "Lỗi không xác định",
      },
      { status: 500 }
    );
  }
}
