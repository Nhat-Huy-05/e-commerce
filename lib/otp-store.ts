interface OtpEntry {
  otp: string;
  expiresAt: number;
}

const globalForOtp = globalThis as unknown as {
  otpStore: Map<string, OtpEntry> | undefined;
};

export const otpStore = globalForOtp.otpStore ?? new Map<string, OtpEntry>();

if (process.env.NODE_ENV !== 'production') {
  globalForOtp.otpStore = otpStore;
}

export function saveOtp(email: string, otp: string) {
  const normalizedEmail = email.toLowerCase().trim();
  // OTP valid for 10 minutes
  const expiresAt = Date.now() + 10 * 60 * 1000;
  otpStore.set(normalizedEmail, { otp, expiresAt });
}

export function verifyOtp(email: string, otp: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  const entry = otpStore.get(normalizedEmail);
  
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(normalizedEmail);
    return false;
  }
  
  if (entry.otp === otp.trim()) {
    otpStore.delete(normalizedEmail);
    return true;
  }
  
  return false;
}
