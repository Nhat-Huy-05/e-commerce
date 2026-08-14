import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const userRole = request.cookies.get('user_role')?.value;
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      todayOrders,
      monthOrders,
      recentOrders,
      lowStockProducts,
    ] = await Promise.all([
      db.product.count(),
      db.order.count(),
      db.user.count({ where: { role: 'customer' } }),
      db.order.aggregate({
        _sum: { total: true },
        where: { createdAt: { gte: startOfToday } },
      }),
      db.order.aggregate({
        _sum: { total: true },
        where: { createdAt: { gte: startOfMonth } },
      }),
      db.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true, id: true } },
          items: {
            include: {
              product: { select: { id: true, name: true, price: true, discountPrice: true, images: true } },
            },
          },
        },
      }),
      db.product.count({ where: { stock: { lte: 5 } } }),
    ]);

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalCustomers,
      revenueToday: todayOrders._sum.total ?? 0,
      revenueMonth: monthOrders._sum.total ?? 0,
      lowStockProducts,
      recentOrders,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
