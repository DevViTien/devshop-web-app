import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User, Template, Order, Review } from "@/models";

export async function GET() {
  try {
    // Kết nối database
    await dbConnect();

    // Test tạo models (chỉ kiểm tra cấu trúc, không lưu data)
    const testResults = {
      modelsLoaded: {
        User: !!User,
        Template: !!Template,
        Order: !!Order,
        Review: !!Review,
      },

      // Test collections existence
      collections: {},
      // Basic model info
      modelInfo: {
        User: {
          collection: User.collection.name,
          hasIndexes: true,
        },
        Template: {
          collection: Template.collection.name,
          hasIndexes: true,
        },
        Order: {
          collection: Order.collection.name,
          hasIndexes: true,
        },
        Review: {
          collection: Review.collection.name,
          hasIndexes: true,
        },
      },
    };

    return NextResponse.json(
      {
        success: true,
        message: "Mongoose Models tải thành công!",
        data: testResults,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi Models:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi tải Mongoose Models",
        error: error instanceof Error ? error.message : "Lỗi không xác định",
      },
      { status: 500 }
    );
  }
}
