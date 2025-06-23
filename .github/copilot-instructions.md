# DevShop - Thị Trường Template Mã Nguồn

## 🎯 Mục Tiêu Dự Án

DevShop là một trang web thương mại điện tử chuyên về các template mã nguồn dành cho lập trình viên. Đây là một sàn giao dịch nơi các nhà phát triển có thể mua và bán các template code chất lượng cao.

## 📋 Thông Tin Dự Án

- **Tên dự án:** DevShop Web App
- **Phiên bản:** 0.1.0
- **Tác giả:** TruongNBN (truongnbn.main@gmail.com)
- **Mô tả:** Sàn giao dịch template mã nguồn cho lập trình viên
- **Ngôn ngữ chính:** TypeScript, React, Next.js

## 🏗️ Kiến Trúc Kỹ Thuật

### Công Nghệ Cốt Lõi

- **Giao diện người dùng:** Next.js 15.3.2 (App Router)
- **Backend:** Next.js API Routes
- **Cơ sở dữ liệu:** MongoDB + Mongoose ODM
- **Xác thực:** NextAuth.js + MongoDB Adapter
- **Ngôn ngữ lập trình:** TypeScript 5
- **Tạo kiểu:** Tailwind CSS 3.4.1
- **Biểu tượng:** Heroicons, React Icons
- **Phông chữ:** Open Sans (hỗ trợ tiếng Việt)

### Tính Năng & Thư Viện

- **Đa ngôn ngữ:** next-intl (Vi, En, Zh, Hi)
- **Hệ thống giao diện:** next-themes (Chế độ Tối/Sáng)
- **Thông báo:** react-toastify
- **Quản lý trạng thái:** React Context API
- **Hooks tiện ích:** usehooks-ts utilities
- **Xác thực:** NextAuth.js với MongoDB session store
- **ODM:** Mongoose cho MongoDB operations
- **Validation:** Zod cho type-safe validation

### Công Cụ Phát Triển

- **Công cụ build:** Turbopack (dev), Next.js (production)
- **Kiểm tra code:** ESLint + cấu hình Next.js
- **Tạo kiểu:** PostCSS + Tailwind
- **Kiểm tra kiểu dữ liệu:** TypeScript strict mode

## 🛍️ Tính Năng Sản Phẩm

### Dành Cho Khách Hàng (Người Mua)

- [ ] Duyệt và tìm kiếm template theo danh mục
- [ ] Xem trước và demo của template
- [ ] Đọc tài liệu hướng dẫn và đánh giá
- [ ] Mua template với nhiều phương thức thanh toán
- [ ] Tải xuống mã nguồn sau khi mua
- [ ] Quản lý thư viện template đã mua
- [ ] Hỗ trợ khách hàng

### Dành Cho Nhà Bán (Người Bán)

- [ ] Đăng ký tài khoản người bán
- [ ] Tải lên template với tài liệu hướng dẫn
- [ ] Quản lý giá và bản quyền
- [ ] Theo dõi doanh số và phân tích
- [ ] Nhận thanh toán
- [ ] Tương tác với khách hàng

### Dành Cho Quản Trị Viên

- [ ] Quản lý người dùng và người bán
- [ ] Duyệt và kiểm tra chất lượng template
- [ ] Quản lý danh mục và thẻ tag
- [ ] Theo dõi doanh thu và thống kê
- [ ] Xử lý tranh chấp và hỗ trợ

## 📦 Loại Template Sẽ Bán

### Phát Triển Web

- Template React/Next.js
- Template Vue.js/Nuxt.js
- Template Angular
- Template HTML/CSS/JS tĩnh
- Giao diện WordPress
- Template thương mại điện tử

### Phát Triển Mobile

- Template React Native
- Template Flutter
- Template iOS Swift
- Template Android Kotlin

### Backend & API

- API Node.js/Express
- Template Python Django/FastAPI
- Template PHP Laravel
- Lược đồ cơ sở dữ liệu
- Kiến trúc Microservices

### Dự Án Full-Stack

- Ứng dụng web hoàn chỉnh
- Bộ khởi động SaaS
- Bảng điều khiển quản trị
- Website portfolio
- Hệ thống blog

## 🎨 Hướng Dẫn UI/UX

### Nguyên Tắc Thiết Kế

- **Sạch & Hiện Đại:** Thiết kế tối giản tập trung vào nội dung
- **Thân Thiện Với Lập Trình Viên:** Đối tượng kỹ thuật, xem trước code rõ ràng
- **Mobile-First:** Thiết kế responsive cho mọi thiết bị
- **Hiệu Suất:** Tải nhanh, hình ảnh được tối ưu
- **Khả Năng Tiếp Cận:** Tuân thủ WCAG, thân thiện với screen reader

### Bảng Màu

- **Chính:** Tông màu xanh (tin cậy, công nghệ)
- **Phụ:** Màu xanh lá (thành công, tiền bạc)
- **Nhấn:** Màu cam (kêu gọi hành động)
- **Trung Tính:** Thang màu xám cho văn bản và nền
- **Chế Độ Tối:** Hỗ trợ đầy đủ với chuyển tiếp mượt mà

### Kiểu Chữ

- **Tiêu Đề:** Open Sans Bold
- **Nội Dung:** Open Sans Regular
- **Code:** Font monospace cho đoạn code
- **Đa Ngôn Ngữ:** Hỗ trợ ký tự Vi, En, Zh, Hi

## 🔧 Hướng Dẫn Phát Triển

### Tiêu Chuẩn Code

- **TypeScript:** Chế độ strict, typing đúng cách
- **ESLint:** Tuân theo quy tắc được khuyến nghị của Next.js
- **Prettier:** Định dạng code nhất quán
- **Components:** Modular, tái sử dụng, tài liệu đầy đủ
- **Đặt Tên:** Mô tả rõ ràng, quy ước nhất quán

### Cấu Trúc File

```
src/
├── app/[locale]/           # Trang với đa ngôn ngữ
│   └── api/               # Next.js API Routes
│       ├── auth/          # NextAuth API endpoints
│       ├── templates/     # Template CRUD operations
│       ├── users/         # User management
│       └── payments/      # Payment processing
├── components/             # Components UI có thể tái sử dụng
│   ├── ui/                # Phần tử UI cơ bản
│   ├── layout/            # Components layout
│   ├── features/          # Components theo tính năng
│   └── forms/             # Components form
├── lib/                   # Hàm tiện ích
│   ├── db.ts              # MongoDB connection
│   ├── auth.ts            # NextAuth configuration
│   └── validations/       # Zod schemas
├── models/                # Mongoose schemas
│   ├── User.ts            # User model
│   ├── Template.ts        # Template model
│   ├── Order.ts           # Order model
│   └── Review.ts          # Review model
├── hooks/                 # React hooks tùy chỉnh
├── contexts/              # React Context providers
├── types/                 # Định nghĩa kiểu TypeScript
├── config/                # File cấu hình
└── utils/                 # Hàm helper
```

### Quản Lý State

- **Local State:** useState, useReducer cho state component
- **Global State:** React Context cho xác thực user, theme, giỏ hàng
- **Server State:** SWR hoặc TanStack Query cho dữ liệu API
- **Form State:** React Hook Form cho form phức tạp

### Tích Hợp API

- **REST API:** Next.js API Routes cho backend endpoints
- **Database:** MongoDB với Mongoose ODM cho data modeling
- **Xác Thực:** NextAuth.js với MongoDB adapter, JWT sessions
- **Validation:** Zod schemas cho request/response validation
- **Thanh Toán:** Tích hợp Stripe cho thanh toán
- **Upload File:** Cloudinary hoặc AWS S3 cho file template
- **Tìm Kiếm:** MongoDB text search hoặc Elasticsearch
- **Email:** EmailJS hoặc SendGrid cho email notifications

## 🚀 Lộ Trình Phát Triển

### Giai Đoạn 1: Nền Tảng (Hiện Tại)

- [x] Thiết lập dự án với Next.js, TypeScript, Tailwind
- [x] Thiết lập đa ngôn ngữ
- [x] Triển khai hệ thống theme
- [x] Kết nối MongoDB với Mongoose
- [x] Cấu hình NextAuth.js với MongoDB adapter
- [ ] Thiết kế Mongoose schemas (User, Template, Order, Review)
- [ ] Thư viện components UI cơ bản
- [ ] API Routes cơ bản (/api/auth, /api/users, /api/templates)

### Giai Đoạn 2: Tính Năng Cốt Lõi

- [ ] Đăng ký người dùng và hồ sơ
- [ ] Upload và quản lý template
- [ ] Duyệt và tìm kiếm template
- [ ] Chức năng giỏ hàng
- [ ] Tích hợp thanh toán
- [ ] Hệ thống giao hàng file

### Giai Đoạn 3: Tính Năng Nâng Cao

- [ ] Hệ thống đánh giá và review
- [ ] Bảng điều khiển phân tích cho người bán
- [ ] Tìm kiếm và lọc nâng cao
- [ ] Công cụ gợi ý
- [ ] API cho tích hợp bên thứ ba
- [ ] Ứng dụng mobile đồng hành

### Giai Đoạn 4: Tăng Trưởng & Tối Ưu

- [ ] Tối ưu SEO
- [ ] Giám sát hiệu suất
- [ ] Framework A/B testing
- [ ] Tự động hóa marketing
- [ ] Chương trình affiliate
- [ ] Hỗ trợ đa nhà cung cấp

## 🔐 Cân Nhắc Bảo Mật

- **Xác Thực:** Đăng nhập an toàn với tùy chọn 2FA
- **Phân Quyền:** Kiểm soát truy cập dựa trên vai trò
- **Bảo Vệ Dữ Liệu:** Tuân thủ GDPR, mã hóa dữ liệu
- **Bảo Mật Thanh Toán:** Tuân thủ PCI DSS
- **Bảo Mật File:** Quét virus, liên kết tải xuống an toàn
- **Bảo Mật API:** Giới hạn tốc độ, xác thực đầu vào

## 📊 Chỉ Số Thành Công

- **Chỉ Số Người Dùng:** Đăng ký, giữ chân, tương tác
- **Chỉ Số Kinh Doanh:** GMV, tỷ lệ chuyển đổi, AOV
- **Chỉ Số Kỹ Thuật:** Hiệu suất, thời gian hoạt động, tỷ lệ lỗi
- **Chỉ Số Chất Lượng:** Tỷ lệ phê duyệt template, sự hài lòng của người dùng

**Yêu cầu khi giao tiếp**

- Tên: TruongNBN
- Ngôn ngữ: Tiếng Việt
- Phong cách: Chuyên nghiệp, rõ ràng, chi tiết

---

_Cập nhật lần cuối: June 23, 2025_
