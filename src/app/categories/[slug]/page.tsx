export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageSearch } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/ui/empty-state";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({ where: { slug } });
  return { title: cat ? `${cat.name} - Licores` : "Categoría" };
}
export const revalidate = 60;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug, isActive: true },
    include: { _count: { select: { products: true } } },
  });
  if (!category) notFound();

  const products = await prisma.product.findMany({
    where: { categoryId: category.id, isActive: true },
    include: { category: true, inventory: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section-padding container-max">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{category.emoji || "🍾"}</span>
        <div>
          <h1 className="text-4xl font-black text-white">{category.name}</h1>
          {category.description && <p className="text-muted-foreground mt-1">{category.description}</p>}
          <p className="text-sm text-neon-purple mt-1">{products.length} productos</p>
        </div>
      </div>
      {products.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title="Sin productos en esta categoría"
          description="Pronto vamos a sumar más opciones acá."
          actionLabel="Ver todo el catálogo"
          actionHref="/products"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p as never} index={i} />)}
        </div>
      )}
    </div>
  );
}
