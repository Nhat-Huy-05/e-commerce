'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${productName}" không?`)) {
      return;
    }
    setDeleting(true);

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Xóa thất bại');
      }
      router.refresh();
    } catch (err) {
      alert('Không thể xóa sản phẩm.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors disabled:opacity-50"
      title="Xóa sản phẩm"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
