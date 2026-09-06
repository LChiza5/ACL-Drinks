"use client";

import { useState } from "react";
import { ShoppingCartSimple as ShoppingCart, Minus, Plus, Check } from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { ClickSpark } from "@/components/ui/click-spark";
import type { Product } from "@/types";

export function AddToCartButton({ product, inStock }: { product: Product; inStock: boolean }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAdd = () => {
    if (!inStock) return;
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] || "", type: "product", sku: product.sku || undefined, slug: product.slug, quantity: qty });
    setAdded(true);
    toast.success(`¡${product.name} agregado!`, { action: { label: "Ver carrito", onClick: openCart } });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground font-medium">Cantidad:</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}><Minus className="h-3.5 w-3.5" /></Button>
          <span className="w-8 text-center font-bold text-white text-lg">{qty}</span>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => setQty(Math.min(20, qty + 1))} disabled={qty >= 20}><Plus className="h-3.5 w-3.5" /></Button>
        </div>
      </div>
      <ClickSpark>
        <Button size="xl" className="w-full btn-neon gap-3 font-black text-base" onClick={handleAdd} disabled={!inStock}>
          {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
          {inStock ? (added ? "¡Agregado!" : "Agregar al Carrito") : "Sin Stock"}
        </Button>
      </ClickSpark>
    </div>
  );
}
