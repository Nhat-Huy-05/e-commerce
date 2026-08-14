import { ProductForm } from '@/components/admin/ProductForm';
import { db } from '@/lib/db';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await db.category.findMany({});

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900">Thêm Sản phẩm Mới</h1>
        <p className="text-xs text-slate-400 mt-1">
          Điền đầy đủ thông tin chi tiết sản phẩm để đăng bán lên website
        </p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
