export const dynamic = "force-dynamic";
import { Hero } from "@/components/hero/Hero";
import { TropicalStrip } from "@/components/hero/TropicalStrip";
import { TrustMarquee } from "@/components/hero/TrustMarquee";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { KitsPreview } from "@/components/kits/KitsPreview";
import { BenefitsSection } from "@/components/hero/BenefitsSection";
import { CatalogSection } from "@/components/products/CatalogSection";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getData() {
  const [categories, featuredProducts, kits, allProducts] = await Promise.all([
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
      include: { kitProducts: { include: { product: true }, take: 3 } },
      take: 3,
    }),
    prisma.product.findMany({
      where: { isActive: true },
      include: { category: true, inventory: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return { categories, featuredProducts, kits, allProducts };
}

export default async function HomePage() {
  const { categories, featuredProducts, kits, allProducts } = await getData();

  return (
    <>
      <Hero />
      <TropicalStrip />
      <TrustMarquee />
      <CatalogSection categories={categories} allProducts={allProducts} />
      <FeaturedProducts products={featuredProducts} />
      <KitsPreview kits={kits} />
      <BenefitsSection />
    </>
  );
}
