"use client";

import Link from "next/link";
import { ShoppingCart, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { useCartStore, useCartTotals } from "@/store/cart.store";

export function CartSidebar() {
  const { items, isOpen, closeCart, clearCart } = useCartStore();
  const { totalItems } = useCartTotals();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 gap-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <motion.div
                initial={{ rotate: -15, scale: 0.7 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                <ShoppingCart className="h-5 w-5 text-neon-purple" />
              </motion.div>
              Mi Carrito
              <AnimatePresence mode="popLayout">
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-neon-purple text-white text-xs font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </SheetTitle>
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive gap-1">
                <X className="h-3 w-3" />Vaciar
              </Button>
            )}
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-8xl animate-float">🛒</motion.div>
            <div>
              <h3 className="font-bold text-white text-lg">Tu carrito está vacío</h3>
              <p className="text-muted-foreground text-sm mt-1">¡Agrega algo para empezar la fiesta!</p>
            </div>
            <Link href="/products" onClick={closeCart}>
              <Button className="btn-neon gap-2 mt-2"><ShoppingBag className="h-4 w-4" />Ver Productos</Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-2">
              <div className="space-y-3">
                <AnimatePresence>
                  {items.map((item) => <CartItem key={item.id} item={item} />)}
                </AnimatePresence>
              </div>
            </ScrollArea>
            <div className="border-t border-border p-6">
              <CartSummary onCheckout={closeCart} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
