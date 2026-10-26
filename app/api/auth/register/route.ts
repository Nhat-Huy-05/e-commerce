import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { name, username, email, password, confirmPassword } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu' },
        { status: 400 }
      );
    }

    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Mật khẩu và Mật khẩu xác nhận không khớp' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = username ? username.toLowerCase().trim() : null;

    if (cleanUsername) {
      // Validate username pattern (only letters, numbers, underscore; length 3-20)
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(cleanUsername)) {
        return NextResponse.json(
          { error: 'Tên người dùng (username) chỉ gồm 3-20 ký tự chữ cái, số hoặc dấu gạch dưới, không dấu và không khoảng trắng' },
          { status: 400 }
        );
      }

      const existingUserByUsername = await db.user.findFirst({
        where: { username: cleanUsername },
      });

      if (existingUserByUsername) {
        return NextResponse.json(
          { error: `Tên người dùng "${cleanUsername}" đã được sử dụng. Vui lòng chọn tên khác!` },
          { status: 400 }
        );
      }
    }

    const existingEmail = await db.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Địa chỉ Email này đã được đăng ký tài khoản' },
        { status: 400 }
      );
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name: name.trim(),
        username: cleanUsername,
        email: cleanEmail,
        password: hashedPassword,
        role: 'customer',
      },
    });

    const userPayload = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      name: newUser.name,
      role: newUser.role,
    };

    const response = NextResponse.json(
      { message: 'Đăng ký tài khoản thành công', user: userPayload },
      { status: 201 }
    );

    response.cookies.set('user_role', newUser.role, {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set('user_id', newUser.id, {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra khi đăng ký tài khoản' },
      { status: 500 }
    );
  }
}
