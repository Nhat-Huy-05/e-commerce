import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

// Max file size: 4.5MB (standard Vercel Serverless Function payload limit)
const MAX_FILE_SIZE = 4.5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

export async function POST(request: NextRequest) {
  try {
    const userRole = request.cookies.get('user_role')?.value;
    if (userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Chỉ Quản trị viên (Admin) mới có quyền tải ảnh lên.' },
        { status: 403 }
      );
    }

    const formData = await request.formData();

    let files = formData.getAll('files') as File[];
    if (!files || files.length === 0) {
      const singleFile = formData.get('file') as File | null;
      if (singleFile) {
        files = [singleFile];
      }
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng chọn ít nhất 1 file ảnh hợp lệ.' },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Định dạng "${file.name}" không hợp lệ. Chỉ chấp nhận JPG, PNG, WEBP, GIF, SVG.`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: `File "${file.name}" quá lớn (${(file.size / (1024 * 1024)).toFixed(1)}MB). Giới hạn tối đa là 4.5MB.`,
          },
          { status: 400 }
        );
      }
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const pathname = `products/${Date.now()}-${safeName}`;

      const blob = await put(pathname, file, {
        access: 'public',
      });

      uploadedUrls.push(blob.url);
    }

    return NextResponse.json({
      success: true,
      message: `Đã tải lên ${uploadedUrls.length} ảnh thành công!`,
      urls: uploadedUrls,
      url: uploadedUrls[0],
    });
  } catch (error: any) {
    console.error('Error uploading to Vercel Blob:', error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          'Đã có lỗi xảy ra khi tải ảnh lên máy chủ Vercel Blob.',
      },
      { status: 500 }
    );
  }
}

