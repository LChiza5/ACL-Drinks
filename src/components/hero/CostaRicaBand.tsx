import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Truck } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { ACL_BRAND } from "@/constants";

/**
 * Replaces the illustrated-fauna strip that used to sit here.
 *
 * Same job — say "we are Costa Rican" — but through a real photograph of the
 * coast we deliver to and three facts the store can actually stand behind,
 * instead of six drawn animals. No toucans, no sloths, no flags: the country
 * shows up as a place, not as a souvenir shop.
 *
 * Server component. The whole band ships zero JavaScript.
 */
const FACTS = [
  { icon: MapPin, label: "Base en", value: ACL_BRAND.deliveryZone },
  { icon: Truck, label: "Envíos", value: "A todo el país" },
  { icon: Clock, label: "Atención", value: ACL_BRAND.hours },
];

export function CostaRicaBand() {
  return (
    <section className="section-padding" style={{ background: "#12110F" }}>
      <div className="container-max">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[260px] overflow-hidden rounded-3xl sm:min-h-[340px]">
            <Image
              src="/catalog/scenes/guanacaste-atardecer.webp"
              alt="Atardecer sobre la costa de Guanacaste, Costa Rica"
              fill
              sizes="(max-width: 1024px) 92vw, 55vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(18,17,15,0.78), rgba(18,17,15,0.05) 60%)" }}
            />
            <p
              className="absolute bottom-5 left-6 right-6 font-display text-lg font-semibold italic leading-snug sm:text-2xl"
              style={{ color: "#F5F2EC" }}
            >
              De Guanacaste para todo el país.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-9" style={{ background: "#F2A900" }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#F2A900" }}>
                100% Tico
              </span>
            </div>

            <h2
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
              style={{ color: "#F5F2EC" }}
            >
              Pura Vida, <span className="italic" style={{ color: "#4CD671" }}>Full Sabor</span>
            </h2>

            <p className="max-w-lg text-base leading-relaxed" style={{ color: "#8A8377" }}>
              Somos una licorería tica. Conocemos la fiesta de aquí, el clima de aquí y
              las distancias de aquí, así que el pedido llega frío, completo y a tiempo.
            </p>

            <dl className="grid gap-3 sm:grid-cols-3">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl px-4 py-3"
                  style={{ background: "#1E1A17", border: "1px solid rgba(245,242,236,0.08)" }}
                >
                  <fact.icon size={18} weight="duotone" color="#4CD671" aria-hidden="true" />
                  <dt className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "#8A8377" }}>
                    {fact.label}
                  </dt>
                  <dd className="text-sm font-semibold leading-snug" style={{ color: "#F5F2EC" }}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div>
              <Button asChild className="btn-primary gap-2 rounded-2xl text-white">
                <Link href="/products">Ver el catálogo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
