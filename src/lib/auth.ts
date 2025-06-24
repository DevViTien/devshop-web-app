import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";

// Kết nối MongoDB cho NextAuth adapter
const client = new MongoClient(process.env.MONGODB_URI as string);
const clientPromise = client.connect();

export const authOptions: NextAuthOptions = {
  // Sử dụng MongoDB adapter cho session storage
  adapter: MongoDBAdapter(clientPromise),

  // Cấu hình providers đăng nhập
  providers: [
    // Email Provider cho magic link login
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    // Credentials Provider cho email/password login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Kết nối database
          await dbConnect();

          // Tìm user với email (include password để verify)
          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );

          if (!user) {
            return null;
          }

          // Kiểm tra password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password || ""
          );

          if (!isPasswordValid) {
            return null;
          }

          // Cập nhật lastLoginAt
          await User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() });

          // Trả về user object
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  // Cấu hình session
  session: {
    strategy: "jwt", // Sử dụng JWT cho tương thích tốt hơn với Next.js 15
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Cấu hình pages tùy chỉnh
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  // Callbacks để tùy chỉnh hành vi
  callbacks: {
    async jwt({ token, user }) {
      // Thêm thông tin user vào JWT token
      if (user) {
        token.userId = user.id;
        token.role = user.role || "buyer";
      }
      return token;
    },

    async session({ session, token }) {
      // Thêm thông tin từ token vào session
      if (token && session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  // Cấu hình debug cho development
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;
