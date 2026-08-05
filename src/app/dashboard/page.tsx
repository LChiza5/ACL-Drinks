export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LayoutDashboard, ShoppingBag, Users, Package, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { ORDER_STATUSES } from "@/constants";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) redirect("/login");

  const [totalOrders, revenueAgg, totalUsers, totalProducts, recentOrders, pendingOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
    prisma.user.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.findMany({ include: { orderItems: true, payment: true }, orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.order.count({ where: { status: "PENDING" } }),
  ]);

  const stats = [
    { title: "Ingresos Totales", value: formatPrice(revenueAgg._sum.total || 0), icon: TrendingUp, color: "text-neon-amber", bg: "bg-neon-amber/10" },
    { title: "Total Pedidos", value: totalOrders, icon: ShoppingBag, color: "text-neon-purple", bg: "bg-neon-purple/10" },
    { title: "Clientes", value: totalUsers, icon: Users, color: "text-neon-blue", bg: "bg-neon-blue/10" },
    { title: "Productos", value: totalProducts, icon: Package, color: "text-neon-pink", bg: "bg-neon-pink/10" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2"><LayoutDashboard className="h-8 w-8 text-neon-purple" />Dashboard</h1>
          <p className="text-muted-foreground mt-1">Hola, {session.user.name} 👋</p>
        </div>
        {pendingOrders > 0 && <Badge className="gap-1 px-3 py-1.5 text-sm font-bold bg-neon-amber/20 text-neon-amber border-neon-amber/50"><Clock className="h-4 w-4" />{pendingOrders} pendientes</Badge>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.title} className="glass-card border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${s.bg}`}><s.icon className={`h-6 w-6 ${s.color}`} /></div>
              <div><p className="text-2xl font-black text-white">{s.value}</p><p className="text-sm text-muted-foreground">{s.title}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card border-border">
        <CardHeader><CardTitle className="text-white">Pedidos Recientes</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
              return (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div><p className="font-mono font-bold text-white text-sm">{order.orderNumber}</p><p className="text-xs text-muted-foreground">{formatDateTime(order.createdAt)}</p></div>
                  <div className="text-right"><p className="font-bold text-neon-purple">{formatPrice(order.total)}</p><Badge variant="outline" className="text-xs">{status?.emoji} {status?.label}</Badge></div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
