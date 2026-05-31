import { Hero } from "@/components/hero/Hero";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { KitsPreview } from "@/components/kits/KitsPreview";
import { BenefitsSection } from "@/components/hero/BenefitsSection";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getData() {
  const [categories, featuredProducts, kits] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: true } } },
    }),
    prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: { category: true, inventory: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.kit.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        kitProducts: { include: { product: true }, take: 3 },
      },
      take: 3,
    }),
  ]);

  return { categories, featuredProducts, kits };
}

export default async function HomePage() {
  const { categories, featuredProducts, kits } = await getData();

  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <KitsPreview kits={kits} />
      <BenefitsSection />
    </>
  );
}
