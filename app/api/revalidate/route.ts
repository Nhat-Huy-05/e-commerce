import { NextResponse } from 'next/server';

// Shopify webhook endpoint removed — project uses Prisma/SQLite (no external CMS)
export async function POST() {
  return NextResponse.json({ message: 'Not implemented' }, { status: 405 });
}
