import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { GeistSans } from 'geist/font/sans';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata = {
  title: 'NextCommerce - Cửa Hàng Công Nghệ & Lifestyle Chính Hãng',
  description: 'Hệ thống mua sắm trực tuyến thiết bị công nghệ cao cấp, bảo hành chính hãng và giao hàng toàn quốc.',
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
        <Toaster closeButton position="bottom-right" theme="light" />
      </body>
    </html>
  );
}
