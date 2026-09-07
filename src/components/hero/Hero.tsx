"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Lightning, Package, Headset, MapPin, ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { DELIVERY_ZONE } from "@/constants";
import { IconBadge } from "@/components/ui/icon-badge";
import { BrandGlassIcon } from "@/components/ui/brand-glass-icon";
import { CountUpNumber } from "@/components/ui/count-up-number";
import { springs } from "@/lib/motion";

/**
 * Hero product composition. These are bottles ACL Drinks actually sells, shot
 * from the same files the catalogue uses — the previous version showed a Jack
 * Daniel's Honey and a tequila that are not in the catalogue at all, which is
 * an advert for stock the customer cannot buy.
 *
 * `object-contain` on a plate, never `cover`: a hero that crops the label off a
 * bottle is worse than no hero.
 */
const SHOWCASE = [
  {
    src: "/catalog/products/johnnie-walker-black-label.webp",
    alt: "Johnnie Walker Black Label, 750ml",
    className: "right-0 top-2 w-[54%] aspect-[3/4]",
    float: 12,
    delay: 0,
  },
  {
    src: "/catalog/products/absolut-vodka-original.webp",
    alt: "Absolut Vodka Original, 750ml",
    className: "left-0 top-24 w-[42%] aspect-[4/5]",
    float: -9,
    delay: 0.6,
  },
  {
    src: "/catalog/products/cacique-ron-anejo.webp",
    alt: "Cacique Ron Añejo, 750ml",
    className: "left-[22%] bottom-0 w-[36%] aspect-[4/5]",
    float: 8,
    delay: 1.1,
  },
];

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
  const reduceMotion = useReducedMotion();
  // ogl ships a WebGL renderer for a purely decorative backdrop. On a phone
  // that is main-thread and GPU budget spent on something nobody asked for,
  // right where LCP is measured - so it only mounts on a wide viewport, and
  // never when the visitor asked for reduced motion.
  const [showAurora, setShowAurora] = useState(false);
  useEffect(() => {
    if (reduceMotion) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setShowAurora(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduceMotion]);

  const handleScrollToCatalog = () => {
    const el = document.getElementById("catalogo");
    el?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at top, #2A1F14 0%, #12110F 65%)" }}
    >
      {showAurora && (
        <Aurora colorStops={["#12110F", "#1E3D2A", "#22B14C"]} amplitude={0.6} blend={0.5} className="opacity-40" />
      )}

      <div className="container-max section-padding relative z-10 w-full">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 xl:gap-16 items-center">

          {/* Columna de texto */}
          <div className="text-center lg:text-left space-y-7">
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
              className="text-lg md:text-xl max-w-xl mx-auto lg:mx-0"
              style={{ color: "#B8B1A7" }}
            >
              Licores premium a tu puerta. Rápido, seguro y sin complicaciones.{" "}
              <span style={{ color: "#F5F2EC" }} className="font-medium">La mejor selección en Costa Rica.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
            >
              <Button
                size="lg"
                className="btn-primary font-black text-lg gap-3 w-full sm:w-auto text-white px-10 py-4 rounded-2xl"
                onClick={handleScrollToCatalog}
              >
                <ShoppingCartSimple size={20} weight="bold" />COMPRAR AHORA
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-3 w-full sm:w-auto font-semibold px-8 py-4 rounded-2xl"
                style={{ borderColor: "rgba(245,242,236,0.3)", color: "#F5F2EC" }}
              >
                <Link href="/tracking">
                  <MapPin size={20} weight="bold" /> Rastrear Pedido
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Composición de producto real */}
          <div className="relative h-[380px] sm:h-[460px] lg:h-[540px] hidden md:block">
            {SHOWCASE.map((shot, i) => (
              <motion.div
                key={shot.src}
                className={`absolute overflow-hidden rounded-3xl ${shot.className}`}
                style={{
                  // A dark plate under every shot. The source photographs were
                  // taken on different surfaces, so without a shared ground the
                  // three read as three loose snapshots instead of one display.
                  background: "#1E1A17",
                  border: "1px solid rgba(245,242,236,0.12)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                }}
                initial={{ opacity: 0, scale: 0.88, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...springs.gentle, delay: 0.25 + i * 0.12 }}
              >
                <motion.div
                  className="absolute inset-0 p-3"
                  animate={reduceMotion ? undefined : { y: [0, shot.float, 0] }}
                  transition={reduceMotion ? undefined : { duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: shot.delay }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-contain"
                    // The composition is `hidden md:block`, so below 768px this
                    // image is never painted. Asking for a 1px candidate there
                    // keeps `priority`'s preload from costing a phone a full
                    // hero-sized download it will never use.
                    sizes="(max-width: 767px) 1px, (max-width: 1024px) 40vw, 25vw"
                    priority={i === 0}
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(18,17,15,0.45), transparent 45%)" }}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Chip de precio de entrada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springs.bouncy, delay: 0.9 }}
              className="absolute right-2 bottom-6 rounded-2xl px-4 py-3 text-center"
              style={{ background: "#1E1A17", border: "1px solid rgba(242,169,0,0.4)", boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}
            >
              <p className="text-[11px] uppercase tracking-widest font-bold" style={{ color: "#F2A900" }}>Desde</p>
              <p className="text-xl font-black" style={{ color: "#F5F2EC" }}>₡5 500</p>
            </motion.div>
          </div>
        </div>

        <div>
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
