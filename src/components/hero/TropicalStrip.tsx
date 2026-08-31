"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PizoteMascot } from "@/components/ui/pizote-mascot";
import { springs } from "@/lib/motion";

/**
 * Illustrations: Noto Emoji (Google), Apache License 2.0.
 * https://github.com/googlefonts/noto-emoji
 */
const critters = [
  { kind: "mascot" as const, name: "El Pizote", blurb: "Curioso, atrevido y el primero en llegar a la fiesta.", bg: "#2A1F14" },
  { kind: "img" as const, src: "/tropical/sloth.svg", name: "El Perezoso", blurb: "Tranquilo... pero tu pedido no tarda como él.", bg: "#1D2A1A" },
  { kind: "img" as const, src: "/tropical/parrot.svg", name: "La Lora", blurb: "Habladora, colorida y la que pone el ambiente.", bg: "#1A2620" },
  { kind: "img" as const, src: "/tropical/monkey.svg", name: "El Mono Congo", blurb: "El alma de la fiesta, de rama en rama.", bg: "#241C14" },
  { kind: "img" as const, src: "/tropical/frog.svg", name: "La Rana", blurb: "Chiquita, pero con un color que no pasa desapercibido.", bg: "#16241C" },
];

export function TropicalStrip() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #1A3328 0%, #12110F 60%)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Cpath d='M0 0 Q 10 30 20 0 T 40 0 T 60 0 T 80 0 T 100 0 T 120 0 T 140 0 T 160 0 T 180 0 T 200 0 V40H0Z' fill='%2312110F'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 40px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3 mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#4CC95F" }}>100% Tico</span>
          <h2 className="text-4xl font-display font-semibold" style={{ color: "#F5F2EC" }}>
            Pura Vida, <span className="italic" style={{ color: "#4CC95F" }}>Full Sabor</span> 🌴
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "#B8B1A7" }}>
            Somos de Costa Rica y se nos nota: acá va la fauna que le pone sabor a cada pedido.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {critters.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, rotate: i % 2 === 0 ? -3 : 3 }}
              transition={{ ...springs.bouncy, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3 group"
            >
              <div
                className="h-24 w-24 sm:h-28 sm:w-28 rounded-[40%] flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-105"
                style={{ background: c.bg, border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {c.kind === "mascot" ? (
                  <PizoteMascot covering={false} className="h-full w-full" />
                ) : (
                  <Image src={c.src} alt={c.name} width={80} height={80} className="h-full w-full object-contain" />
                )}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#F5F2EC" }}>{c.name}</p>
                <p className="text-xs mt-0.5 leading-snug" style={{ color: "#8A8377" }}>{c.blurb}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
