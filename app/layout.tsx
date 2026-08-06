import { Header } from '@/components/common/Header';
import { GeistSans } from 'geist/font/sans';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata = {
  title: 'NextCommerce - Next.js App Router Hybrid Rendering Thesis',
  description: 'E-commerce website demonstrating SSG, ISR, SSR, and CSR rendering strategies using Next.js 15, TypeScript, and Prisma ORM.',
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4">
            <p>
              Báo cáo Niên luận: <strong className="text-slate-300">Xây dựng Website bán hàng với Next.js App Router + TypeScript</strong>
            </p>
          </div>
        </footer>
        <Toaster closeButton position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
