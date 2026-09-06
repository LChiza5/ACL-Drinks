"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCartSimple, Wine } from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { ClickSpark } from "@/components/ui/click-spark";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { GlareHover } from "@/components/ui/glare-hover";
import { springs } from "@/lib/motion";
import type { Product } from "@/types";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem, openCart } = useCartStore();
  const discount = getDiscountPercentage(product.price, product.comparePrice ?? 0);
  const isOutOfStock = product.inventory && product.inventory.stock - product.inventory.reserved <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] || "", type: "product", sku: product.sku || undefined, slug: product.slug });
    toast.success(`¡${product.name} agregado!`, { action: { label: "Ver carrito", onClick: openCart } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...springs.gentle, delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <SpotlightCard
          className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.5)]"
          color="rgba(34,177,76,0.20)"
          style={{ background: "#1E1A17", border: "1px solid rgba(245,242,236,0.08)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,177,76,0.5)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,242,236,0.08)"; }}
        >
          <GlareHover className="relative aspect-square overflow-hidden block" style={{ background: "#1E1A17" }}>
            {product.images[0] ? (
              <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Wine size={48} weight="duotone" color="#4A4038" />
              </div>
            )}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && <Badge className="text-xs font-bold text-white border-0 rounded-full" style={{ background: "#F2A900" }}>NUEVO</Badge>}
              {product.isOnSale && discount > 0 && <Badge className="text-xs font-bold text-white border-0 rounded-full" style={{ background: "#FF3D8A" }}>-{discount}%</Badge>}
              {isOutOfStock && <Badge variant="destructive" className="text-xs rounded-full">AGOTADO</Badge>}
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button size="sm" className="btn-primary gap-2 text-white rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" onClick={handleAddToCart} disabled={!!isOutOfStock}>
                <ShoppingCartSimple size={16} weight="bold" />Agregar
              </Button>
            </div>
          </GlareHover>
          <div className="p-4 space-y-2">
            {product.category && <span className="text-xs font-semibold" style={{ color: "#F2A900" }}>{product.category.name}</span>}
            <h3 className="font-bold text-sm leading-tight line-clamp-2 transition-colors group-hover:text-[#22B14C]" style={{ color: "#F5F2EC" }}>
              {product.name}
            </h3>
            {product.volume && <p className="text-xs" style={{ color: "#B8B1A7" }}>{product.volume} • {product.alcoholContent}% Alc.</p>}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black" style={{ color: "#4CD671" }}>{formatPrice(product.price)}</span>
              {product.comparePrice && <span className="text-sm line-through" style={{ color: "#B8B1A7" }}>{formatPrice(product.comparePrice)}</span>}
            </div>
            <ClickSpark className="block">
              <Button size="sm" className="w-full btn-primary gap-2 text-xs text-white rounded-2xl" onClick={handleAddToCart} disabled={!!isOutOfStock}>
                <ShoppingCartSimple size={14} weight="bold" />
                {isOutOfStock ? "Sin Stock" : "Agregar al Carrito"}
              </Button>
            </ClickSpark>
          </div>
        </SpotlightCard>
      </Link>
    </motion.div>
  );
}
