import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="section-padding" style={{ background: "#12110F" }}>
      <div className="container-max">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#F2A900" }}>Lo más pedido</span>
            <h2 className="text-4xl font-display font-semibold" style={{ color: "#F5F2EC" }}>Productos <span className="italic gradient-text-primary">Destacados</span> ⭐</h2>
          </div>
          <Link href="/products"><Button variant="outline" className="gap-2 hidden sm:flex">Ver todos <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link href="/products"><Button variant="outline" className="gap-2">Ver todos <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
      </div>
    </section>
  );
}
