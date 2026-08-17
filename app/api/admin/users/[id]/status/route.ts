import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['active', 'banned'].includes(status)) {
      return NextResponse.json(
        { error: 'Trạng thái không hợp lệ. Chỉ chấp nhận active hoặc banned.' },
        { status: 400 }
      );
    }

    const targetUser = await db.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'Không tìm thấy người dùng này.' },
        { status: 404 }
      );
    }

    // Safety guard: cannot ban admin accounts
    if (targetUser.role === 'admin' && status === 'banned') {
      return NextResponse.json(
        { error: 'Không thể khóa tài khoản có quyền Quản trị viên (Admin).' },
        { status: 400 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message:
        status === 'banned'
          ? `Đã khóa tài khoản ${updatedUser.name} thành công.`
          : `Đã mở khóa tài khoản ${updatedUser.name} thành công.`,
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('Error updating user status:', error);
    return NextResponse.json(
      { error: error?.message || 'Không thể cập nhật trạng thái người dùng.' },
      { status: 500 }
    );
  }
}
