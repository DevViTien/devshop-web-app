import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // Kiểm tra cấu hình NextAuth
    const session = await getServerSession(authOptions);

    return NextResponse.json(
      {
        success: true,
        message: "NextAuth cấu hình thành công!",
        hasSession: !!session,
        sessionData: session
          ? {
              user: session.user,
              expires: session.expires,
            }
          : null,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi NextAuth:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Lỗi cấu hình NextAuth",
        error: error instanceof Error ? error.message : "Lỗi không xác định",
      },
      { status: 500 }
    );
  }
}
