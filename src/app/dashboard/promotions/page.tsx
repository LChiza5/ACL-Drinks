import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { CreateCouponDialog } from "@/components/dashboard/CreateCouponDialog";
import { CouponToggle } from "@/components/dashboard/CouponToggle";

export const metadata: Metadata = { title: "Cupones - Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPromotionsPage() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });

  const TYPE_LABELS = { PERCENTAGE: "%", FIXED_AMOUNT: "₡ fijo", FREE_SHIPPING: "Envío gratis" };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2"><Percent className="h-6 w-6 text-neon-amber" />Cupones</h1>
          <p className="text-muted-foreground text-sm mt-1">{coupons.length} cupones</p>
        </div>
        <CreateCouponDialog />
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left p-4 text-muted-foreground font-medium">Código</th>
              <th className="text-left p-4 text-muted-foreground font-medium hidden sm:table-cell">Tipo</th>
              <th className="text-right p-4 text-muted-foreground font-medium">Valor</th>
              <th className="text-center p-4 text-muted-foreground font-medium hidden md:table-cell">Usos</th>
              <th className="text-left p-4 text-muted-foreground font-medium hidden lg:table-cell">Expira</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Estado</th>
            </tr></thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                  <td className="p-4">
                    <p className="font-mono font-bold text-white">{c.code}</p>
                    {c.description && <p className="text-xs text-muted-foreground">{c.description}</p>}
                    {c.minOrder && <p className="text-xs text-muted-foreground">Mín: {formatPrice(c.minOrder)}</p>}
                  </td>
                  <td className="p-4 hidden sm:table-cell text-muted-foreground">{TYPE_LABELS[c.type as keyof typeof TYPE_LABELS]}</td>
                  <td className="p-4 text-right font-bold text-white">
                    {c.type === "PERCENTAGE" ? `${c.value}%` : c.type === "FIXED_AMOUNT" ? formatPrice(c.value) : "—"}
                  </td>
                  <td className="p-4 text-center hidden md:table-cell">
                    <span className="text-white font-bold">{c.usedCount}</span>
                    {c.maxUses && <span className="text-muted-foreground">/{c.maxUses}</span>}
                  </td>
                  <td className="p-4 hidden lg:table-cell text-muted-foreground">
                    {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString("es-CR") : "Sin límite"}
                  </td>
                  <td className="p-4 text-center">
                    <CouponToggle couponId={c.id} isActive={c.isActive} />
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Sin cupones. Crea el primero.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
