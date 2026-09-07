"use client";

import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import type { CartItem } from "@/types";

/**
 * The only client-side piece of a product card. Keeping it separate means a
 * grid of N products ships N small button islands instead of N fully
 * hydrated cards — the difference shows up directly in INP on the catalog.
 */
type Props = {
  item: Omit<CartItem, "quantity">;
  disabled?: boolean;
  label?: string;
  disabledLabel?: string;
  className?: string;
  iconSize?: number;
};

export function AddToCartControl({
  item,
  disabled = false,
  label = "Agregar al carrito",
  disabledLabel = "Sin stock",
  className = "",
  iconSize = 15,
}: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleClick = (e: React.MouseEvent) => {
    // The whole card is a stretched link to the detail page; adding to the cart
    // must not navigate away from the grid.
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    addItem(item);
    toast.success(`${item.name} agregado`, {
      action: { label: "Ver carrito", onClick: openCart },
    });
  };

  return (
    <Button
      type="button"
      size="sm"
      onClick={handleClick}
      disabled={disabled}
      aria-label={disabled ? `${item.name}: sin stock` : `Agregar ${item.name} al carrito`}
      className={`btn-primary w-full gap-2 rounded-xl text-white ${className}`}
    >
      <ShoppingCartSimple size={iconSize} weight="bold" aria-hidden="true" />
      {disabled ? disabledLabel : label}
    </Button>
  );
}
