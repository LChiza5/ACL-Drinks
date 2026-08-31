import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KitCard } from "./KitCard";
import type { Kit } from "@/types";

export function KitsPreview({ kits }: { kits: Kit[] }) {
  if (!kits.length) return null;
  return (
    <section className="section-padding" style={{ background: "#12110F" }}>
      <div className="container-max">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#FF3D8A" }}>Todo en uno</span>
            <h2 className="text-4xl font-display font-semibold" style={{ color: "#F5F2EC" }}>
              Combos <span className="italic" style={{ color: "#FF3D8A" }}>Fiesteros</span> 🎉
            </h2>
            <p style={{ color: "#B8B1A7" }}>Combos armados para que solo pienses en pasarla bien.</p>
          </div>
          <Link href="/combos-fiesteros">
            <Button variant="outline" className="gap-2 hidden sm:flex" style={{ borderColor: "rgba(255,61,138,0.4)", color: "#F5F2EC" }}>
              Ver combos <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit, i) => <KitCard key={kit.id} kit={kit} index={i} />)}
        </div>
      </div>
    </section>
  );
}
