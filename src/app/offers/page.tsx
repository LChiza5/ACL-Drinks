import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";

export const metadata: Metadata = { title: "Ofertas" };
export const revalidate = 60;

export default async function OffersPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true, isOnSale: true },
    include: { category: true, inventory: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section-padding container-max">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold text-neon-pink uppercase tracking-widest">¡No te las pierdas!</span>
        <h1 className="text-4xl font-black text-white mt-2">Ofertas <span className="gradient-text">Especiales</span> 🔥</h1>
        <p className="text-muted-foreground mt-2">{products.length} productos en oferta</p>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-20"><div className="text-6xl mb-4">🔥</div><h3 className="text-xl font-bold text-white">Pronto nuevas ofertas</h3></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p as never} index={i} />)}
        </div>
      )}
    </div>
  );
}
