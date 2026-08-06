'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store';
import { ProductWithCategory } from '@/lib/types';
import { RenderingBadge } from '@/components/common/RenderingBadge';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCartProducts() {
      if (items.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/products');
        const allProds: ProductWithCategory[] = await res.json();
        const cartProds = allProds.filter((p) =>
          items.some((i) => i.productId === p.id)
        );
        setProducts(cartProds);
      } catch (err) {
        console.error('Failed to load cart products', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCartProducts();
  }, [items]);

  const cartDetails = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const unitPrice = product
      ? product.discountPrice ?? product.price
      : 0;
    return {
      ...item,
      product,
      unitPrice,
      totalPrice: unitPrice * item.quantity,
    };
  });

  const subtotal = cartDetails.reduce((sum, item) => sum + item.totalPrice, 0);
  const shippingFee = subtotal > 0 ? (subtotal > 500 ? 0 : 15) : 0;
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="space-y-6">
      <RenderingBadge
        strategy="CSR"
        routeName="app/cart/page.tsx"
        reason="Giỏ hàng sử dụng 100% Client-Side Rendering (CSR). Dữ liệu giỏ hàng lưu trữ trong Zustand store và localStorage trên trình duyệt người dùng. CSR đảm bảo tính riêng tư của người dùng, phản hồi các thao tác thêm/xóa/sửa số lượng ngay lập tức mà không cần gọi lại Server."
      />

      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Giỏ hàng của bạn</h1>
          <p className="text-xs text-slate-400 mt-1">
            Quản lý và cập nhật sản phẩm đã chọn (CSR Zustand Client Store)
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20"
          >
            <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          Đang tải dữ liệu giỏ hàng...
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-slate-900/40 border border-slate-800 rounded-3xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Giỏ hàng đang trống</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Hãy khám phá danh mục sản phẩm tuyệt vời của chúng tôi và chọn thêm món đồ bạn yêu thích.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-colors"
          >
            Khám phá Sản phẩm ngay <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-4">
            {cartDetails.map(({ productId, quantity, product, unitPrice, totalPrice }) => (
              <div
                key={productId}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800"
              >
                <img
                  src={product?.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                  alt={product?.name || 'Product'}
                  className="w-20 h-20 object-cover rounded-xl bg-slate-950 border border-slate-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-100 truncate">
                    {product?.name || 'Loading...'}
                  </h4>
                  <span className="text-xs text-indigo-400 font-mono">
                    ${unitPrice.toFixed(2)}
                  </span>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(productId, quantity - 1)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-slate-200 w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(productId, quantity + 1)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-emerald-400 font-mono">
                    ${totalPrice.toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeItem(productId)}
                    className="mt-1 text-slate-500 hover:text-red-400 text-xs transition-colors"
                  >
                    <Trash2 className="w-4 h-4 ml-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 h-fit space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
              Tóm tắt đơn hàng
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Tạm tính:</span>
                <span className="font-mono text-slate-200">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Phí vận chuyển:</span>
                <span className="font-mono text-slate-200">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-3 border-t border-slate-800">
                <span>Tổng tiền:</span>
                <span className="font-mono text-emerald-400">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg transition-all"
            >
              Tiến hành Thanh toán (SSR) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
