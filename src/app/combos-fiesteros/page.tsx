export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Gift, PartyPopper } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { KitCard } from "@/components/kits/KitCard";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Combos Fiesteros | ACL Drinks" };
export const revalidate = 60;

export default async function CombosFiesterosPage() {
  const kits = await prisma.kit.findMany({
    where: { isActive: true },
    include: { kitProducts: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section-padding container-max">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold uppercase tracking-widest text-neon-amber">
          Todo en uno
        </span>
        <h1 className="text-4xl font-black mt-2 text-white inline-flex items-center gap-3">
          Combos <span className="gradient-text">Fiesteros</span> <PartyPopper className="h-8 w-8 text-hibiscus-500" />
        </h1>
        <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
          Combos armados para que solo pienses en pasarla bien.
        </p>
      </div>
      {kits.length === 0 ? (
        <EmptyState
          icon={Gift}
          title="Todavía no hay combos armados"
          description="Estamos preparando nuevas combinaciones para vos."
          actionLabel="Ver productos"
          actionHref="/products"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit, i) => <KitCard key={kit.id} kit={kit as never} index={i} />)}
        </div>
      )}
    </div>
  );
}
