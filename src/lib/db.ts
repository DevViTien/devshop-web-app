import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Kiểm tra nếu đã có kết nối
  if (connection.isConnected) {
    console.log("Sử dụng kết nối cơ sở dữ liệu hiện có");
    return;
  }

  try {
    // Lấy MongoDB URI từ biến môi trường
    const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI hoặc MONGODB_URL không được định nghĩa trong biến môi trường"
      );
    }

    // Thiết lập kết nối MongoDB với Mongoose
    const db = await mongoose.connect(mongoUri, {
      // Các tùy chọn kết nối được khuyến nghị
      bufferCommands: false, // Tắt mongoose buffering
      maxPoolSize: 10, // Duy trì tối đa 10 socket connections
      serverSelectionTimeoutMS: 5000, // Giữ khoảng thời gian chờ đợi server selection là 5 giây
      socketTimeoutMS: 45000, // Đóng sockets sau 45 giây không hoạt động
      family: 4, // Sử dụng IPv4, bỏ qua IPv6
    });

    connection.isConnected = db.connections[0].readyState;

    console.log("Kết nối MongoDB thành công");
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
    // Trong production, có thể muốn thoát ứng dụng
    process.exit(1);
  }
}

// Hàm ngắt kết nối (hữu ích cho testing và cleanup)
async function dbDisconnect(): Promise<void> {
  try {
    await mongoose.disconnect();
    connection.isConnected = 0;
    console.log("Ngắt kết nối MongoDB thành công");
  } catch (error) {
    console.error("Lỗi ngắt kết nối MongoDB:", error);
  }
}

// Export hàm kết nối chính
export default dbConnect;

// Export hàm ngắt kết nối cho testing
export { dbDisconnect };
