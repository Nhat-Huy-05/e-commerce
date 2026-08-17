import { db } from '@/lib/db';
import { AdminNavBar } from '@/components/admin/AdminNavBar';
import { CustomerManagementClient, CustomerData } from '@/components/admin/CustomerManagementClient';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  const users = await db.user.findMany({
    where: {
      // Show customers (and any users who are not super admin)
      role: 'customer',
    },
    orderBy: { createdAt: 'desc' },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  thumbnail: true,
                  images: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // Serialize dates and JSON
  const serializedCustomers: CustomerData[] = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: (u as any).status || 'active',
    createdAt: u.createdAt.toISOString(),
    orders: u.orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      total: o.total,
      status: o.status,
      createdAt: o.createdAt.toISOString(),
      shippingName: o.shippingName,
      shippingEmail: o.shippingEmail,
      shippingPhone: o.shippingPhone,
      shippingAddress: o.shippingAddress,
      shippingCity: o.shippingCity,
      shippingCountry: o.shippingCountry,
      paymentMethod: o.paymentMethod,
      items: o.items.map((i) => ({
        id: i.id,
        quantity: i.quantity,
        price: i.price,
        product: {
          id: i.product.id,
          name: i.product.name,
          thumbnail: i.product.thumbnail,
          images: i.product.images,
        },
      })),
    })),
  }));

  return (
    <div className="space-y-6">
      <AdminNavBar />
      <CustomerManagementClient customers={serializedCustomers} />
    </div>
  );
}
