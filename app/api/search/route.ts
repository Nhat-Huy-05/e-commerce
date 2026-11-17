import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const searchProducts = unstable_cache(
  async (query: string) => {
    return db.product.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: {
        category: true,
      },
      take: 20,
    });
  },
  ['search-products'],
  { revalidate: 60, tags: ['products'] }
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('q') || '').trim();

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await searchProducts(query);

    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to execute search' },
      { status: 500 }
    );
  }
}
