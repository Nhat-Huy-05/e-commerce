'use client';

import { useCart } from '@/lib/store';
import { ProductWithCategory } from '@/lib/types';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

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

  // Tự động tích chọn tất cả sản phẩm khi vừa vào giỏ hàng
  useEffect(() => {
    if (!hasInitialized && items.length > 0) {
      setSelectedIds(items.map((i) => i.productId));
      setHasInitialized(true);
    } else {
      const validIds = new Set(items.map((i) => i.productId));
      setSelectedIds((prev) => prev.filter((id) => validIds.has(id)));
    }
  }, [items, hasInitialized]);

  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.productId));
    }
  };

  const toggleSelectItem = (productId: string) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

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
      isSelected: selectedIds.includes(item.productId),
    };
  });

  const selectedDetails = cartDetails.filter((item) => item.isSelected);
  const selectedCount = selectedDetails.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedDetails.reduce((sum, item) => sum + item.totalPrice, 0);
  const shippingFee = subtotal > 0 ? (subtotal > 500 ? 0 : 15) : 0;
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Giỏ hàng</h1>
          <p className="text-xs text-slate-500 mt-1">
            Quản lý và cập nhật sản phẩm đã chọn
          </p>
        </div>
        {items.length > 0 && (
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && selectedIds.length < items.length && (
              <button
                onClick={() => {
                  selectedIds.forEach((id) => removeItem(id));
                  setSelectedIds([]);
                }}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa đã chọn ({selectedIds.length})
              </button>
            )}
            <button
              onClick={() => {
                clearCart();
                setSelectedIds([]);
              }}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500 text-sm">
          Đang tải dữ liệu giỏ hàng...
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-white border border-slate-200 rounded-3xl shadow-xs">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Giỏ hàng đang trống</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Hãy khám phá danh mục sản phẩm tuyệt vời của chúng tôi và chọn thêm món đồ bạn yêu thích.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-colors"
          >
            Khám phá Sản phẩm ngay <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-3">
            {/* Thanh tiêu đề: Chọn tất cả, Số lượng, Thành tiền */}
            <div className="bg-white rounded-2xl border border-slate-200 px-4 sm:px-5 py-3.5 flex items-center justify-between text-xs font-semibold shadow-xs">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                />
                <span className="text-slate-800 font-bold hover:text-indigo-600 transition-colors">
                  Chọn tất cả ({items.length} sản phẩm)
                </span>
              </label>

              <div className="hidden sm:flex items-center gap-8 md:gap-12 text-slate-500 font-semibold">
                <span className="w-24 text-center">Số lượng</span>
                <span className="w-24 text-right">Thành tiền</span>
                <span className="w-6"></span>
              </div>
            </div>

            {/* Danh sách các sản phẩm */}
            <div className="space-y-3">
              {cartDetails.map(({ productId, quantity, product, unitPrice, totalPrice, isSelected }) => (
                <div
                  key={productId}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border transition-all ${
                    isSelected
                      ? 'border-indigo-200 shadow-sm ring-1 ring-indigo-50'
                      : 'border-slate-200 shadow-xs hover:border-slate-300 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectItem(productId)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer shrink-0"
                    />
                    <Link href={`/products/${product?.slug || ''}`} className="shrink-0">
                      <img
                        src={product?.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                        alt={product?.name || 'Product'}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-slate-100 border border-slate-200 hover:opacity-90 transition-opacity"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/products/${product?.slug || ''}`}
                        className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors"
                        title={product?.name}
                      >
                        {product?.name || 'Đang tải...'}
                      </Link>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs text-indigo-600 font-mono font-semibold">
                          ${unitPrice.toFixed(2)}
                        </span>
                        {product?.discountPrice && product?.price && (
                          <span className="text-[11px] text-slate-400 line-through font-mono">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Control, Subtotal, Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 md:gap-12 shrink-0 pl-7 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    {/* Quantity Control */}
                    <div className="w-24 flex justify-center">
                      <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(productId, quantity - 1)}
                          className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-200 cursor-pointer transition-colors"
                          title="Giảm số lượng"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-slate-800 w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(productId, quantity + 1)}
                          className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-200 cursor-pointer transition-colors"
                          title="Tăng số lượng"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="w-24 text-right">
                      <span className="text-sm font-extrabold text-red-600 font-mono">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Trash */}
                    <div className="w-6 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(productId);
                          setSelectedIds((prev) => prev.filter((id) => id !== productId));
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa sản phẩm này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md h-fit space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-200">
              Tóm tắt đơn hàng
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Đã chọn:</span>
                <span className="font-semibold text-slate-800">
                  {selectedDetails.length} sản phẩm ({selectedCount} món)
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính:</span>
                <span className="font-mono font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Phí vận chuyển:</span>
                <span className="font-mono font-semibold text-slate-800">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                <span>Tổng tiền:</span>
                <span className="font-mono text-emerald-600">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {selectedDetails.length === 0 ? (
              <button
                disabled
                className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-400 font-semibold text-xs cursor-not-allowed border border-slate-200 text-center"
              >
                Vui lòng chọn sản phẩm để thanh toán
              </button>
            ) : (
              <Link
                href={`/checkout?items=${selectedIds.join(',')}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                Thanh toán ({selectedDetails.length}) <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

