"use client";

import { motion } from "framer-motion";
import { PizoteMascot } from "@/components/ui/pizote-mascot";
import { SectionHeading } from "@/components/ui/section-heading";
import { springs } from "@/lib/motion";

/**
 * NOTE: this section is intentionally minimal right now. It previously used
 * emoji-style icon art and, before that, stock wildlife photos - neither
 * matched the reference (fundaca.vercel.app's custom illustrated species
 * badges: cohesive style, muted earthy palette, circular cream frame).
 * Building more critters here needs real illustration work, not another
 * guessed icon set - see the project brief for next steps.
 */
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
          description="Somos de Costa Rica y se nos nota."
          className="mb-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={springs.bouncy}
          className="flex flex-col items-center text-center gap-4"
        >
          <div
            className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full overflow-hidden flex items-center justify-center p-4"
            style={{
              background: "radial-gradient(circle at 35% 30%, #1E1A17, #12110F 75%)",
              boxShadow: "0 0 0 3px #F2A900, 0 8px 28px -8px #F2A90099",
            }}
          >
            <PizoteMascot covering={false} className="h-full w-full" />
          </div>
          <div>
            <p className="font-bold text-base" style={{ color: "#F5F2EC" }}>El Pizote</p>
            <p className="text-xs mt-1 leading-snug max-w-[14rem] mx-auto" style={{ color: "#8A8377" }}>
              Curioso, atrevido y el primero en llegar a la fiesta.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
