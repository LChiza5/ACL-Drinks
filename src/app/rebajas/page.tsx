import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";

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
        <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#C9984A" }}>
          ¡No te las pierdas!
        </span>
        <h1 className="text-4xl font-black mt-2" style={{ color: "#F5F2EC" }}>
          <span className="gradient-text">Rebajas</span> Especiales 🏷️
        </h1>
        <p className="mt-2" style={{ color: "#B8B1A7" }}>{products.length} productos con descuento</p>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🏷️</div>
          <h3 className="text-xl font-bold" style={{ color: "#F5F2EC" }}>Próximamente nuevas rebajas</h3>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p as never} index={i} />)}
        </div>
      )}
    </div>
  );
}
