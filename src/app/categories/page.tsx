export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CategoryCard } from "@/components/categories/CategoryCard";

export const metadata: Metadata = { title: "Categorías" };
export const revalidate = 60;

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return (
    <div className="section-padding container-max">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white mb-2 inline-flex items-center gap-3">Nuestras <span className="gradient-text">Categorías</span> <Tag className="h-8 w-8 text-emerald-500" /></h1>
        <p className="text-muted-foreground">Encuentra exactamente lo que buscas</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat, i) => <CategoryCard key={cat.id} category={cat as never} index={i} />)}
      </div>
    </div>
  );
}
