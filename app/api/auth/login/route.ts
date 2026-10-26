import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Vui lòng nhập Email và Mật khẩu' },
        { status: 400 }
      );
    }

    const normalizedInput = email.toLowerCase().trim();

    // Find user by email or username
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: normalizedInput },
          { username: normalizedInput },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Tài khoản (Email/Tên người dùng) hoặc Mật khẩu không chính xác' },
        { status: 401 }
      );
    }

    // Verify password with bcrypt, with fallback for unhashed seed passwords
    const isPasswordValid =
      (await bcrypt.compare(password, user.password).catch(() => false)) ||
      user.password === password;

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Tài khoản (Email/Tên người dùng) hoặc Mật khẩu không chính xác' },
        { status: 401 }
      );
    }

    if (user.status === 'banned') {
      return NextResponse.json(
        {
          error:
            '⛔ Tài khoản của bạn đã bị khóa bởi Quản trị viên do vi phạm điều khoản. Vui lòng liên hệ Admin để được hỗ trợ.',
        },
        { status: 403 }
      );
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status || 'active',
    };

    const response = NextResponse.json({
      message: 'Đăng nhập thành công',
      user: userPayload,
    });

    // Set cookie for server-side auth checking
    response.cookies.set('user_role', user.role, {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set('user_id', user.id, {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error?.message || 'Đã có lỗi xảy ra khi đăng ký/đăng nhập' },
      { status: 500 }
    );
  }
}
