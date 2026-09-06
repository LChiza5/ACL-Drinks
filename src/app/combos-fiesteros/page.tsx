export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Gift, Confetti as PartyPopper } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { KitCard } from "@/components/kits/KitCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Combos Fiesteros | ACL Drinks" };
export const revalidate = 60;

async function KitsGrid() {
  const kits = await prisma.kit.findMany({
    where: { isActive: true },
    include: { kitProducts: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  if (kits.length === 0) {
    return (
      <EmptyState
        icon={Gift}
        title="Todavía no hay combos armados"
        description="Estamos preparando nuevas combinaciones para vos."
        actionLabel="Ver productos"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kits.map((kit, i) => <KitCard key={kit.id} kit={kit as never} index={i} />)}
    </div>
  );
}

function KitsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-sm" />
      ))}
    </div>
  );
}

export default function CombosFiesterosPage() {
  return (
    <div className="section-padding container-max">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold uppercase tracking-widest text-hibiscus-400">
          Todo en uno
        </span>
        <h1 className="text-4xl font-black mt-2 text-white flex items-center justify-center gap-3">
          Combos <span className="text-hibiscus-500">Fiesteros</span> <PartyPopper className="h-8 w-8 text-hibiscus-500" />
        </h1>
        <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
          Combos armados para que solo pienses en pasarla bien.
        </p>
      </div>
      <Suspense fallback={<KitsGridSkeleton />}>
        <KitsGrid />
      </Suspense>
    </div>
  );
}
