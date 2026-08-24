import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(255),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
  discountPrice: z.number().nullable().optional(),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  categoryId: z.string().min(1, 'Category is required'),
  images: z.array(z.string().min(1, 'Image path/URL is required')).min(1, 'At least one image is required'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  isFeatured: z.boolean().default(false),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const CreateOrderSchema = z.object({
  userId: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'Cart cannot be empty'),
  shippingName: z.string().min(1, 'Name is required'),
  shippingEmail: z.string().email('Invalid email address'),
  shippingPhone: z.string().min(8, 'Phone number must be at least 8 digits'),
  shippingAddress: z.string().min(1, 'Shipping address is required'),
  shippingCity: z.string().min(1, 'City is required'),
  shippingCountry: z.string().min(1, 'Country is required'),
  shippingZipCode: z.string().optional().default(''),
  paymentMethod: z.enum(['credit_card', 'bank_transfer', 'cash']).default('credit_card'),
  notes: z.string().optional(),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  image: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
