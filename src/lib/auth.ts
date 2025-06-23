import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

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
        // TODO: Implement user authentication logic
        // Sẽ được triển khai ở bước sau khi có User model
        if (credentials?.email && credentials?.password) {
          // Placeholder user object
          return {
            id: "1",
            email: credentials.email,
            name: "User",
          };
        }
        return null;
      },
    }),
  ],

  // Cấu hình session
  session: {
    strategy: "database", // Sử dụng database sessions thay vì JWT
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  // Cấu hình pages tùy chỉnh
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  // Callbacks để tùy chỉnh hành vi
  callbacks: {
    async session({ session, user }) {
      // Thêm user id vào session
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },

    async jwt({ token, user }) {
      // Lưu user id trong JWT token nếu cần
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
  },

  // Cấu hình debug cho development
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;
