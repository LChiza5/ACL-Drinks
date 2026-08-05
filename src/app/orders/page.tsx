export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUSES } from "@/constants";

export const metadata: Metadata = { title: "Mis Pedidos" };

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { orderItems: true, shipment: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section-padding container-max max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-white">Mis <span className="gradient-text">Pedidos</span> 📦</h1>
        <Link href="/tracking"><Button variant="outline" size="sm" className="gap-2"><Package className="h-4 w-4" />Rastrear</Button></Link>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-2xl">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-white">Sin pedidos todavía</h3>
          <p className="text-muted-foreground mt-2 mb-6">¡Haz tu primera compra ahora!</p>
          <Link href="/products"><Button className="btn-neon">Ver Productos 🍾</Button></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
            return (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <div className="glass-card-hover rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer">
                  <div className="space-y-1">
                    <p className="font-mono font-bold text-white">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)} · {order.orderItems.length} producto(s)</p>
                    <Badge variant="outline" className="text-xs">{status?.emoji} {status?.label}</Badge>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="font-black text-white text-lg">{formatPrice(order.total)}</p>
                      {order.shipment?.trackingCode && <p className="text-xs font-mono text-neon-amber">{order.shipment.trackingCode}</p>}
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
