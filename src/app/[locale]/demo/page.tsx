"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Typography,
  Button,
  Input,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "@/components/ui";
import {
  Heart,
  ShoppingCart,
  Search,
  Star,
  Download,
  Eye,
  Mail,
  Lock,
  User,
} from "lucide-react";

export default function DemoPage() {
  const t = useTranslations("demo");
  const tCommon = useTranslations("common");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Header */}
        <div className="text-center mb-12">
          <Typography variant="h1" className="mb-4">
            🎨 {t("title")}
          </Typography>
          <Typography
            variant="body-large"
            className="text-gray-600 dark:text-gray-300"
          >
            {t("subtitle")}
          </Typography>
        </div>
        {/* Typography Section */}
        <section className="mb-16">
          <Typography
            variant="h2"
            className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            📝 {t("typography")}
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {" "}
            <Card className="p-6">
              <Typography variant="h3" className="mb-4">
                {t("headings")}
              </Typography>
              <div className="space-y-4">
                <Typography variant="h1">Heading 1 - DevShop</Typography>
                <Typography variant="h2">
                  Heading 2 - Template Marketplace
                </Typography>
                <Typography variant="h3">Heading 3 - Code Templates</Typography>
                <Typography variant="h4">
                  Heading 4 - Developer Tools
                </Typography>
              </div>
            </Card>
            <Card className="p-6">
              <Typography variant="h3" className="mb-4">
                {t("bodyText")}
              </Typography>
              <div className="space-y-4">
                <Typography variant="body-large">
                  Body Large - DevShop là marketplace dành cho lập trình viên
                </Typography>
                <Typography variant="body">
                  Body text - Khám phá hàng ngàn template code chất lượng cao từ
                  các developer tài năng
                </Typography>
                <Typography variant="body-small" className="text-gray-500">
                  Body Small - Cập nhật lần cuối: 24/06/2025
                </Typography>
                <Typography variant="caption" color="muted">
                  Caption - Thông tin bổ sung không quan trọng
                </Typography>
              </div>
            </Card>
          </div>
        </section>{" "}
        {/* Button Section */}
        <section className="mb-16">
          <Typography
            variant="h2"
            className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            🔘 {t("buttons")}
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <Typography variant="h3" className="mb-4">
                {t("variants")}
              </Typography>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {tCommon("buyNow")}
                </Button>{" "}
                <Button variant="danger">
                  <Heart className="w-4 h-4 mr-2" />
                  {tCommon("delete")}
                </Button>
                <Button variant="secondary">
                  <Eye className="w-4 h-4 mr-2" />
                  {tCommon("preview")}
                </Button>
                <Button variant="success">
                  <Download className="w-4 h-4 mr-2" />
                  {tCommon("download")}
                </Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="link">Link Button</Button>
              </div>
            </Card>{" "}
            <Card className="p-6">
              <Typography variant="h3" className="mb-4">
                {t("sizesStates")}
              </Typography>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button disabled>Disabled</Button>
                  <Button loading>Loading...</Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
        {/* Input Section */}
        <section className="mb-16">
          <Typography
            variant="h2"
            className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            📝 Inputs
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <Typography variant="h3" className="mb-4">
                Input Variants
              </Typography>
              <div className="space-y-4">
                <Input
                  placeholder="Tìm kiếm template..."
                  leftIcon={<Search className="w-4 h-4" />}
                />
                <Input
                  type="email"
                  placeholder="Email của bạn"
                  leftIcon={<Mail className="w-4 h-4" />}
                />
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  leftIcon={<Lock className="w-4 h-4" />}
                />
                <Input
                  placeholder="Tên người dùng"
                  leftIcon={<User className="w-4 h-4" />}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </Card>

            <Card className="p-6">
              <Typography variant="h3" className="mb-4">
                Input States
              </Typography>
              <div className="space-y-4">
                <Input placeholder="Input bình thường" />
                <Input placeholder="Input disabled" disabled />
                <Input
                  placeholder="Input với helper text"
                  helperText="Nhập ít nhất 8 ký tự"
                />
              </div>
            </Card>
          </div>
        </section>
        {/* Card Section */}
        <section className="mb-16">
          <Typography
            variant="h2"
            className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            🃏 Cards
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <Typography variant="h3" className="mb-2">
                React Dashboard
              </Typography>
              <Typography
                variant="body"
                className="mb-4 text-gray-600 dark:text-gray-300"
              >
                Template admin dashboard hiện đại với React & TypeScript
              </Typography>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <Typography variant="caption" className="text-gray-500">
                  (42 đánh giá)
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="h4" className="text-blue-600">
                  $49
                </Typography>
                <Button size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Mua
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Typography variant="h3" className="mb-2">
                Next.js E-commerce
              </Typography>
              <Typography
                variant="body"
                className="mb-4 text-gray-600 dark:text-gray-300"
              >
                Template website bán hàng với Next.js 15 & Tailwind CSS
              </Typography>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
                <Typography variant="caption" className="text-gray-500">
                  (28 đánh giá)
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="h4" className="text-blue-600">
                  $79
                </Typography>
                <Button size="sm" variant="secondary">
                  <Eye className="w-4 h-4 mr-2" />
                  Xem
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
              <Typography
                variant="h3"
                className="mb-2 text-blue-700 dark:text-blue-300"
              >
                Vue.js SaaS Kit
              </Typography>
              <Typography
                variant="body"
                className="mb-4 text-gray-600 dark:text-gray-300"
              >
                Bộ kit hoàn chỉnh để xây dựng ứng dụng SaaS với Vue 3
              </Typography>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <Typography variant="caption" className="text-gray-500">
                  (89 đánh giá)
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="h4" className="text-blue-600">
                  $129
                </Typography>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Mua
                </Button>
              </div>
            </Card>
          </div>
        </section>
        {/* Modal Section */}
        <section className="mb-16">
          <Typography
            variant="h2"
            className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            🪟 Modal
          </Typography>

          <Card className="p-6">
            <Typography variant="h3" className="mb-4">
              Modal Demo
            </Typography>
            <Typography variant="body" className="mb-6">
              Click vào button bên dưới để mở modal demo
            </Typography>
            <Button onClick={() => setIsModalOpen(true)}>Mở Modal Demo</Button>{" "}
            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
              <ModalContent size="lg">
                <ModalHeader>
                  <ModalTitle>Template Preview</ModalTitle>
                </ModalHeader>

                <ModalBody>
                  <div className="space-y-4">
                    <Typography variant="body">
                      Đây là modal demo cho việc xem trước template. Modal có
                      thể chứa:
                    </Typography>

                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      <li>Hình ảnh preview của template</li>
                      <li>Video demo tính năng</li>
                      <li>Mô tả chi tiết và tài liệu</li>
                      <li>Đánh giá từ người dùng</li>
                      <li>Thông tin về tác giả</li>
                    </ul>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                      <Typography variant="code" className="font-mono">
                        {`// Code preview example
const template = {
  name: "React Dashboard",
  version: "2.1.0",
  framework: "React 18"
};`}
                      </Typography>
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Đóng
                  </Button>
                  <Button>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Thêm vào giỏ hàng
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Card>
        </section>
        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
          <Typography variant="caption" color="muted">
            🚀 DevShop UI Components Demo - Built with React, Next.js & Tailwind
            CSS
          </Typography>
        </footer>
      </div>
    </div>
  );
}
