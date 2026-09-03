export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Rebajas | ACL Drinks" };
export const revalidate = 60;

export default async function RebajasPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true, isOnSale: true },
    include: { category: true, inventory: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section-padding container-max">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold uppercase tracking-widest text-neon-amber">
          ¡No te las pierdas!
        </span>
        <h1 className="text-4xl font-black mt-2 text-white inline-flex items-center gap-3">
          <span className="gradient-text">Rebajas</span> Especiales <Tag className="h-8 w-8 text-gold-500" />
        </h1>
        <p className="mt-2 text-muted-foreground">{products.length} productos con descuento</p>
      </div>
      {products.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="Todavía no hay rebajas activas"
          description="En cuanto haya, las vas a ver acá primero."
          actionLabel="Ver catálogo completo"
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
