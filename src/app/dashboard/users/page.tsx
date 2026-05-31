import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { Users, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate, getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Usuarios - Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardUsersPage() {
  const users = await prisma.user.findMany({
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2"><Users className="h-6 w-6 text-neon-blue" />Usuarios</h1>
        <p className="text-muted-foreground text-sm mt-1">{users.length} usuarios registrados</p>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left p-4 text-muted-foreground font-medium">Usuario</th>
              <th className="text-left p-4 text-muted-foreground font-medium hidden md:table-cell">Email</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Rol</th>
              <th className="text-center p-4 text-muted-foreground font-medium hidden sm:table-cell">Pedidos</th>
              <th className="text-center p-4 text-muted-foreground font-medium hidden lg:table-cell">Puntos</th>
              <th className="text-left p-4 text-muted-foreground font-medium hidden lg:table-cell">Registro</th>
            </tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarFallback className="text-xs">{getInitials(user.name || "U")}</AvatarFallback></Avatar>
                      <span className="font-medium text-white">{user.name || "—"}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell text-muted-foreground">{user.email}</td>
                  <td className="p-4 text-center">
                    <Badge variant={user.role === "ADMIN" ? "neon" : user.role === "MANAGER" ? "neon-amber" : "outline"} className="text-xs">{user.role}</Badge>
                  </td>
                  <td className="p-4 text-center hidden sm:table-cell font-bold text-white">{user._count.orders}</td>
                  <td className="p-4 text-center hidden lg:table-cell">
                    <span className="flex items-center justify-center gap-1 text-neon-amber font-bold"><Star className="h-3.5 w-3.5 fill-neon-amber" />{user.loyaltyPoints.toLocaleString()}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-muted-foreground">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
