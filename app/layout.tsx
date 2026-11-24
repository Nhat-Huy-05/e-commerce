import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { PendingOrderAlert } from "@/components/order/PendingOrderAlert";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "NextCommerce - Cửa Hàng Công Nghệ & Lifestyle Chính Hãng",
  description:
    "Hệ thống mua sắm trực tuyến thiết bị công nghệ cao cấp, bảo hành chính hãng và giao hàng toàn quốc.",
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-surface text-on-surface min-h-screen flex flex-col font-sans antialiased selection:bg-secondary selection:text-white">
        <Header />
        <PendingOrderAlert />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer />
        <Toaster closeButton position="bottom-right" theme="light" />
      </body>
    </html>
  );
}
