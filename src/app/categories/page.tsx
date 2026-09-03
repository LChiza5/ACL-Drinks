export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Tag } from "lucide-react";
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
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-2xl" />
      ))}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <div className="section-padding container-max">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white mb-2 inline-flex items-center gap-3">Nuestras <span className="gradient-text-vivid">Categorías</span> <Tag className="h-8 w-8 text-emerald-500" /></h1>
        <p className="text-muted-foreground">Encuentra exactamente lo que buscas</p>
      </div>
      <Suspense fallback={<CategoriesGridSkeleton />}>
        <CategoriesGrid />
      </Suspense>
    </div>
  );
}
