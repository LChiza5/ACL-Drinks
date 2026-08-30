"use client";

import { motion } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 320, damping: 22 };

const INK = {
  bodyLight: "#D4A855",
  body: "#C9984A",
  bodyDark: "#A67C52",
  snout: "#B8916A",
  nose: "#3A2A1C",
  eye: "#20160D",
  tail: "#8B6239",
};

interface PisoteMascotProps {
  /** true = cubrirse los ojos con las patas (campo de contraseña enfocado y con contenido) */
  covering: boolean;
  /** true = entreabrir un ojo (el usuario activó "mostrar contraseña") */
  peeking?: boolean;
  className?: string;
}

export function PisoteMascot({ covering, peeking = false, className = "" }: PisoteMascotProps) {
  const leftPaw = covering ? { x: 0, y: 0, rotate: -14 } : { x: -6, y: 32, rotate: -10 };
  const rightPaw = covering ? { x: 0, y: 0, rotate: 14 } : { x: 6, y: 32, rotate: 10 };

  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      {/* cola anillada */}
      <path d="M116 130 Q 152 122 148 82 Q 146 48 118 36" stroke={INK.tail} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M116 130 Q 152 122 148 82 Q 146 48 118 36" stroke={INK.bodyLight} strokeWidth="18" strokeDasharray="10 14" fill="none" strokeLinecap="round" opacity="0.55" />

      {/* cuerpo */}
      <ellipse cx="80" cy="118" rx="40" ry="32" fill={INK.body} />

      {/* orejas */}
      <circle cx="55" cy="33" r="10" fill={INK.bodyDark} />
      <circle cx="105" cy="33" r="10" fill={INK.bodyDark} />

      {/* cabeza (respiración sutil) */}
      <motion.circle
        cx="80" cy="62" r="36"
        fill={INK.bodyLight}
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "80px 62px" }}
      />

      {/* hocico */}
      <ellipse cx="80" cy="82" rx="14" ry="11" fill={INK.snout} />
      <circle cx="80" cy="89" r="5" fill={INK.nose} />

      {/* ojos (las patas se posan encima al cubrir) */}
      <circle cx="66" cy="55" r="5" fill={INK.eye} />
      <circle cx="94" cy="55" r="5" fill={INK.eye} />

      {/* patas */}
      <motion.ellipse
        cx="66" cy="55" rx="13" ry="16"
        fill={INK.bodyLight}
        stroke={INK.bodyDark}
        strokeWidth="1.5"
        animate={{ x: leftPaw.x, y: leftPaw.y, rotate: leftPaw.rotate, opacity: covering && peeking ? 0.35 : 1 }}
        transition={spring}
        style={{ transformOrigin: "66px 55px" }}
      />
      <motion.ellipse
        cx="94" cy="55" rx="13" ry="16"
        fill={INK.bodyLight}
        stroke={INK.bodyDark}
        strokeWidth="1.5"
        animate={{ x: rightPaw.x, y: rightPaw.y, rotate: rightPaw.rotate }}
        transition={spring}
        style={{ transformOrigin: "94px 55px" }}
      />
    </svg>
  );
}
