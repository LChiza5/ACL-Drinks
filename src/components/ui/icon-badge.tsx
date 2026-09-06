"use client";

import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { springs } from "@/lib/motion";

// Phosphor's duotone weight bakes a two-tone fill into the glyph itself, so
// unlike the old lucide icons this doesn't need a container to look designed
// rather than borrowed off a component library's default export. No badge
// shape, no gradient, no synthetic glow — just a bold, flat-colored icon.
const TONES = {
  gold: "#F2A900",
  emerald: "#22B14C",
  hibiscus: "#FF3D8A",
} as const;

const SIZES = { sm: 40, md: 54, lg: 68 } as const;

interface IconBadgeProps {
  icon: PhosphorIcon;
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  className?: string;
}

export function IconBadge({ icon: Icon, tone = "emerald", size = "md", className = "" }: IconBadgeProps) {
  const color = TONES[tone];
  return (
    <motion.div
      className={`inline-flex ${className}`}
      style={{ filter: `drop-shadow(0 6px 16px ${color}55)` }}
      whileHover={{ scale: 1.12, rotate: -6 }}
      whileTap={{ scale: 0.92 }}
      transition={springs.snappy}
    >
      <Icon size={SIZES[size]} weight="duotone" color={color} />
    </motion.div>
  );
}
