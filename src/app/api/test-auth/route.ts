import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const testData = {
    registerEndpoint: {
      url: `${baseUrl}/api/auth/register`,
      method: "POST",
      description: "Đăng ký user mới",
      sampleData: {
        name: "Test User",
        email: "test@devshop.dev",
        password: "TestPass123",
        confirmPassword: "TestPass123",
        agreeToTerms: true,
      },
    },
    loginTest: {
      signInUrl: `${baseUrl}/api/auth/signin`,
      description: "NextAuth sign-in endpoint",
      provider: "credentials",
      credentials: {
        email: "test@devshop.dev",
        password: "TestPass123",
      },
    },
    protectedEndpoints: [
      `${baseUrl}/api/users/profile`,
      `${baseUrl}/api/users/register-seller`,
    ],
  };

  return NextResponse.json(
    {
      success: true,
      message: "Authentication System Test Guide",
      steps: [
        "1. Tạo user mới qua POST /api/auth/register",
        "2. Đăng nhập qua NextAuth credentials provider",
        "3. Test protected endpoints với session",
        "4. Test logout flow",
      ],
      testData,
      note: "Bây giờ có thể test đầy đủ authentication flow với User model thật!",
    },
    { status: 200 }
  );
}

// Test endpoint để tạo user mẫu
export async function POST() {
  const registerUrl = "http://localhost:3000/api/auth/register";

  const sampleUser = {
    name: "DevShop Tester",
    email: "tester@devshop.dev",
    password: "DevShop123",
    confirmPassword: "DevShop123",
    agreeToTerms: true,
  };

  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleUser),
    });

    const result = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: "Test user creation completed",
        registerResponse: result,
        statusCode: response.status,
        nextStep:
          "Bây giờ có thể đăng nhập với email: tester@devshop.dev, password: DevShop123",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create test user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
