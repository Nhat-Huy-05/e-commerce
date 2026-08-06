import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Đã đăng xuất' });
  response.cookies.delete('user_role');
  response.cookies.delete('user_id');
  return response;
}
