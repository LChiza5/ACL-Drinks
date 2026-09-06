"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Lightning, Package, Headset, MapPin, ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { DELIVERY_ZONE } from "@/constants";
import { IconBadge } from "@/components/ui/icon-badge";
import { BrandGlassIcon } from "@/components/ui/brand-glass-icon";
import { CountUpNumber } from "@/components/ui/count-up-number";
import { springs } from "@/lib/motion";

// ogl (WebGL) is only needed for this decorative background — deferring it to
// a client-only chunk keeps it off the critical path for the Hero's actual
// content (headline, CTA), which renders immediately either way since Aurora
// is a pure position:absolute overlay with no effect on surrounding layout.
const Aurora = dynamic(() => import("@/components/ui/aurora").then((m) => m.Aurora), { ssr: false });

// Each stat rolls its key number up from 0 when the row scrolls into view.
const stats = [
  { icon: Lightning, label: `Entrega en ${DELIVERY_ZONE}`, number: 2, prefix: "1-", suffix: " horas", tone: "gold" as const },
  { icon: Package, label: "Envíos Nacionales", number: 4, prefix: "2-", suffix: " días", tone: "emerald" as const },
  { icon: MapPin, label: "Productos disponibles", number: 25, prefix: "", suffix: "+", tone: "hibiscus" as const },
  { icon: Headset, label: "Soporte", number: 24, prefix: "", suffix: "/7", tone: "emerald" as const },
];

export function Hero() {
  const handleScrollToCatalog = () => {
    const el = document.getElementById("catalogo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at top, #2A1F14 0%, #12110F 65%)" }}
    >
      <Aurora colorStops={["#12110F", "#1E3D2A", "#22B14C"]} amplitude={0.6} blend={0.5} className="opacity-40" />

      <div className="container-max section-padding relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{ border: "1px solid rgba(34,177,76,0.35)", background: "rgba(34,177,76,0.1)" }}
          >
            <BrandGlassIcon className="h-4 w-4 text-emerald-500" />
            <span className="font-semibold" style={{ color: "#B8E8C4" }}>Entrega Rápida en Costa Rica</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-semibold tracking-tight leading-[0.95]"
          >
            <span className="italic gradient-text-primary">Lo Mejor</span>
            <br />
            <span style={{ color: "#F5F2EC" }}>para tu Fiesta</span>{" "}
            <BrandGlassIcon className="inline-block h-10 w-10 md:h-14 md:w-14 align-middle text-emerald-400" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "#B8B1A7" }}
          >
            Licores premium a tu puerta. Rápido, seguro y sin complicaciones.{" "}
            <span style={{ color: "#F5F2EC" }} className="font-medium">La mejor selección en Costa Rica.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="btn-primary font-black text-lg gap-3 w-full sm:w-auto text-white px-10 py-4 rounded-2xl"
              onClick={handleScrollToCatalog}
            >
              <ShoppingCartSimple size={20} weight="bold" />COMPRAR AHORA
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-3 w-full sm:w-auto font-semibold px-8 py-4 rounded-2xl"
              style={{ borderColor: "rgba(245,242,236,0.3)", color: "#F5F2EC" }}
              onClick={() => { window.location.href = "/tracking"; }}
            >
              <MapPin size={20} weight="bold" /> Rastrear Pedido
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -3 }}
                transition={{ ...springs.gentle, delay: 0.5 + i * 0.1 }}
                className="glass-card-hover group rounded-2xl p-4 text-center space-y-2"
              >
                <IconBadge icon={stat.icon} tone={stat.tone} size="sm" className="mx-auto" />
                <p className="text-2xl font-black tracking-tight" style={{ color: "#F5F2EC" }}>
                  <CountUpNumber value={stat.number} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="text-xs" style={{ color: "#B8B1A7" }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, #12110F, transparent)" }} />
    </section>
  );
}
