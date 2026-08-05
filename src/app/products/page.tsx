import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata: Metadata = { title: "Productos" };
export const revalidate = 60;

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ categoryId?: string; search?: string; page?: string }> }) {
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
    <div className="section-padding container-max">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2">Todos los <span className="gradient-text">Productos</span> 🍾</h1>
        <p className="text-muted-foreground">{total} productos disponibles</p>
      </div>
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
        <div className="text-center py-20"><div className="text-6xl mb-4">😕</div><h3 className="text-xl font-bold text-white">No encontramos productos</h3></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p as never} index={i} />)}
        </div>
      )}
    </div>
  );
}
