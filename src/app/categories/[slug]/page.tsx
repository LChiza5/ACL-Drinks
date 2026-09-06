export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MagnifyingGlass as PackageSearch, Wine } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({ where: { slug } });
  return { title: cat ? `${cat.name} - Licores` : "Categoría" };
}
export const revalidate = 60;

async function CategoryProducts({ categoryId }: { categoryId: string }) {
  const products = await prisma.product.findMany({
    where: { categoryId, isActive: true },
    include: { category: true, inventory: true },
    orderBy: { createdAt: "desc" },
  });

  if (products.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="Sin productos en esta categoría"
        description="Pronto vamos a sumar más opciones acá."
        actionLabel="Ver todo el catálogo"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((p, i) => <ProductCard key={p.id} product={p as never} index={i} />)}
    </div>
  );
}

function CategoryProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-sm" />
      ))}
    </div>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug, isActive: true },
    include: { _count: { select: { products: true } } },
  });
  if (!category) notFound();

  return (
    <div className="section-padding container-max">
      <div className="flex items-center gap-4 mb-8">
        {category.emoji ? (
          <span className="text-5xl">{category.emoji}</span>
        ) : (
          <Wine size={40} weight="duotone" color="#22B14C" />
        )}
        <div>
          <h1 className="text-4xl font-black text-white">{category.name}</h1>
          {category.description && <p className="text-muted-foreground mt-1">{category.description}</p>}
          <p className="text-sm text-emerald-500 mt-1">{category._count.products} productos</p>
        </div>
      </div>
      <Suspense fallback={<CategoryProductsSkeleton />}>
        <CategoryProducts categoryId={category.id} />
      </Suspense>
    </div>
  );
}
