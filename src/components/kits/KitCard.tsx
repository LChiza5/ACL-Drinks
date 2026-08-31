"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Package } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { GlareHover } from "@/components/ui/glare-hover";
import { ClickSpark } from "@/components/ui/click-spark";
import { springs } from "@/lib/motion";
import type { Kit } from "@/types";

export function KitCard({ kit, index = 0 }: { kit: Kit; index?: number }) {
  const { addItem, openCart } = useCartStore();
  const discount = getDiscountPercentage(kit.price, kit.comparePrice ?? 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id: kit.id, name: kit.name, price: kit.price, image: kit.image || "", type: "kit", slug: kit.slug });
    toast.success(`¡${kit.name} agregado!`, { action: { label: "Ver carrito", onClick: openCart } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...springs.gentle, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group"
    >
      <Link href={`/combos-fiesteros/${kit.slug}`}>
        <SpotlightCard
          className="glass-card rounded-2xl overflow-hidden transition-all duration-300"
          style={{ border: "2px solid rgba(255,61,138,0.2)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,61,138,0.6)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(255,61,138,0.25)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,61,138,0.2)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
        >
          <GlareHover className="relative aspect-[4/3] overflow-hidden block" style={{ background: "linear-gradient(135deg, #1E1A17, rgba(34,177,76,0.18))" }}>
            {kit.image ? (
              <Image src={kit.image} alt={kit.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">🎁</div>
            )}
            {kit.badge && (
              <div className="absolute top-3 right-3">
                <Badge className="font-black text-xs border-0 text-white" style={{ background: "linear-gradient(135deg, #F2A900, #C98700)" }}>{kit.badge}</Badge>
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-3 left-3">
                <Badge className="font-black text-white border-0" style={{ background: "#FF3D8A" }}>AHORRÁ {discount}%</Badge>
              </div>
            )}
          </GlareHover>
          <div className="p-5 space-y-3">
            <div className="flex items-start gap-2">
              <Package className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#FF3D8A" }} />
              <div>
                <h3 className="font-black text-lg leading-tight" style={{ color: "#F5F2EC" }}>{kit.name}</h3>
                {kit.description && <p className="text-xs mt-1 line-clamp-2" style={{ color: "#B8B1A7" }}>{kit.description}</p>}
              </div>
            </div>
            {kit.kitProducts && kit.kitProducts.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {kit.kitProducts.slice(0, 3).map((kp) => (
                  <span key={kp.id} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(34,177,76,0.12)", color: "#4CD671", border: "1px solid rgba(34,177,76,0.25)" }}>
                    {kp.quantity}x {kp.product?.name?.split(" ").slice(0, 2).join(" ")}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-2xl font-black" style={{ color: "#4CD671" }}>{formatPrice(kit.price)}</p>
                {kit.comparePrice && <p className="text-sm line-through" style={{ color: "#B8B1A7" }}>{formatPrice(kit.comparePrice)}</p>}
              </div>
              <ClickSpark className="shrink-0">
                <Button size="sm" className="btn-primary gap-2 shrink-0 text-white" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4" />Agregar
                </Button>
              </ClickSpark>
            </div>
          </div>
        </SpotlightCard>
      </Link>
    </motion.div>
  );
}
