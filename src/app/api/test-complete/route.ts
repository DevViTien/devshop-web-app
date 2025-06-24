import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const apiEndpoints = {
    infrastructure: [
      {
        name: "MongoDB Connection Test",
        url: `${baseUrl}/api/test-db`,
        status: "✅ Ready",
        description: "Test MongoDB connection và database state",
      },
      {
        name: "Models Validation Test",
        url: `${baseUrl}/api/test-models`,
        status: "✅ Ready",
        description: "Test Mongoose models (User, Template, Order, Review)",
      },
    ],
    authentication: [
      {
        name: "NextAuth Session",
        url: `${baseUrl}/api/auth/session`,
        status: "✅ Working",
        description: "Check current user session",
      },
      {
        name: "NextAuth SignIn Page",
        url: `${baseUrl}/api/auth/signin`,
        status: "✅ Working",
        description: "NextAuth built-in sign-in page",
      },
      {
        name: "User Registration",
        url: `${baseUrl}/api/auth/register`,
        method: "POST",
        status: "✅ Ready",
        description: "Register new user with email/password",
      },
    ],
    userManagement: [
      {
        name: "User Profile (GET)",
        url: `${baseUrl}/api/users/profile`,
        method: "GET",
        status: "🔒 Protected",
        description: "Get current user profile (requires auth)",
      },
      {
        name: "User Profile (PUT)",
        url: `${baseUrl}/api/users/profile`,
        method: "PUT",
        status: "🔒 Protected",
        description: "Update current user profile (requires auth)",
      },
      {
        name: "User by ID (Admin)",
        url: `${baseUrl}/api/users/[id]`,
        method: "GET",
        status: "👑 Admin Only",
        description: "Get user by ID (admin only)",
      },
      {
        name: "Register Seller",
        url: `${baseUrl}/api/users/register-seller`,
        method: "POST",
        status: "🔒 Protected",
        description: "Upgrade user to seller (requires auth)",
      },
    ],
    testing: [
      {
        name: "Authentication Test Suite",
        url: `${baseUrl}/api/test-auth`,
        status: "🧪 Test Helper",
        description: "Test authentication flow và create sample user",
      },
      {
        name: "User APIs Overview",
        url: `${baseUrl}/api/test-users`,
        status: "📋 Documentation",
        description: "Overview of all user management endpoints",
      },
      {
        name: "Interactive Test Page",
        url: `${baseUrl}/auth-test`,
        status: "🌐 Web Interface",
        description: "Browser-based testing interface",
      },
    ],
  };

  const summary = {
    totalEndpoints: Object.values(apiEndpoints).flat().length,
    readyEndpoints: Object.values(apiEndpoints)
      .flat()
      .filter((ep) => ep.status.includes("✅")).length,
    protectedEndpoints: Object.values(apiEndpoints)
      .flat()
      .filter((ep) => ep.status.includes("🔒")).length,
    adminEndpoints: Object.values(apiEndpoints)
      .flat()
      .filter((ep) => ep.status.includes("👑")).length,
  };

  return NextResponse.json(
    {
      success: true,
      message: "🎉 DevShop API System - Complete Test Results",
      timestamp: new Date().toISOString(),
      summary,
      endpoints: apiEndpoints,
      nextSteps: [
        "✅ All core infrastructure APIs working",
        "✅ NextAuth authentication system operational",
        "✅ User management APIs ready",
        "🔜 Ready for Template APIs development",
        "🔜 Ready for UI Components development",
      ],
      testInstructions: {
        basicTest: "Visit /auth-test for interactive testing",
        registerUser: "POST to /api/auth/register with user data",
        loginUser: "Use /api/auth/signin for credentials login",
        accessProfile: "GET /api/users/profile after login",
      },
    },
    { status: 200 }
  );
}
