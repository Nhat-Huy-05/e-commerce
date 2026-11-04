'use client';

import { Category, ProductWithCategory } from '@/lib/types';
import {
  ArrowLeft,
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  Star,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

interface ProductFormProps {
  initialData?: ProductWithCategory | null;
  categories: Category[];
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [manualUrl, setManualUrl] = useState('');

  // Extract initial image list if available
  const getInitialImages = (): string[] => {
    let list: string[] = [];
    if (initialData?.images) {
      try {
        const parsed =
          typeof initialData.images === 'string'
            ? JSON.parse(initialData.images)
            : initialData.images;
        if (Array.isArray(parsed)) {
          list = parsed.filter(
            (item): item is string => typeof item === 'string' && item.trim().length > 0
          );
        }
      } catch {
        list = [];
      }
    }
    if (initialData?.thumbnail && !list.includes(initialData.thumbnail)) {
      list = [initialData.thumbnail, ...list];
    }
    return list;
  };

  const [imageList, setImageList] = useState<string[]>(getInitialImages);
  const [thumbnail, setThumbnail] = useState<string>(
    initialData?.thumbnail || getInitialImages()[0] || ''
  );

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    longDescription: initialData?.longDescription || '',
    price: initialData?.price ? String(initialData.price) : '',
    discountPrice: initialData?.discountPrice ? String(initialData.discountPrice) : '',
    stock: initialData?.stock !== undefined ? String(initialData.stock) : '50',
    categoryId: initialData?.categoryId || (categories[0]?.id ?? ''),
    isFeatured: initialData?.isFeatured ?? false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
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

  // Upload multiple images to Vercel Blob via /api/upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setErrorMsg('');

    try {
      const uploadFormData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if (f) uploadFormData.append('files', f);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Tải ảnh lên thất bại');
      }

      const newUrls: string[] = data.urls || (data.url ? [data.url] : []);
      if (newUrls.length > 0) {
        setImageList((prev) => {
          const combined = [...prev, ...newUrls];
          if (!thumbnail && combined[0]) {
            setThumbnail(combined[0]);
          }
          return combined;
        });
        if (!thumbnail && newUrls[0]) {
          setThumbnail(newUrls[0]);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi khi tải ảnh lên máy chủ Vercel Blob');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Remove image from list
  const handleRemoveImage = (indexToRemove: number) => {
    const targetUrl = imageList[indexToRemove];
    const nextList = imageList.filter((_, idx) => idx !== indexToRemove);
    setImageList(nextList);
    if (thumbnail === targetUrl) {
      setThumbnail(nextList[0] || '');
    }
  };

  // Add manual image URL if needed
  const handleAddManualUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = manualUrl.trim();
    if (!trimmed) return;
    if (!imageList.includes(trimmed)) {
      const nextList = [...imageList, trimmed];
      setImageList(nextList);
      if (!thumbnail) setThumbnail(trimmed);
    }
    setManualUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const fallbackThumbnail =
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
      const finalThumbnail = thumbnail || imageList[0] || fallbackThumbnail;
      let finalImages = imageList.length > 0 ? imageList : [finalThumbnail];
      if (!finalImages.includes(finalThumbnail)) {
        finalImages = [finalThumbnail, ...finalImages];
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
        thumbnail: finalThumbnail,
        images: finalImages,
        isFeatured: formData.isFeatured,
      };

      const url = initialData ? `/api/products/${initialData.id}` : '/api/products';
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-4">
        <h2 className="text-sm font-bold text-white mb-4">Thông tin cơ bản</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
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
            <label className="block text-slate-300 font-semibold mb-1">
              Đường dẫn (Slug)
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Danh mục</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Giá niêm yết (VNĐ)
            </label>
            <input
              type="number"
              step="1000" placeholder="VD: 15000000"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Giá khuyến mãi (VNĐ) - Để trống nếu không giảm
            </label>
            <input
              type="number"
              step="1000" placeholder="VD: 12500000"
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
            <label className="block text-slate-300 font-semibold mb-1">Mô tả ngắn</label>
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

          {/* Product Images Management (Vercel Blob Upload) */}
          <div className="sm:col-span-2 space-y-3 pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-slate-200 font-bold text-sm">
                  Hình ảnh sản phẩm
                </label>
                <p className="text-[11px] text-slate-400">
                  Tải ảnh trực tiếp lên Vercel Blob hoặc dán URL. Bấm vào ảnh để đặt làm Ảnh chính.
                </p>
              </div>

              {/* Upload Button */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="admin-product-file-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="admin-product-file-upload"
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-xs ${uploading
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Đang tải lên Vercel...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" /> Tải ảnh từ máy tính (Vercel Blob)
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Uploaded Images Preview Grid */}
            {imageList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {imageList.map((url, idx) => {
                  const isPrimary = thumbnail === url;
                  return (
                    <div
                      key={idx}
                      className={`group relative rounded-xl overflow-hidden border bg-slate-950 aspect-square flex flex-col justify-between transition-all ${isPrimary
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'border-slate-800 hover:border-slate-700'
                        }`}
                    >
                      <img
                        src={url}
                        alt={`Ảnh sản phẩm ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {/* Primary thumbnail badge */}
                      <div className="absolute top-2 left-2 z-10">
                        {isPrimary ? (
                          <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                            <Star className="w-3 h-3 fill-white" /> Ảnh chính
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setThumbnail(url)}
                            className="bg-slate-900/80 hover:bg-indigo-600 text-slate-200 hover:text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-xs transition-colors"
                          >
                            Đặt làm ảnh chính
                          </button>
                        )}
                      </div>

                      {/* Delete image button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-md"
                        title="Xoá ảnh này"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/50 text-slate-500 space-y-1">
                <ImageIcon className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                <p className="font-semibold text-slate-400">Chưa có ảnh nào được thêm</p>
                <p className="text-[11px]">Bấm nút &quot;Tải ảnh từ máy tính&quot; ở trên để chọn ảnh sản phẩm.</p>
              </div>
            )}

            {/* Fallback manual URL input */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Hoặc dán URL ảnh ngoài (https://...)"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 text-[11px] focus:outline-none focus:border-indigo-500 font-mono"
              />
              <button
                type="button"
                onClick={handleAddManualUrl}
                disabled={!manualUrl.trim()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold disabled:opacity-50 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm URL
              </button>
            </div>
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
