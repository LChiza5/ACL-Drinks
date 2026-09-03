"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PizoteMascot } from "@/components/ui/pizote-mascot";
import { SectionHeading } from "@/components/ui/section-heading";
import { springs } from "@/lib/motion";

/**
 * Illustrations: Noto Emoji (Google), Apache License 2.0.
 * https://github.com/googlefonts/noto-emoji
 */
const critters = [
  { kind: "mascot" as const, name: "El Pizote", blurb: "Curioso, atrevido y el primero en llegar a la fiesta.", ring: "#F2A900" },
  { kind: "img" as const, src: "/tropical/sloth.svg", name: "El Perezoso", blurb: "Tranquilo... pero tu pedido no tarda como él.", ring: "#22B14C" },
  { kind: "img" as const, src: "/tropical/parrot.svg", name: "La Lora", blurb: "Habladora, colorida y la que pone el ambiente.", ring: "#FF3D8A" },
  { kind: "img" as const, src: "/tropical/monkey.svg", name: "El Mono Congo", blurb: "El alma de la fiesta, de rama en rama.", ring: "#F2A900" },
  { kind: "img" as const, src: "/tropical/frog.svg", name: "La Rana", blurb: "Chiquita, pero con un color que no pasa desapercibido.", ring: "#22B14C" },
];

export function TropicalStrip() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #163826 0%, #12110F 65%)" }}
    >
      <div className="container-max relative z-10">
        <SectionHeading
          align="center"
          eyebrow="100% Tico"
          eyebrowColor="#4CD671"
          title="Pura Vida,"
          accent="Full Sabor"
          accentColor="#4CD671"
          description="Somos de Costa Rica y se nos nota: acá va la fauna que le pone sabor a cada pedido."
          className="mb-14"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {critters.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 28, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -3 : 3 }}
              transition={{ ...springs.bouncy, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div
                className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full flex items-center justify-center p-4 transition-shadow duration-300"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #1E1A17, #12110F 75%)",
                  boxShadow: `inset 0 0 0 2px ${c.ring}40, 0 8px 28px -8px ${c.ring}66`,
                }}
              >
                {c.kind === "mascot" ? (
                  <PizoteMascot covering={false} className="h-full w-full" />
                ) : (
                  <Image src={c.src} alt={c.name} width={96} height={96} className="h-full w-full object-contain" />
                )}
              </div>
              <div>
                <p className="font-bold text-base" style={{ color: "#F5F2EC" }}>{c.name}</p>
                <p className="text-xs mt-1 leading-snug max-w-[10rem] mx-auto" style={{ color: "#8A8377" }}>{c.blurb}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
