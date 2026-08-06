import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { UpdateProductSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = UpdateProductSchema.parse(body);

    const dataToUpdate: any = { ...validatedData };
    if (validatedData.images) {
      dataToUpdate.images = JSON.stringify(validatedData.images);
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: dataToUpdate,
      include: {
        category: true,
      },
    });

    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${updatedProduct.slug}`);

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to update product' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const product = await db.product.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${product.slug}`);

    return NextResponse.json({ message: 'Product deleted successfully', product });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
