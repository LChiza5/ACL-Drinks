import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { Star, Package, MapPin, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, formatDate, getInitials } from "@/lib/utils";
import { ORDER_STATUSES } from "@/constants";

export const metadata: Metadata = { title: "Mi Perfil" };

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      addresses: { orderBy: { isDefault: "desc" } },
      orders: { include: { orderItems: true }, orderBy: { createdAt: "desc" }, take: 5 },
    },
  });
  if (!user) redirect("/login");

  return (
    <div className="section-padding container-max max-w-3xl">
      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback className="text-2xl">{getInitials(user.name || "U")}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-white">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end"><Star className="h-5 w-5 text-neon-amber fill-neon-amber" /><span className="text-xl font-black text-neon-amber">{user.loyaltyPoints.toLocaleString()}</span></div>
            <p className="text-xs text-muted-foreground">puntos de fidelidad</p>
          </div>
        </div>
      </div>

      <Card className="glass-card border-border mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-lg">Pedidos Recientes</CardTitle>
          <Link href="/orders"><Button variant="ghost" size="sm" className="gap-1 text-xs">Ver todos <ChevronRight className="h-3 w-3" /></Button></Link>
        </CardHeader>
        <CardContent className="space-y-2">
          {user.orders.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">Sin pedidos todavía</p>
          ) : user.orders.map((order) => {
            const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
            return (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <div className="flex items-center justify-between py-2.5 hover:bg-white/5 rounded-lg px-2 transition-colors cursor-pointer">
                  <div><p className="font-mono text-sm font-bold text-white">{order.orderNumber}</p><p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p></div>
                  <div className="text-right"><p className="font-bold text-white">{formatPrice(order.total)}</p><Badge variant="outline" className="text-xs">{status?.emoji} {status?.label}</Badge></div>
                </div>
              </Link>
            );
          })}
        </CardContent>
      </Card>

      <Card className="glass-card border-border">
        <CardHeader><CardTitle className="text-white text-lg flex items-center gap-2"><MapPin className="h-4 w-4 text-neon-pink" />Mis Direcciones</CardTitle></CardHeader>
        <CardContent>
          {user.addresses.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">Sin direcciones guardadas</p>
          ) : user.addresses.map((addr) => (
            <div key={addr.id} className="py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-2 mb-1"><p className="font-semibold text-white text-sm">{addr.alias}</p>{addr.isDefault && <Badge variant="neon" className="text-xs">Principal</Badge>}</div>
              <p className="text-sm text-muted-foreground">{addr.fullName} · {addr.phone}</p>
              <p className="text-sm text-muted-foreground">{addr.address}, {addr.district}, {addr.canton}, {addr.province}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
