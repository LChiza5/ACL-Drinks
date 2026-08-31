"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";

const TONES = {
  gold: {
    bg: "linear-gradient(135deg, #F0D48A, #D4A72C 55%, #B8860F)",
    shadow: "shadow-glow-gold",
    iconColor: "#2A1F0C",
  },
  emerald: {
    bg: "linear-gradient(135deg, #2FBE87, #16A673 55%, #0E8259)",
    shadow: "shadow-glow-emerald",
    iconColor: "#F5F2EC",
  },
  hibiscus: {
    bg: "linear-gradient(135deg, #FF6B96, #F0356E 55%, #C41F56)",
    shadow: "shadow-glow-hibiscus",
    iconColor: "#F5F2EC",
  },
} as const;

const SIZES = {
  sm: { box: "h-10 w-10", icon: "h-5 w-5", radius: "rounded-xl" },
  md: { box: "h-14 w-14", icon: "h-7 w-7", radius: "rounded-2xl" },
  lg: { box: "h-16 w-16", icon: "h-8 w-8", radius: "rounded-2xl" },
} as const;

interface IconBadgeProps {
  icon: LucideIcon;
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  className?: string;
}

/**
 * Gradient medallion wrapper for lucide icons: replaces flat single-tint
 * icons with a badge that carries real depth (gradient, glow, shine sweep on
 * hover) so the icon reads as a designed piece instead of a raw glyph.
 * Wrap the trigger element in `.group` — the shine sweep hooks into that.
 */
export function IconBadge({ icon: Icon, tone = "emerald", size = "md", className }: IconBadgeProps) {
  const t = TONES[tone];
  const s = SIZES[size];

  return (
    <motion.div
      className={cn("icon-badge flex items-center justify-center shrink-0", s.box, s.radius, t.shadow, className)}
      style={{ background: t.bg }}
      whileHover={{ scale: 1.08, rotate: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={springs.snappy}
    >
      <Icon className={s.icon} style={{ color: t.iconColor }} strokeWidth={2.25} />
    </motion.div>
  );
}
