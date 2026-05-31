import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { ORDER_STATUSES } from "@/constants";

export const metadata: Metadata = { title: "Pedidos - Dashboard" };
export const dynamic = "force-dynamic";

interface Props { searchParams: { status?: string } }

export default async function DashboardOrdersPage({ searchParams }: Props) {
  const where = searchParams.status ? { status: searchParams.status as never } : {};
  const [orders, total] = await Promise.all([
    prisma.order.findMany({ where, include: { orderItems: true, payment: true }, orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.order.count({ where }),
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2"><ShoppingBag className="h-6 w-6 text-neon-purple" />Pedidos</h1>
          <p className="text-muted-foreground text-sm mt-1">{total} pedidos</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/orders"><Badge variant={!searchParams.status ? "neon" : "outline"} className="cursor-pointer px-3 py-1">Todos</Badge></Link>
          {(Object.entries(ORDER_STATUSES) as [string, typeof ORDER_STATUSES[keyof typeof ORDER_STATUSES]][]).map(([key, s]) => (
            <Link key={key} href={`/dashboard/orders?status=${key}`}>
              <Badge variant={searchParams.status === key ? "neon" : "outline"} className="cursor-pointer px-3 py-1">{s.emoji} {s.label}</Badge>
            </Link>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left p-4 text-muted-foreground font-medium">Pedido</th>
              <th className="text-left p-4 text-muted-foreground font-medium hidden md:table-cell">Cliente</th>
              <th className="text-right p-4 text-muted-foreground font-medium">Total</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Estado</th>
              <th className="text-center p-4 text-muted-foreground font-medium hidden sm:table-cell">Pago</th>
              <th className="p-4" />
            </tr></thead>
            <tbody>
              {orders.map((order) => {
                const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
                return (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                    <td className="p-4"><p className="font-mono font-bold text-white">{order.orderNumber}</p><p className="text-xs text-muted-foreground">{formatDateTime(order.createdAt)}</p></td>
                    <td className="p-4 hidden md:table-cell"><p className="text-white">{order.guestName || "Usuario registrado"}</p><p className="text-xs text-muted-foreground">{order.guestEmail || ""}</p></td>
                    <td className="p-4 text-right font-bold text-white">{formatPrice(order.total)}</td>
                    <td className="p-4 text-center"><Badge variant="outline" className="text-xs">{status?.emoji} {status?.label}</Badge></td>
                    <td className="p-4 text-center hidden sm:table-cell">
                      {order.payment && <Badge variant={order.payment.status === "COMPLETED" ? "neon-green" : "neon-amber"} className="text-xs">{order.payment.status === "COMPLETED" ? "✅ Pagado" : "⏳ Pend."}</Badge>}
                    </td>
                    <td className="p-4 text-center">
                      <Link href={`/orders/${order.id}`}><Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button></Link>
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
