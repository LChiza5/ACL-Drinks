export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Tag } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Rebajas | ACL Drinks" };
export const revalidate = 60;

async function RebajasGrid() {
  const products = await prisma.product.findMany({
    where: { isActive: true, isOnSale: true },
    include: { category: true, inventory: true },
    orderBy: { createdAt: "desc" },
  });

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Tag}
        title="Todavía no hay rebajas activas"
        description="En cuanto haya, las vas a ver acá primero."
        actionLabel="Ver catálogo completo"
        actionHref="/products"
      />
    );
  }

  return (
    <>
      <p className="text-muted-foreground text-center mb-8">{products.length} productos con descuento</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((p, i) => <ProductCard key={p.id} product={p as never} index={i} />)}
      </div>
    </>
  );
}

function RebajasGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-2xl" />
      ))}
    </div>
  );
}

export default function RebajasPage() {
  return (
    <div className="section-padding container-max">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold uppercase tracking-widest text-hibiscus-400">
          ¡No te las pierdas!
        </span>
        <h1 className="text-4xl font-black mt-2 text-white">
          <span className="text-hibiscus-500">Rebajas</span> Especiales{" "}
          <Tag className="inline-block h-8 w-8 align-middle text-hibiscus-500" />
        </h1>
      </div>
      <Suspense fallback={<RebajasGridSkeleton />}>
        <RebajasGrid />
      </Suspense>
    </div>
  );
}
