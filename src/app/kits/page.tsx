import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { KitCard } from "@/components/kits/KitCard";

export const metadata: Metadata = { title: "Kits & Combos" };
export const revalidate = 60;

export default async function KitsPage() {
  const kits = await prisma.kit.findMany({
    where: { isActive: true },
    include: { kitProducts: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section-padding container-max">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold text-neon-pink uppercase tracking-widest">Todo en uno</span>
        <h1 className="text-4xl font-black text-white mt-2">Kits para la <span className="gradient-text">Fiesta</span> 🎉</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Combos armados para que solo pienses en pasarla bien.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kits.map((kit, i) => <KitCard key={kit.id} kit={kit as never} index={i} />)}
      </div>
    </div>
  );
}
