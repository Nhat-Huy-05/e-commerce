import { db } from '@/lib/db';

export async function saveOtp(email: string, otp: string): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Delete any existing OTPs for this email to avoid duplicates
  try {
    await db.otpToken.deleteMany({
      where: { email: normalizedEmail },
    });
  } catch (error) {
    console.warn('Error clearing old OTPs:', error);
  }

  // Create new OTP record
  await db.otpToken.create({
    data: {
      email: normalizedEmail,
      otp: otp.trim(),
      expiresAt,
    },
  });
}

export async function verifyOtp(email: string, otp: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  const trimmedOtp = otp.trim();

  try {
    const record = await db.otpToken.findFirst({
      where: {
        email: normalizedEmail,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!record) return false;

    // Check expiration
    if (new Date() > record.expiresAt) {
      await db.otpToken.deleteMany({
        where: { email: normalizedEmail },
      });
      return false;
    }

    if (record.otp === trimmedOtp) {
      // Consume OTP so it cannot be reused
      await db.otpToken.deleteMany({
        where: { email: normalizedEmail },
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error('Verify OTP error:', error);
    return false;
  }
}
