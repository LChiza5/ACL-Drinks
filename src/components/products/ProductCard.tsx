"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem, openCart } = useCartStore();
  const discount = getDiscountPercentage(product.price, product.comparePrice ?? 0);
  const isOutOfStock = product.inventory && product.inventory.stock - product.inventory.reserved <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] || "", type: "product", sku: product.sku || undefined, slug: product.slug });
    toast.success(`¡${product.name} agregado! 🍾`, { action: { label: "Ver carrito", onClick: openCart } });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ y: -4 }} className="group">
      <Link href={`/products/${product.slug}`}>
        <div className="glass-card rounded-2xl overflow-hidden border border-border hover:border-neon-purple/40 transition-all duration-300 hover:shadow-card-hover">
          <div className="relative aspect-square overflow-hidden bg-brand-mid">
            {product.images[0] ? (
              <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-6xl">🍾</div>
            )}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && <Badge variant="new" className="text-xs">NUEVO</Badge>}
              {product.isOnSale && discount > 0 && <Badge variant="sale" className="text-xs">-{discount}%</Badge>}
              {isOutOfStock && <Badge variant="destructive" className="text-xs">AGOTADO</Badge>}
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button size="sm" className="btn-neon gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" onClick={handleAddToCart} disabled={!!isOutOfStock}>
                <ShoppingCart className="h-4 w-4" />Agregar
              </Button>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {product.category && <span className="text-xs text-neon-purple font-medium">{product.category.name}</span>}
            <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 group-hover:text-neon-purple transition-colors">{product.name}</h3>
            {product.volume && <p className="text-xs text-muted-foreground">{product.volume} • {product.alcoholContent}% Alc.</p>}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white">{formatPrice(product.price)}</span>
              {product.comparePrice && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>}
            </div>
            <Button size="sm" className="w-full btn-neon gap-2 text-xs" onClick={handleAddToCart} disabled={!!isOutOfStock}>
              <ShoppingCart className="h-3.5 w-3.5" />{isOutOfStock ? "Sin Stock" : "Agregar al Carrito"}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
