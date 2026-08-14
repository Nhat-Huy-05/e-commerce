import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { saveOtp } from '@/lib/otp-store';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Vui lòng nhập email hợp lệ' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists in database
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Không tìm thấy tài khoản với email này' },
        { status: 404 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to store
    saveOtp(normalizedEmail, otp);

    // In a production app, we would send this OTP via an Email service (Resend, Nodemailer, etc.)
    // For local development and demonstration, we return the generated OTP in the response payload.
    return NextResponse.json({
      message: `Mã OTP đã được gửi tới email ${normalizedEmail}`,
      otp: otp, // Demo/test OTP
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi gửi mã OTP' },
      { status: 500 }
    );
  }
}
