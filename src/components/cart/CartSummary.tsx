"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Tag, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore, useCartTotals } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { DELIVERY_FEE_NATIONAL, FREE_DELIVERY_THRESHOLD } from "@/constants";

export function CartSummary({ onCheckout }: { onCheckout?: () => void }) {
  const { couponCode, discount, applyCoupon, removeCoupon } = useCartStore();
  const { subtotal, total } = useCartTotals();
  const [couponInput, setCouponInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE_NATIONAL;
  const finalTotal = total + deliveryFee;

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setIsApplying(true);
    try {
      const res = await fetch(`/api/coupons/validate?code=${couponInput.trim()}&subtotal=${subtotal}`);
      const data = await res.json();
      if (data.success) {
        applyCoupon(data.data.code, data.data.discountAmount);
        toast.success(`¡Cupón aplicado! -${formatPrice(data.data.discountAmount)}`);
        setCouponInput("");
      } else {
        toast.error(data.error || "Cupón inválido");
      }
    } catch {
      toast.error("Error al validar el cupón");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="space-y-4">
      {!couponCode ? (
        <div className="flex gap-2">
          <Input placeholder="Código de cupón" value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} className="text-sm" onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()} />
          <Button variant="outline" size="sm" onClick={handleApplyCoupon} disabled={isApplying} className="shrink-0 gap-1">
            <Tag className="h-3.5 w-3.5" />Aplicar
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
          <div className="flex items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-green-400" />
            <span className="text-sm font-medium text-green-400">{couponCode}</span>
            <span className="text-xs text-muted-foreground">-{formatPrice(discount)}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-destructive" onClick={removeCoupon}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      <Separator />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        {discount > 0 && <div className="flex justify-between text-green-400"><span>Descuento</span><span>-{formatPrice(discount)}</span></div>}
        <div className="flex justify-between text-muted-foreground">
          <span>Envío</span>
          <span>{deliveryFee === 0 ? <span className="text-green-400 font-medium">GRATIS 🚚</span> : formatPrice(deliveryFee)}</span>
        </div>
        {subtotal < FREE_DELIVERY_THRESHOLD && (
          <p className="text-xs text-muted-foreground">Agrega {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} más para envío gratis</p>
        )}
        <Separator />
        <div className="flex justify-between font-black text-white text-base">
          <span>Total</span><span className="text-neon-purple">{formatPrice(finalTotal)}</span>
        </div>
      </div>
      <Link href="/checkout" onClick={onCheckout}>
        <Button className="w-full btn-neon gap-2 font-bold">Ir a Pagar <ArrowRight className="h-4 w-4" /></Button>
      </Link>
      <Link href="/products" onClick={onCheckout}>
        <Button variant="ghost" className="w-full text-sm text-muted-foreground">Seguir comprando</Button>
      </Link>
    </div>
  );
}
