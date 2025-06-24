import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Lấy session từ request
export async function getSessionFromRequest(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return null;
    }

    return {
      user: {
        id: token.userId as string,
        email: token.email as string,
        name: token.name as string,
        role: token.role as string,
      },
    };
  } catch (error) {
    console.error("Error getting session from request:", error);
    return null;
  }
}

// Middleware để require authentication
export async function requireAuth(req: NextRequest) {
  const session = await getSessionFromRequest(req);

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "Bạn cần đăng nhập để truy cập tài nguyên này",
        error: "UNAUTHORIZED",
      },
      { status: 401 }
    );
  }

  return { session };
}

// Middleware để require admin role
export async function requireAdmin(req: NextRequest) {
  const authResult = await requireAuth(req);

  if (authResult instanceof NextResponse) {
    return authResult; // Return error response
  }

  const { session } = authResult;

  if (session.user.role !== "admin") {
    return NextResponse.json(
      {
        success: false,
        message: "Bạn không có quyền truy cập tài nguyên này",
        error: "FORBIDDEN",
      },
      { status: 403 }
    );
  }

  return { session };
}

// Middleware để require seller hoặc admin role
export async function requireSellerOrAdmin(req: NextRequest) {
  const authResult = await requireAuth(req);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { session } = authResult;

  if (!["seller", "admin"].includes(session.user.role)) {
    return NextResponse.json(
      {
        success: false,
        message: "Bạn cần là seller hoặc admin để truy cập tài nguyên này",
        error: "FORBIDDEN",
      },
      { status: 403 }
    );
  }

  return { session };
}
