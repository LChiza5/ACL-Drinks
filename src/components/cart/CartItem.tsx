"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types";

export function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-brand-mid shrink-0">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-2xl">{item.type === "kit" ? "🎁" : "🍾"}</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm leading-tight line-clamp-2">{item.name}</p>
        <p className="text-neon-purple font-bold text-sm mt-0.5">{formatPrice(item.price)}</p>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border border-border hover:border-neon-purple" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-bold text-white w-5 text-center">{item.quantity}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border border-border hover:border-neon-purple" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
