import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/shared/AuthContext";
import { ToastProvider } from "@/shared/toast";

export const metadata: Metadata = {
  title: "DishNet - Mạng xã hội ẩm thực",
  description: "DishNet - Khám phá, chia sẻ và kết nối cộng đồng yêu ẩm thực",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex flex-col min-h-screen bg-bg-light">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
