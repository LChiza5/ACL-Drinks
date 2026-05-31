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
import type { Kit } from "@/types";

export function KitCard({ kit, index = 0 }: { kit: Kit; index?: number }) {
  const { addItem, openCart } = useCartStore();
  const discount = getDiscountPercentage(kit.price, kit.comparePrice ?? 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id: kit.id, name: kit.name, price: kit.price, image: kit.image || "", type: "kit", slug: kit.slug });
    toast.success(`¡${kit.name} agregado! 🎉`, { action: { label: "Ver carrito", onClick: openCart } });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -6 }} className="group">
      <Link href={`/kits/${kit.slug}`}>
        <div className="glass-card rounded-2xl overflow-hidden border-2 border-neon-purple/20 hover:border-neon-purple/60 transition-all duration-300 hover:shadow-neon-purple">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-mid to-neon-purple/10 overflow-hidden">
            {kit.image ? (
              <Image src={kit.image} alt={kit.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">🎁</div>
            )}
            {kit.badge && <div className="absolute top-3 right-3"><Badge className="bg-gradient-to-r from-neon-amber to-yellow-500 text-black font-black text-xs border-0">{kit.badge}</Badge></div>}
            {discount > 0 && <div className="absolute top-3 left-3"><Badge variant="sale" className="font-black">AHORRÁ {discount}%</Badge></div>}
          </div>
          <div className="p-5 space-y-3">
            <div className="flex items-start gap-2">
              <Package className="h-5 w-5 text-neon-purple shrink-0 mt-0.5" />
              <div>
                <h3 className="font-black text-white text-lg leading-tight">{kit.name}</h3>
                {kit.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{kit.description}</p>}
              </div>
            </div>
            {kit.kitProducts && kit.kitProducts.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {kit.kitProducts.slice(0, 3).map((kp) => (
                  <span key={kp.id} className="text-xs px-2 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20">{kp.quantity}x {kp.product?.name?.split(" ").slice(0, 2).join(" ")}</span>
                ))}
              </div>
            )}
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-2xl font-black text-white">{formatPrice(kit.price)}</p>
                {kit.comparePrice && <p className="text-sm text-muted-foreground line-through">{formatPrice(kit.comparePrice)}</p>}
              </div>
              <Button size="sm" className="btn-neon gap-2 shrink-0" onClick={handleAddToCart}><ShoppingCart className="h-4 w-4" />Agregar</Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
