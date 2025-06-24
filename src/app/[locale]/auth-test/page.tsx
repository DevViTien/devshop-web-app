"use client";

import { useState } from "react";

export default function AuthTestPage() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const testRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "DevShop Tester",
          email: "tester@devshop.dev",
          password: "DevShop123",
          confirmPassword: "DevShop123",
          agreeToTerms: true,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const testUserProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/profile");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const testSession = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          DevShop Authentication Test
        </h1>

        <div className="grid gap-4 mb-8">
          <button
            onClick={testRegister}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Test Register User
          </button>

          <button
            onClick={testSession}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Test Session
          </button>

          <button
            onClick={testUserProfile}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            Test User Profile (Protected)
          </button>
        </div>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Testing...</p>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Result:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click &quot;Test Register User&quot; để tạo user mẫu</li>
            <li>Mở DevTools và vào tab Network để xem API calls</li>
            <li>
              Click &quot;Test Session&quot; để check authentication status
            </li>
            <li>
              Click &quot;Test User Profile&quot; để test protected endpoint
            </li>
            <li>Nếu cần đăng nhập, vào: /api/auth/signin</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
