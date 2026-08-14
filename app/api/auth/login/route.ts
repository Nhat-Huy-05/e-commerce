import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

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

    let user: any = await db.user.findUnique({
      where: { email: normalizedInput },
    });

    if (!user) {
      try {
        const users: any[] = await db.$queryRaw`SELECT * FROM User WHERE LOWER(username) = ${normalizedInput} LIMIT 1`;
        if (users && users.length > 0) {
          user = users[0];
        }
      } catch (err) {
        console.warn('Username query error:', err);
      }
    }

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Tài khoản (Email/Tên người dùng) hoặc Mật khẩu không chính xác' },
        { status: 401 }
      );
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
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
