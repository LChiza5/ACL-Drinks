import type { Metadata } from "next";
import { Suspense } from "react";
import { Tag } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Categorías" };
export const revalidate = 60;

async function CategoriesGrid() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((cat, i) => <CategoryCard key={cat.id} category={cat as never} index={i} />)}
    </div>
  );
}

function CategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border" style={{ background: "#1E1A17", borderColor: "rgba(245,242,236,0.08)" }}>
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-1.5 px-4 py-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <div className="section-padding container-max">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white mb-2">
          Nuestras <span className="text-emerald-500">Categorías</span>{" "}
          <Tag className="inline-block h-8 w-8 align-middle text-emerald-500" />
        </h1>
        <p className="text-muted-foreground">Encuentra exactamente lo que buscas</p>
      </div>
      <Suspense fallback={<CategoriesGridSkeleton />}>
        <CategoriesGrid />
      </Suspense>
    </div>
  );
}
