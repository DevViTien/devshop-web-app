import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const testEndpoints = [
    {
      name: "User Profile (GET)",
      url: `${baseUrl}/api/users/profile`,
      method: "GET",
      description:
        "Lấy thông tin profile của user hiện tại (cần authentication)",
      expectedStatus: "401 (nếu chưa đăng nhập) hoặc 200 (nếu đã đăng nhập)",
    },
    {
      name: "User Profile (PUT)",
      url: `${baseUrl}/api/users/profile`,
      method: "PUT",
      description: "Cập nhật thông tin profile (cần authentication)",
      expectedStatus: "401 (nếu chưa đăng nhập)",
    },
    {
      name: "User by ID (Admin only)",
      url: `${baseUrl}/api/users/[id]`,
      method: "GET",
      description: "Lấy thông tin user theo ID (chỉ admin)",
      expectedStatus:
        "401 (nếu chưa đăng nhập) hoặc 403 (nếu không phải admin)",
    },
    {
      name: "Register Seller",
      url: `${baseUrl}/api/users/register-seller`,
      method: "POST",
      description: "Đăng ký trở thành seller (cần authentication)",
      expectedStatus: "401 (nếu chưa đăng nhập)",
    },
  ];

  return NextResponse.json(
    {
      success: true,
      message: "Danh sách User API Endpoints đã tạo",
      endpoints: testEndpoints,
      note: "Tất cả endpoints đều yêu cầu authentication. Để test, bạn cần đăng nhập trước.",
      nextSteps: [
        "Tạo trang đăng nhập để test authentication",
        "Tạo test user trong database",
        "Test từng endpoint với Postman hoặc tương tự",
      ],
    },
    { status: 200 }
  );
}
