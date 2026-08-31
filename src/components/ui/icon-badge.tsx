"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";

// Flat, single-tone, organic blob — not a gradient square with a shine
// sweep. That pattern is the single most recognizable "generated SaaS
// landing page" tell, which is exactly what this brand is trying to avoid.
const TONES = {
  gold: { bg: "#3A2D12", fg: "#FFE29A" },
  emerald: { bg: "#132A20", fg: "#4CC95F" },
  hibiscus: { bg: "#301621", fg: "#FF6FA0" },
} as const;

const SIZES = {
  sm: { box: "h-11 w-11", icon: "h-5 w-5" },
  md: { box: "h-14 w-14", icon: "h-6 w-6" },
  lg: { box: "h-16 w-16", icon: "h-7 w-7" },
} as const;

// Organic blob radius, same idea as an emoji/sticker backdrop rather than a
// perfect rounded square.
const BLOB = "63% 37% 54% 46% / 55% 48% 52% 45%";

interface IconBadgeProps {
  icon: LucideIcon;
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  className?: string;
}

export function IconBadge({ icon: Icon, tone = "emerald", size = "md", className }: IconBadgeProps) {
  const t = TONES[tone];
  const s = SIZES[size];

  return (
    <motion.div
      className={cn("flex items-center justify-center shrink-0", s.box, className)}
      style={{ background: t.bg, borderRadius: BLOB }}
      whileHover={{ scale: 1.06, rotate: -4, borderRadius: "48% 52% 40% 60% / 55% 45% 55% 45%" }}
      whileTap={{ scale: 0.94 }}
      transition={springs.snappy}
    >
      <Icon className={s.icon} style={{ color: t.fg }} strokeWidth={2} />
    </motion.div>
  );
}
