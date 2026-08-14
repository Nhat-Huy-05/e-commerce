import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyOtp } from '@/lib/otp-store';

export async function POST(request: NextRequest) {
  try {
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp đầy đủ Email, mã OTP và mật khẩu mới' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu mới phải có ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verify OTP
    const isValidOtp = verifyOtp(normalizedEmail, otp);
    if (!isValidOtp) {
      return NextResponse.json(
        { error: 'Mã OTP không chính xác hoặc đã hết hạn' },
        { status: 400 }
      );
    }

    // Update user password in database
    await db.user.update({
      where: { email: normalizedEmail },
      data: { password: newPassword },
    });

    return NextResponse.json({
      message: 'Đổi mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi đặt lại mật khẩu' },
      { status: 500 }
    );
  }
}
