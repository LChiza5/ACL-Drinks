"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  accent?: string;
  accentColor?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared header for section titles. The eyebrow and the heading kept
 * blending into "the same line of text" visually — this fixes that with a
 * real size jump (5xl vs an 11px tracked-out label), a short rule instead of
 * just color to mark the eyebrow, and enough vertical gap that the two never
 * read as one unit.
 */
export function SectionHeading({ eyebrow, eyebrowColor, title, accent, accentColor, description, align = "left", className }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("space-y-5", centered && "text-center mx-auto max-w-2xl", className)}
    >
      <div className={cn("flex items-center gap-3", centered && "justify-center")}>
        <span className="h-px w-9" style={{ background: eyebrowColor }} />
        <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: eyebrowColor }}>
          {eyebrow}
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-display font-semibold leading-[1.05] tracking-tight" style={{ color: "#F5F2EC" }}>
        {title}
        {accent && (
          <>
            {" "}
            <span className="italic" style={{ color: accentColor }}>{accent}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="text-base leading-relaxed max-w-lg" style={{ color: "#8A8377" }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
