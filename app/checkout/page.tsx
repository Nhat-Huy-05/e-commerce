import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { CheckoutForm } from './CheckoutForm';

// SSR Strategy: Force dynamic server-side rendering for security and real-time stock/price verification
export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface CheckoutPageProps {
  searchParams: Promise<{
    items?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;
  const { items } = await searchParams;

  // If not logged in, must be redirected to the login page, with a return URL included.
  if (!userId) {
    const returnUrl = items ? `/checkout?items=${items}` : '/checkout';
    redirect(`/login?redirect=${encodeURIComponent(returnUrl)}`);
  }

  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      discountPrice: true,
      stock: true,
      thumbnail: true,
    },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Thanh toán Đơn hàng
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Kiểm tra danh sách sản phẩm và điền thông tin nhận hàng để hoàn tất thanh toán.
        </p>
      </div>

      <Suspense fallback={<div className="py-16 text-center text-slate-400">Đang tải biểu mẫu thanh toán...</div>}>
        <CheckoutForm products={products} />
      </Suspense>
    </div>
  );
}
