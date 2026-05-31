import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Image from "next/image";
import { Archive, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = { title: "Inventario - Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardInventoryPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { inventory: true, category: true },
    orderBy: { inventory: { stock: "asc" } },
  });

  const outOfStock = products.filter((p) => !p.inventory || p.inventory.stock === 0);
  const lowStock = products.filter((p) => p.inventory && p.inventory.stock > 0 && p.inventory.stock <= p.inventory.lowStock);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2"><Archive className="h-6 w-6 text-neon-amber" />Inventario</h1>
        <p className="text-muted-foreground text-sm mt-1">{products.length} productos activos</p>
      </div>

      {(outOfStock.length > 0 || lowStock.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {outOfStock.length > 0 && (
            <div className="glass-card rounded-xl p-4 border border-destructive/30 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
              <div><p className="font-bold text-white text-sm">{outOfStock.length} sin stock</p><p className="text-xs text-muted-foreground">Reabastecimiento urgente</p></div>
            </div>
          )}
          {lowStock.length > 0 && (
            <div className="glass-card rounded-xl p-4 border border-neon-amber/30 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-neon-amber shrink-0" />
              <div><p className="font-bold text-white text-sm">{lowStock.length} con stock bajo</p><p className="text-xs text-muted-foreground">Considera reabastecer pronto</p></div>
            </div>
          )}
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left p-4 text-muted-foreground font-medium">Producto</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Stock</th>
              <th className="text-center p-4 text-muted-foreground font-medium hidden sm:table-cell">Reservado</th>
              <th className="text-center p-4 text-muted-foreground font-medium hidden md:table-cell">Disponible</th>
              <th className="text-left p-4 text-muted-foreground font-medium hidden lg:table-cell">Nivel</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Estado</th>
            </tr></thead>
            <tbody>
              {products.map((product) => {
                const inv = product.inventory;
                const available = inv ? inv.stock - inv.reserved : 0;
                const pct = inv && inv.stock > 0 ? Math.round((available / inv.stock) * 100) : 0;
                const isOut = available <= 0;
                const isLow = inv && available > 0 && available <= inv.lowStock;
                return (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg overflow-hidden bg-brand-mid shrink-0 flex items-center justify-center">
                          {product.images[0] ? <Image src={product.images[0]} alt={product.name} width={36} height={36} className="object-cover" /> : <span className="text-base">🍾</span>}
                        </div>
                        <div className="min-w-0"><p className="font-semibold text-white truncate max-w-[160px]">{product.name}</p><p className="text-xs text-muted-foreground">{product.category?.name}</p></div>
                      </div>
                    </td>
                    <td className="p-4 text-center font-bold text-white">{inv?.stock ?? 0}</td>
                    <td className="p-4 text-center hidden sm:table-cell text-muted-foreground">{inv?.reserved ?? 0}</td>
                    <td className="p-4 text-center hidden md:table-cell font-bold text-white">{available}</td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Progress value={pct} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {isOut ? <Badge variant="destructive" className="text-xs">Sin Stock</Badge> :
                       isLow ? <Badge variant="neon-amber" className="text-xs">⚠️ Bajo</Badge> :
                       <Badge variant="neon-green" className="text-xs">OK</Badge>}
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
