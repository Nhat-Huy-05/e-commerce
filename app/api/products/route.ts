import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { CreateProductSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const featured = searchParams.get('featured') === 'true';

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-asc') orderBy = { price: 'asc' };
    if (sort === 'price-desc') orderBy = { price: 'desc' };
    if (sort === 'rating') orderBy = { rating: 'desc' };

    const where: any = {};
    if (category) where.category = { slug: category };
    if (featured) where.isFeatured = true;

    const products = await db.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateProductSchema.parse(body);

    const product = await db.product.create({
      data: {
        ...validatedData,
        images: JSON.stringify(validatedData.images),
      },
      include: {
        category: true,
      },
    });

    // Revalidate relevant static pages (ISR / SSG)
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${product.slug}`);

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create product' },
      { status: 400 }
    );
  }
}
