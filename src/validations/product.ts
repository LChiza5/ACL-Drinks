import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Nombre requerido").max(200),
  slug: z.string().min(2).max(200).optional(),
  description: z.string().max(5000).optional(),
  price: z.number().positive("El precio debe ser mayor a 0"),
  comparePrice: z.number().positive().optional().nullable(),
  images: z.array(z.string().url()).min(1, "Al menos una imagen requerida"),
  categoryId: z.string().min(1, "Categoría requerida"),
  brand: z.string().max(100).optional(),
  alcoholContent: z.number().min(0).max(100).optional().nullable(),
  volume: z.string().max(50).optional(),
  country: z.string().max(100).optional(),
  sku: z.string().max(100).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isOnSale: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  stock: z.number().int().min(0).default(0),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Nombre requerido").max(100),
  slug: z.string().optional(),
  description: z.string().max(500).optional(),
  image: z.string().url().optional(),
  emoji: z.string().max(4).optional(),
  color: z.string().max(20).optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const productFiltersSchema = z.object({
  categoryId: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  search: z.string().max(100).optional(),
  brand: z.string().optional(),
  isNew: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  sortBy: z.enum(["price_asc", "price_desc", "newest", "name_asc"]).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(12),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type ProductFiltersInput = z.infer<typeof productFiltersSchema>;
