import { Prisma, Product as PrismaProduct, Category as PrismaCategory, Order as PrismaOrder, OrderItem as PrismaOrderItem, Review as PrismaReview, User as PrismaUser } from '@prisma/client';

export type Product = PrismaProduct;
export type Category = PrismaCategory;
export type Order = PrismaOrder;
export type OrderItem = PrismaOrderItem;
export type Review = PrismaReview;
export type User = PrismaUser;

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: { category: true; reviews: true };
}>;

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
    user: true;
  };
}>;

export interface CartItem {
  productId: string;
  quantity: number;
}
