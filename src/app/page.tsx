export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { Hero } from "@/components/hero/Hero";
import { TropicalStrip } from "@/components/hero/TropicalStrip";
import { TrustMarquee } from "@/components/hero/TrustMarquee";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { KitsPreview } from "@/components/kits/KitsPreview";
import { BenefitsSection } from "@/components/hero/BenefitsSection";
import { CatalogSection } from "@/components/products/CatalogSection";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

// Hero/TrustMarquee/BenefitsSection have no data dependency, so they no longer
// wait on the DB round-trip below - each data section fetches independently
// and streams in via Suspense instead of one shared await blocking the whole
// page (that was adding ~3s of TTFB directly to the Hero's LCP, confirmed via
// Lighthouse's lcp-breakdown-insight on a prior audit pass).

async function CatalogSectionData() {
  const [categories, allProducts] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: true } } },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      include: { category: true, inventory: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);
  return <CatalogSection categories={categories} allProducts={allProducts} />;
}

async function FeaturedProductsData() {
  const featuredProducts = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: { category: true, inventory: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });
  return <FeaturedProducts products={featuredProducts} />;
}

async function KitsPreviewData() {
  const kits = await prisma.kit.findMany({
    where: { isActive: true, isFeatured: true },
    include: { kitProducts: { include: { product: true }, take: 3 } },
    take: 3,
  });
  return <KitsPreview kits={kits} />;
}

function SectionSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="section-padding container-max">
      <Skeleton className="h-8 w-56 mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-sm" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TropicalStrip />
      <TrustMarquee />
      <Suspense fallback={<SectionSkeleton rows={5} />}>
        <CatalogSectionData />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedProductsData />
      </Suspense>
      <Suspense fallback={<SectionSkeleton rows={3} />}>
        <KitsPreviewData />
      </Suspense>
      <BenefitsSection />
    </>
  );
}
