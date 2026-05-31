import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.category.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/kits`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/offers`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/tracking`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/categories/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
