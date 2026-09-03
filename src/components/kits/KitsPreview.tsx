import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KitCard } from "./KitCard";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Kit } from "@/types";

export function KitsPreview({ kits }: { kits: Kit[] }) {
  if (!kits.length) return null;
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "radial-gradient(ellipse 70% 50% at 85% 0%, #2E1420 0%, #12110F 60%)" }}>
      <div className="container-max relative z-10">
        <div className="flex items-end justify-between mb-10 gap-4">
          <SectionHeading
            eyebrow="Todo en uno"
            eyebrowColor="#FF75AC"
            title="Combos"
            accent="Fiesteros"
            accentColor="#FF3D8A"
            description="Combos armados para que solo pienses en pasarla bien."
          />
          <Link href="/combos-fiesteros">
            <Button variant="outline" className="gap-2 hidden sm:flex shrink-0" style={{ borderColor: "rgba(255,61,138,0.4)", color: "#F5F2EC" }}>
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
