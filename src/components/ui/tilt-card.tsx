"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Adapted from react-bits' TiltedCard (https://reactbits.dev), generalized to wrap
// arbitrary children instead of a single image.
const springValues = { damping: 30, stiffness: 100, mass: 2 };

export function TiltCard({
  children,
  className = "",
  rotateAmplitude = 8,
}: {
  children: React.ReactNode;
  className?: string;
  rotateAmplitude?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div ref={ref} style={{ perspective: 800 }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div className={className} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}
