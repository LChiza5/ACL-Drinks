import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Productos - Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true, inventory: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2"><Package className="h-6 w-6 text-neon-purple" />Productos</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} productos</p>
        </div>
        <Button asChild className="btn-neon gap-2"><Link href="/dashboard/products/new"><Plus className="h-4 w-4" />Nuevo Producto</Link></Button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left p-4 text-muted-foreground font-medium">Producto</th>
              <th className="text-left p-4 text-muted-foreground font-medium hidden md:table-cell">Categoría</th>
              <th className="text-right p-4 text-muted-foreground font-medium">Precio</th>
              <th className="text-center p-4 text-muted-foreground font-medium hidden sm:table-cell">Stock</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Estado</th>
              <th className="p-4" />
            </tr></thead>
            <tbody>
              {products.map((product) => {
                const stock = product.inventory ? product.inventory.stock - product.inventory.reserved : 0;
                const isLow = product.inventory && stock <= product.inventory.lowStock;
                return (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-brand-mid shrink-0 flex items-center justify-center">
                          {product.images[0] ? <Image src={product.images[0]} alt={product.name} width={40} height={40} className="object-cover" /> : <span className="text-lg">🍾</span>}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate max-w-[160px]">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.sku || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{product.category?.name}</td>
                    <td className="p-4 text-right">
                      <span className="font-bold text-white">{formatPrice(product.price)}</span>
                      {product.comparePrice && <p className="text-xs text-muted-foreground line-through">{formatPrice(product.comparePrice)}</p>}
                    </td>
                    <td className="p-4 text-center hidden sm:table-cell">
                      <span className={`font-bold ${isLow ? "text-neon-amber" : "text-white"}`}>{stock}</span>
                      {isLow && <p className="text-xs text-neon-amber">⚠️ Bajo</p>}
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant={product.isActive ? "neon-green" : "destructive"} className="text-xs">{product.isActive ? "Activo" : "Inactivo"}</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8"><Link href={`/dashboard/products/${product.id}/edit`}><Edit className="h-4 w-4" /></Link></Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
