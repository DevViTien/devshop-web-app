import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    // Thử kết nối đến MongoDB
    await dbConnect();

    // Kiểm tra trạng thái kết nối
    const connectionState = mongoose.connection.readyState;
    const stateLabels = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    return NextResponse.json(
      {
        success: true,
        message: "Kết nối MongoDB thành công!",
        connectionState:
          stateLabels[connectionState as keyof typeof stateLabels],
        database: mongoose.connection.name,
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
        mongoUri: process.env.MONGODB_URI ? "Đã cấu hình" : "Chưa cấu hình",
      },
      { status: 500 }
    );
  }
}
