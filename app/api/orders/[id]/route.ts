import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await db.order.findUnique({
      where: { id },
      select: {
        id: true,
        orderNumber: true,
        paymentStatus: true,
        status: true,
        total: true,
        paymentMethod: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error fetching order payment status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

