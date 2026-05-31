import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { Plus, Edit, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Categorías - Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2"><Tag className="h-6 w-6 text-neon-pink" />Categorías</h1>
          <p className="text-muted-foreground text-sm mt-1">{categories.length} categorías</p>
        </div>
        <Button className="btn-neon gap-2"><Plus className="h-4 w-4" />Nueva Categoría</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="glass-card-hover rounded-xl p-5 flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{cat.emoji || "🏷️"}</span>
              <div><p className="font-bold text-white">{cat.name}</p><p className="text-sm text-muted-foreground">{cat._count.products} productos</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={cat.isActive ? "neon-green" : "destructive"} className="text-xs">{cat.isActive ? "Activa" : "Inactiva"}</Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"><Edit className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
