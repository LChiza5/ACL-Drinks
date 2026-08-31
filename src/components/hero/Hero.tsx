"use client";

import { motion } from "framer-motion";
import { Zap, Package, HeadphonesIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DELIVERY_ZONE } from "@/constants";
import { Aurora } from "@/components/ui/aurora";
import { StarBorder } from "@/components/ui/star-border";
import { HeroDepthLayer } from "@/components/hero/HeroDepthLayer";
import { IconBadge } from "@/components/ui/icon-badge";
import { BrandGlassIcon } from "@/components/ui/brand-glass-icon";
import { springs } from "@/lib/motion";

const stats = [
  { icon: Zap, label: `Entrega en ${DELIVERY_ZONE}`, value: "1-2 horas", tone: "gold" as const },
  { icon: Package, label: "Envíos Nacionales", value: "2-4 días", tone: "emerald" as const },
  { icon: MapPin, label: "Productos disponibles", value: "25+", tone: "hibiscus" as const },
  { icon: HeadphonesIcon, label: "Soporte", value: "24/7", tone: "emerald" as const },
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
      <Aurora colorStops={["#0E8259", "#D4A72C", "#E3B94D"]} amplitude={0.8} blend={0.45} className="opacity-60" />
      <HeroDepthLayer />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl animate-float" style={{ background: "rgba(22,166,115,0.05)" }} />
      </div>

      <div className="container-max section-padding relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{ border: "1px solid rgba(212,167,44,0.35)", background: "rgba(212,167,44,0.1)" }}
          >
            <BrandGlassIcon className="h-4 w-4" />
            <span className="text-shimmer font-semibold">Entrega Rápida en Costa Rica</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-semibold tracking-tight leading-[0.95]"
          >
            <span className="italic gradient-text-primary glow-primary">Lo Mejor</span>
            <br />
            <span style={{ color: "#F5F2EC" }}>para tu Fiesta </span>
            <span className="gradient-text">🥂</span>
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
            <StarBorder className="w-full sm:w-auto" color="#D4A72C">
              <Button
                size="lg"
                className="btn-primary font-black text-lg gap-3 w-full sm:w-auto text-white px-10 py-4 rounded-xl"
                onClick={handleScrollToCatalog}
              >
                🛒 COMPRAR AHORA
              </Button>
            </StarBorder>
            <Button
              size="lg"
              variant="outline"
              className="gap-3 w-full sm:w-auto font-semibold px-8 py-4 rounded-xl"
              style={{ borderColor: "rgba(212,167,44,0.5)", color: "#F5F2EC" }}
              onClick={() => { window.location.href = "/tracking"; }}
            >
              <MapPin className="h-5 w-5" /> Rastrear Pedido
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
                className="glass-card-hover group rounded-xl p-4 text-center space-y-2"
              >
                <IconBadge icon={stat.icon} tone={stat.tone} size="sm" className="mx-auto" />
                <p className="text-lg font-bold" style={{ color: "#F5F2EC" }}>{stat.value}</p>
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
