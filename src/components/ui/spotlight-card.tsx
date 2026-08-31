"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  radius = 260,
  color = "rgba(242,169,0,0.18)",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className={cn("relative overflow-hidden", className)} onMouseMove={handleMouseMove} {...props}>
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
