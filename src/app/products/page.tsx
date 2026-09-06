export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Suspense } from "react";
import { MagnifyingGlass as PackageSearch, Wine } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export const metadata: Metadata = { title: "Productos" };
export const revalidate = 60;

type ProductsSearchParams = { categoryId?: string; search?: string; page?: string };

async function ProductsResults({ searchParams }: { searchParams: Promise<ProductsSearchParams> }) {
  const { categoryId, search, page: pageStr } = await searchParams;
  const page = parseInt(pageStr || "1");
  const where = {
    isActive: true,
    ...(categoryId && { categoryId }),
    ...(search && { OR: [{ name: { contains: search, mode: "insensitive" as const } }] }),
  };

  const [products, categories, total] = await Promise.all([
    prisma.product.findMany({ where, include: { category: true, inventory: true }, orderBy: { createdAt: "desc" }, skip: (page - 1) * 12, take: 12 }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.product.count({ where }),
  ]);

  return (
    <>
      <p className="text-muted-foreground -mt-6 mb-8">{total} productos disponibles</p>
      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/products"><Badge variant={!categoryId ? "neon" : "outline"} className="cursor-pointer px-4 py-2 text-sm">Todos</Badge></Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/products?categoryId=${cat.id}`}>
            <Badge variant={categoryId === cat.id ? "neon" : "outline"} className="cursor-pointer px-4 py-2 text-sm gap-1">
              <span>{cat.emoji}</span>{cat.name}
            </Badge>
          </Link>
        ))}
      </div>
      {products.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title="No encontramos productos"
          description="Probá con otra categoría o término de búsqueda."
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p as never} index={i} />)}
        </div>
      )}
    </>
  );
}

function ProductsResultsSkeleton() {
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-sm" />
        ))}
      </div>
    </>
  );
}

export default function ProductsPage({ searchParams }: { searchParams: Promise<ProductsSearchParams> }) {
  return (
    <div className="section-padding container-max">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2 inline-flex items-center gap-3">Todos los <span className="text-emerald-500">Productos</span> <Wine className="h-8 w-8 text-emerald-500" /></h1>
      </div>
      <Suspense fallback={<ProductsResultsSkeleton />}>
        <ProductsResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
