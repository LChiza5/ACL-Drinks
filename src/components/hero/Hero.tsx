"use client";

import { motion } from "framer-motion";
import { Zap, Package, HeadphonesIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DELIVERY_ZONE } from "@/constants";
import { Aurora } from "@/components/ui/aurora";
import { StarBorder } from "@/components/ui/star-border";

const stats = [
  { icon: Zap, label: `Entrega en ${DELIVERY_ZONE}`, value: "1-2 horas", color: "#C9984A" },
  { icon: Package, label: "Envíos Nacionales", value: "2-4 días", color: "#A67C52" },
  { icon: MapPin, label: "Productos disponibles", value: "25+", color: "#C9984A" },
  { icon: HeadphonesIcon, label: "Soporte", value: "24/7", color: "#A67C52" },
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
      <Aurora colorStops={["#8B6239", "#C9984A", "#A67C52"]} amplitude={0.8} blend={0.45} className="opacity-60" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl animate-float" style={{ background: "rgba(166,124,82,0.04)" }} />
      </div>

      <div className="container-max section-padding relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{ border: "1px solid rgba(201,152,74,0.35)", background: "rgba(201,152,74,0.1)" }}
          >
            <span>🥃</span>
            <span className="text-shimmer font-semibold">Entrega Rápida en Costa Rica</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-tight"
          >
            <span className="gradient-text glow-amber">Lo Mejor</span>
            <br />
            <span style={{ color: "#F5F2EC" }}>para tu Fiesta </span>
            <span className="gradient-text">🥂</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "#B8B1A7" }}
          >
            Licores premium a tu puerta. Rápido, seguro y sin complicaciones.{" "}
            <span style={{ color: "#F5F2EC" }} className="font-medium">La mejor selección en Costa Rica.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <StarBorder className="w-full sm:w-auto">
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
              style={{ borderColor: "rgba(166, 124, 82,0.5)", color: "#F5F2EC" }}
              onClick={() => { window.location.href = "/tracking"; }}
            >
              <MapPin className="h-5 w-5" /> Rastrear Pedido
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass-card rounded-xl p-4 text-center space-y-1"
              >
                <stat.icon className="h-6 w-6 mx-auto" style={{ color: stat.color }} />
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
