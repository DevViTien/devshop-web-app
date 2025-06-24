import { NextResponse } from "next/server";
import { ZodError } from "zod";

// Standard API response format
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string>;
}

// Success response helper
export function successResponse<T>(
  data: T,
  message: string = "Thành công",
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

// Error response helper
export function errorResponse(
  message: string,
  error: string = "INTERNAL_ERROR",
  status: number = 500
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      error,
    },
    { status }
  );
}

// Validation error response helper
export function validationErrorResponse(
  zodError: ZodError
): NextResponse<ApiResponse> {
  const errors: Record<string, string> = {};

  zodError.errors.forEach((err) => {
    const path = err.path.join(".");
    errors[path] = err.message;
  });

  return NextResponse.json(
    {
      success: false,
      message: "Dữ liệu đầu vào không hợp lệ",
      error: "VALIDATION_ERROR",
      errors,
    },
    { status: 400 }
  );
}

// Not found response helper
export function notFoundResponse(
  resource: string = "Tài nguyên"
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message: `${resource} không được tìm thấy`,
      error: "NOT_FOUND",
    },
    { status: 404 }
  );
}

// Database error response helper
export function databaseErrorResponse(
  error: Error | unknown
): NextResponse<ApiResponse> {
  console.error("Database error:", error);

  return NextResponse.json(
    {
      success: false,
      message: "Lỗi cơ sở dữ liệu",
      error: "DATABASE_ERROR",
    },
    { status: 500 }
  );
}
