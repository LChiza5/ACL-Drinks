import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Gift, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Kits - Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardKitsPage() {
  const kits = await prisma.kit.findMany({
    include: { kitProducts: { include: { product: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2"><Gift className="h-6 w-6 text-neon-pink" />Combos Fiesteros</h1>
          <p className="text-muted-foreground text-sm mt-1">{kits.length} kits</p>
        </div>
        <Button asChild className="btn-neon">
          <Link href="/dashboard/kits/new"><Plus className="h-4 w-4 mr-2" />Nuevo Kit</Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kits.map((kit) => (
          <div key={kit.id} className="glass-card rounded-2xl overflow-hidden">
            <div className="h-40 bg-brand-mid relative">
              {kit.image
                ? <Image src={kit.image} alt={kit.name} fill className="object-cover" />
                : <div className="flex items-center justify-center h-full text-5xl">🎉</div>}
              {kit.badge && (
                <span className="absolute top-2 left-2 bg-neon-purple text-white text-xs font-bold px-2 py-0.5 rounded-full">{kit.badge}</span>
              )}
              {!kit.isActive && (
                <span className="absolute top-2 right-2 bg-black/70 text-muted-foreground text-xs px-2 py-0.5 rounded-full">Inactivo</span>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-white">{kit.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{kit.kitProducts.length} productos</p>
                {kit.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{kit.description}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-black text-neon-purple">{formatPrice(kit.price)}</p>
                  {kit.comparePrice && <p className="text-xs text-muted-foreground line-through">{formatPrice(kit.comparePrice)}</p>}
                </div>
                <div className="flex items-center gap-2">
                  {kit.isFeatured && <Badge variant="neon" className="text-xs">Destacado</Badge>}
                  <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                    <Link href={`/dashboard/kits/${kit.id}/edit`}><Pencil className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {kits.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <Gift className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No hay kits creados aun. Crea el primero.</p>
          </div>
        )}
      </div>
    </div>
  );
}
