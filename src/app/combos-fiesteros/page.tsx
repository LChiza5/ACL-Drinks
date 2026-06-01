import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { KitCard } from "@/components/kits/KitCard";

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
        <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#C9984A" }}>
          Todo en uno
        </span>
        <h1 className="text-4xl font-black mt-2" style={{ color: "#F5F2EC" }}>
          Combos <span className="gradient-text">Fiesteros</span> 🎉
        </h1>
        <p className="mt-2 max-w-xl mx-auto" style={{ color: "#B8B1A7" }}>
          Combos armados para que solo pienses en pasarla bien.
        </p>
      </div>
      {kits.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-xl font-bold" style={{ color: "#F5F2EC" }}>Próximamente nuevos combos</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit, i) => <KitCard key={kit.id} kit={kit as never} index={i} />)}
        </div>
      )}
    </div>
  );
}
