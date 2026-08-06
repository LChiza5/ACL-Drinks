import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, Package, Tag, ShoppingBag, Users, Archive, Percent, Gift, Settings, ChevronRight } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Productos", icon: Package },
  { href: "/dashboard/categories", label: "Categorías", icon: Tag },
  { href: "/dashboard/orders", label: "Pedidos", icon: ShoppingBag },
  { href: "/dashboard/inventory", label: "Inventario", icon: Archive },
  { href: "/dashboard/kits", label: "Kits", icon: Gift },
  { href: "/dashboard/promotions", label: "Cupones", icon: Percent },
  { href: "/dashboard/users", label: "Usuarios", icon: Users, adminOnly: true },
  { href: "/dashboard/settings", label: "Config.", icon: Settings, adminOnly: true },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
    redirect("/login");
  }

  const navItems = NAV.filter(item => !item.adminOnly || session.user.role === "ADMIN");

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-brand-dark/80 backdrop-blur-sm shrink-0">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7 shrink-0" />
            <span className="text-xl font-black gradient-text">ACL Drinks</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Panel Administrativo</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-all group">
              <item.icon className="h-4 w-4 shrink-0 group-hover:text-neon-purple transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-xs font-bold text-neon-purple">
              {getInitials(session.user.name || "A")}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{session.user.name}</p>
              <p className="text-xs text-muted-foreground">{session.user.role}</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition-colors">
            <ChevronRight className="h-3 w-3 rotate-180" />Volver a la tienda
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto min-w-0">
        <div className="lg:hidden flex items-center gap-4 p-4 border-b border-border bg-brand-dark/80 overflow-x-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 shrink-0">
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">{item.label}</span>
            </Link>
          ))}
        </div>
        {children}
      </main>
    </div>
  );
}
