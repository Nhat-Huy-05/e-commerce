import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { CreateOrderSchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('user_id')?.value;

    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }

    const orders = await db.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: true },
        },
        user: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateOrderSchema.parse(body);

    // 1. Fetch products to get current prices and check stock
    const productIds = validated.items.map((i) => i.productId);
    const dbProducts = await db.product.findMany({
      where: { id: { in: productIds } },
    });

    if (dbProducts.length !== validated.items.length) {
      return NextResponse.json(
        { error: 'One or more products in cart were not found' },
        { status: 400 }
      );
    }

    let totalAmount = 0;
    const orderItemData: Array<{ productId: string; quantity: number; price: number }> = [];

    for (const item of validated.items) {
      const prod = dbProducts.find((p) => p.id === item.productId)!;
      if (prod.stock < item.quantity) {
        return NextResponse.json(
          { error: `Product "${prod.name}" has insufficient stock.` },
          { status: 400 }
        );
      }
      const unitPrice = prod.discountPrice ?? prod.price;
      totalAmount += unitPrice * item.quantity;

      orderItemData.push({
        productId: prod.id,
        quantity: item.quantity,
        price: unitPrice,
      });
    }

    // 2. Find or fallback default user
    let userId = validated.userId;
    if (!userId) {
      const defaultUser = await db.user.findFirst();
      userId = defaultUser?.id || 'guest';
    }

    // 3. Create Order & OrderItems in transaction, and update stock
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    const order = await db.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: userId!,
          shippingName: validated.shippingName,
          shippingEmail: validated.shippingEmail,
          shippingPhone: validated.shippingPhone,
          shippingAddress: validated.shippingAddress,
          shippingCity: validated.shippingCity,
          shippingCountry: validated.shippingCountry,
          shippingZipCode: validated.shippingZipCode,
          paymentMethod: validated.paymentMethod,
          total: totalAmount,
          status: 'pending',
          notes: validated.notes,
          items: {
            create: orderItemData,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Deduct stock
      for (const item of validated.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to place order' },
      { status: 400 }
    );
  }
}
