import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('[SePay Webhook] Received payload:', JSON.stringify(data, null, 2));

    const { content, code, transferType, transferAmount } = data;

    // Only handle incoming transfers (money received)
    if (transferType === 'in') {
      let matchedOrder = null;

      // 1. If SePay already extracted a payment code, look up the order directly
      if (code) {
        matchedOrder = await db.order.findFirst({
          where: { orderNumber: code },
        });
      }

      // 2. Fallback: search the transfer content for an unpaid order number
      if (!matchedOrder && content) {
        const unpaidOrders = await db.order.findMany({
          where: { paymentStatus: 'unpaid' },
          select: { id: true, orderNumber: true, total: true },
          take: 50,
          orderBy: { createdAt: 'desc' },
        });

        matchedOrder = unpaidOrders.find((order) =>
          content.toUpperCase().includes(order.orderNumber.toUpperCase())
        ) || null;
      }

      // 3. If a matching order is found, mark it as paid
      if (matchedOrder) {
        await db.order.update({
          where: { id: matchedOrder.id },
          data: {
            paymentStatus: 'paid',
            status: 'processing',
          },
        });
        console.log(`[SePay Webhook] Order ${matchedOrder.orderNumber} updated to paid.`);
      } else {
        console.log('[SePay Webhook] No matching unpaid order found for this transaction.');
      }
    }

    // Always return HTTP 200 with JSON so SePay knows the webhook was received
    return NextResponse.json({ success: true, message: 'Webhook received' }, { status: 200 });
  } catch (error) {
    console.error('[SePay Webhook Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}