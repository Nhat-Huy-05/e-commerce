import { db } from '@/lib/db';
import { CheckoutForm } from './CheckoutForm';

// SSR Strategy: Force dynamic server-side rendering for security and real-time stock/price verification
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
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
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900">Thanh toán Đơn hàng</h1>
        <p className="text-xs text-slate-400 mt-1">
          Nhập thông tin giao hàng & phương thức thanh toán (Bảo mật SSR)
        </p>
      </div>

      <CheckoutForm products={products} />
    </div>
  );
}
