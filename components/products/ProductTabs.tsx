'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/store';
import { ProductWithCategory } from '@/lib/types';
import { FileText, Sliders, ShieldCheck, Check } from 'lucide-react';

interface ProductTabsProps {
  product: ProductWithCategory & {
    longDescription?: string | null;
  };
}

export function ProductTabs({ product }: ProductTabsProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'policy'>('desc');

  const tabs = [
    {
      id: 'desc' as const,
      label: language === 'vi' ? 'Mô tả chi tiết' : 'Description',
      icon: FileText,
    },
    {
      id: 'specs' as const,
      label: language === 'vi' ? 'Thông số kỹ thuật' : 'Specifications',
      icon: Sliders,
    },
    {
      id: 'policy' as const,
      label: language === 'vi' ? 'Chính sách mua hàng' : 'Store Policies',
      icon: ShieldCheck,
    },
  ];

  const specsList = [
    {
      label: language === 'vi' ? 'Danh mục' : 'Category',
      value: product.category?.name || 'Electronics',
    },
    {
      label: language === 'vi' ? 'Mã sản phẩm' : 'Product Code',
      value: `SP-${product.id.slice(-6).toUpperCase()}`,
    },
    {
      label: language === 'vi' ? 'Tình trạng tồn kho' : 'Stock Status',
      value:
        product.stock > 0
          ? language === 'vi'
            ? `Còn hàng (${product.stock} sản phẩm)`
            : `In stock (${product.stock} items)`
          : language === 'vi'
            ? 'Tạm hết hàng'
            : 'Out of stock',
    },
    {
      label: language === 'vi' ? 'Thời hạn bảo hành' : 'Warranty',
      value: language === 'vi' ? '12 tháng chính hãng (1 đổi 1)' : '12 months official (1-to-1 replacement)',
    },
    {
      label: language === 'vi' ? 'Phương thức giao hàng' : 'Shipping Method',
      value: language === 'vi' ? 'Giao hàng hỏa tốc 24h & Toàn quốc' : 'Express 24h & Nationwide delivery',
    },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
      {/* Tab Buttons */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {activeTab === 'desc' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-base font-bold text-slate-900">
              {language === 'vi' ? 'Tổng quan về sản phẩm' : 'Product Overview'}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {product.longDescription || product.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">
                  {language === 'vi'
                    ? 'Được kiểm tra chất lượng nghiêm ngặt trước khi đóng gói xuất xưởng.'
                    : 'Strict quality control before official dispatch.'}
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">
                  {language === 'vi'
                    ? 'Nguyên seal, đầy đủ phụ kiện và tài liệu hướng dẫn sử dụng.'
                    : 'Brand new, sealed box with complete accessories and manual.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-2xl">
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {specsList.map((spec, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-3 p-3.5 text-xs sm:text-sm ${
                    idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'
                  }`}
                >
                  <span className="font-semibold text-slate-500">{spec.label}</span>
                  <span className="col-span-2 font-medium text-slate-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'policy' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {language === 'vi' ? 'Chính sách vận chuyển' : 'Shipping Policy'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'vi'
                  ? 'Miễn phí giao hàng toàn quốc cho mọi đơn từ 500k. Đơn hàng nội thành giao hỏa tốc trong 2-4 giờ.'
                  : 'Free shipping on orders over 500k. Urban area delivery in 2-4 hours.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {language === 'vi' ? 'Bảo hành chính hãng' : 'Warranty Policy'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'vi'
                  ? 'Bảo hành 12 tháng tại các trung tâm bảo hành ủy quyền. Lỗi kỹ thuật từ nhà sản xuất được 1 đổi 1 trong 30 ngày.'
                  : '12 months warranty at authorized service centers. 1-to-1 replacement for factory defects.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {language === 'vi' ? 'Thanh toán & Hóa đơn' : 'Payment & Invoicing'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'vi'
                  ? 'Hỗ trợ thẻ ngân hàng, quét mã QR SePay tự động và COD. Xuất hóa đơn VAT điện tử ngay khi đơn hàng giao thành công.'
                  : 'Supports credit cards, automatic SePay QR transfer, and COD. Electronic VAT invoice provided.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

