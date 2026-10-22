import { db } from '@/lib/db';
import { baseUrl } from 'lib/utils';
import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    { url: `${baseUrl}/stores`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
  ];

  const products = await db.product.findMany({ select: { slug: true, updatedAt: true } });
  const productRoutes: MetadataRoute.Sitemap = products.map((p: { slug: string; updatedAt: Date }) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  return [...staticRoutes, ...productRoutes];
}
