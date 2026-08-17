'use client';

import { Category, ProductWithCategory } from '@/lib/types';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface ProductFormProps {
  initialData?: ProductWithCategory | null;
  categories: Category[];
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    longDescription: initialData?.longDescription || '',
    price: initialData?.price ? String(initialData.price) : '',
    discountPrice: initialData?.discountPrice ? String(initialData.discountPrice) : '',
    stock: initialData?.stock !== undefined ? String(initialData.stock) : '50',
    categoryId: initialData?.categoryId || (categories[0]?.id ?? ''),
    thumbnail: initialData?.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    images: initialData?.images
      ? JSON.parse(initialData.images).join(', ')
      : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    isFeatured: initialData?.isFeatured ?? false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, name, slug: initialData ? formData.slug : slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const normalizeUrl = (url: string) => {
        const trimmed = url.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
          return trimmed;
        }
        return `/${trimmed}`;
      };

      const normalizedThumbnail = normalizeUrl(formData.thumbnail);
      let imagesArray = formData.images
        .split(',')
        .map((s: string) => normalizeUrl(s))
        .filter((s: string) => s.length > 0);

      if (imagesArray.length === 0 && normalizedThumbnail) {
        imagesArray = [normalizedThumbnail];
      }

      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        longDescription: formData.longDescription || undefined,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        stock: parseInt(formData.stock, 10),
        categoryId: formData.categoryId,
        thumbnail: normalizedThumbnail,
        images: imagesArray,
        isFeatured: formData.isFeatured,
      };

      const url = initialData
        ? `/api/products/${initialData.id}`
        : '/api/products';
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred while saving');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
          ⚠️ {errorMsg}
        </div>
      )}

      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Chỉnh sửa / Thêm Sản phẩm</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Slug URL</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Danh mục</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Giá bán ($)
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Giá khuyến mãi ($ - Không bắt buộc)
            </label>
            <input
              type="number"
              step="0.01"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Số lượng tồn kho
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-6">
            <label className="relative flex items-center gap-2 text-slate-200 font-semibold cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-indigo-600"
              />
              Sản phẩm Nổi bật (Featured)
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">
              Mô tả ngắn
            </label>
            <textarea
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">
              Mô tả chi tiết (Long Description)
            </label>
            <textarea
              name="longDescription"
              rows={4}
              value={formData.longDescription}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">
              URL Ảnh đại diện (Thumbnail)
            </label>
            <input
              type="text"
              name="thumbnail"
              placeholder="https://..."
              value={formData.thumbnail}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">
              Danh sách Ảnh sản phẩm
            </label>
            <input
              type="text"
              name="images"
              placeholder="https://..."
              value={formData.images}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {submitting ? 'Đang lưu...' : initialData ? 'Cập nhật Sản phẩm' : 'Tạo mới Sản phẩm'}
        </button>
      </div>
    </form>
  );
}
