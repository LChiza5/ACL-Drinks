"use client";

import { useRef, useEffect, useCallback } from "react";

// Adapted from react-bits' ClickSpark (https://reactbits.dev) — zero dependencies.
type Spark = { x: number; y: number; angle: number; startTime: number };

export function ClickSpark({
  children,
  sparkColor = "#22B14C",
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 400,
  className = "",
}: {
  children: React.ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  // The draw loop is started by a click and stops itself once the last spark
  // has faded. It used to call requestAnimationFrame unconditionally, which
  // meant every mounted ClickSpark held a 60fps canvas clear forever - with one
  // per product card that was dozens of idle loops competing with scrolling.
  const runningRef = useRef(false);

  const drawRef = useRef<() => void>(() => {});
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId = 0;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;
        const progress = elapsed / duration;
        const eased = progress * (2 - progress);
        const distance = eased * sparkRadius;
        const lineLength = sparkSize * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      if (sparksRef.current.length > 0) {
        animationId = requestAnimationFrame(draw);
      } else {
        runningRef.current = false;
      }
    };

    drawRef.current = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      animationId = requestAnimationFrame(draw);
    };

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, duration]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      sparksRef.current.push(
        ...Array.from({ length: sparkCount }, (_, i) => ({
          x,
          y,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now,
        }))
      );
      drawRef.current();
    },
    [sparkCount]
  );

  return (
    <div className={`relative ${className}`} onClickCapture={handleClick}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }} />
      {children}
    </div>
  );
}
