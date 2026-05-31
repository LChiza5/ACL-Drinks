"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Package, HeadphonesIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DELIVERY_ZONE } from "@/constants";

const stats = [
  { icon: Zap, label: `Entrega en ${DELIVERY_ZONE}`, value: "1-2 horas", color: "text-neon-amber" },
  { icon: Package, label: "Envíos Nacionales", value: "2-4 días", color: "text-neon-blue" },
  { icon: MapPin, label: "Productos disponibles", value: "25+", color: "text-neon-purple" },
  { icon: HeadphonesIcon, label: "Soporte", value: "24/7", color: "text-neon-pink" },
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "radial-gradient(ellipse at top, #1a0a2e 0%, #08060f 70%)" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-pink/10 rounded-full blur-3xl animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "12s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-blue/5 rounded-full blur-2xl animate-float" />
      </div>

      <div className="container-max section-padding relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-sm font-medium text-neon-purple">
            <span className="animate-bounce-subtle">🎉</span>
            <span>Entrega Rápida en Costa Rica</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            <span className="gradient-text neon-text-purple">🍾 Llegó la Fiesta</span>
            <br />
            <span className="text-white">a tu Puerta </span>
            <span className="gradient-text-amber">🎉</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Compra licor rápido, seguro y sin complicaciones.{" "}
            <span className="text-white font-medium">El mejor guaro, a tu puerta.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <Button size="xl" className="btn-neon font-black text-lg gap-3 w-full sm:w-auto">
                <span>🍾</span> NECESITO GUARO YA
              </Button>
            </Link>
            <Link href="/tracking">
              <Button size="xl" variant="outline" className="gap-3 w-full sm:w-auto font-semibold">
                <MapPin className="h-5 w-5" /> Rastrear Pedido
              </Button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }} className="glass-card rounded-xl p-4 text-center space-y-1">
                <stat.icon className={`h-6 w-6 mx-auto ${stat.color}`} />
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
