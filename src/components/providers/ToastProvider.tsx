"use client";

import { ToastContainer } from "react-toastify";
import { useIsMounted } from "usehooks-ts";
import "react-toastify/dist/ReactToastify.css";

/**
 * ToastProvider Component - Cung cấp toast notification cho toàn bộ ứng dụng
 * Sử dụng light theme mặc định
 */
export default function ToastProvider() {
  const isMounted = useIsMounted();

  // Kiểm tra nếu component chưa được mount, không render gì cả
  if (!isMounted()) {
    return null;
  }

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      className="toast-container"
      style={{
        fontSize: "14px",
      }}
    />
  );
}
