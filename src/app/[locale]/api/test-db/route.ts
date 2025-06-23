import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    // Thử kết nối đến MongoDB
    await dbConnect();

    return NextResponse.json(
      {
        success: true,
        message: "Kết nối MongoDB thành công!",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể kết nối đến MongoDB",
        error: error instanceof Error ? error.message : "Lỗi không xác định",
      },
      { status: 500 }
    );
  }
}
