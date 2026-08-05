"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CreditCard, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCartStore, useCartTotals } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { PAYMENT_METHODS, PROVINCES_CR, DELIVERY_FEE_NATIONAL, FREE_DELIVERY_THRESHOLD, SINPE_PHONE, SINPE_NAME } from "@/constants";
import { checkoutSchema, type CheckoutInput } from "@/validations/order";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, discount, couponCode, clearCart } = useCartStore();
  const { subtotal, total } = useCartTotals();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("SINPE");
  const [sinpe, setSinpe] = useState({ phone: SINPE_PHONE, name: SINPE_NAME });

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => {
      if (d.data?.SINPE_PHONE || d.data?.SINPE_NAME) {
        setSinpe({ phone: d.data.SINPE_PHONE ?? SINPE_PHONE, name: d.data.SINPE_NAME ?? SINPE_NAME });
      }
    }).catch(() => {});
  }, []);

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE_NATIONAL;
  const finalTotal = total + deliveryFee;

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "SINPE", isDelivery: true },
  });

  const onSubmit = async (data: CheckoutInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, items, couponCode, paymentMethod }),
      });
      const result = await res.json();
      if (!result.success) { toast.error(result.error); return; }
      clearCart();
      toast.success("¡Pedido creado! 🎉");
      router.push(`/orders/${result.data.id}`);
    } catch { toast.error("Error al procesar el pedido"); }
    finally { setIsLoading(false); }
  };

  useEffect(() => {
    if (items.length === 0) router.push("/products");
  }, [items.length, router]);

  if (items.length === 0) return null;

  return (
    <div className="section-padding container-max">
      <h1 className="text-3xl font-black text-white mb-8">Finalizar <span className="gradient-text">Compra</span> 🛍️</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!session && (
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <h2 className="font-bold text-white text-lg flex items-center gap-2"><CheckCircle className="h-5 w-5 text-neon-purple" />Datos de Contacto</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Nombre completo</Label><Input {...register("guestName")} />{errors.guestName && <p className="text-xs text-destructive">{errors.guestName.message}</p>}</div>
                  <div className="space-y-2"><Label>Teléfono</Label><Input {...register("guestPhone")} />{errors.guestPhone && <p className="text-xs text-destructive">{errors.guestPhone.message}</p>}</div>
                  <div className="space-y-2 sm:col-span-2"><Label>Email</Label><Input type="email" {...register("guestEmail")} />{errors.guestEmail && <p className="text-xs text-destructive">{errors.guestEmail.message}</p>}</div>
                </div>
              </div>
            )}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-white text-lg flex items-center gap-2"><MapPin className="h-5 w-5 text-neon-pink" />Dirección de Entrega</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Receptor</Label><Input {...register("deliveryAddress.fullName")} /></div>
                <div className="space-y-2"><Label>Teléfono</Label><Input {...register("deliveryAddress.phone")} /></div>
                <div className="space-y-2 sm:col-span-2"><Label>Dirección</Label><Input {...register("deliveryAddress.address")} /></div>
                <div className="space-y-2"><Label>Distrito</Label><Input {...register("deliveryAddress.district")} /></div>
                <div className="space-y-2"><Label>Cantón</Label><Input {...register("deliveryAddress.canton")} /></div>
                <div className="space-y-2">
                  <Label>Provincia</Label>
                  <Select onValueChange={(v) => setValue("deliveryAddress.province", v)}>
                    <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                    <SelectContent>{PROVINCES_CR.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-white text-lg flex items-center gap-2"><CreditCard className="h-5 w-5 text-neon-blue" />Método de Pago</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {(Object.entries(PAYMENT_METHODS) as [string, typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS]][]).map(([key, m]) => (
                  <button key={key} type="button" onClick={() => { setPaymentMethod(key); setValue("paymentMethod", key as never); }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === key ? "border-neon-purple bg-neon-purple/10" : "border-border hover:border-neon-purple/40"}`}>
                    <div className="text-2xl mb-1">{m.icon}</div>
                    <div className="font-semibold text-white text-sm">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.description}</div>
                  </button>
                ))}
              </div>
              {paymentMethod === "SINPE" && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 space-y-1">
                  <p className="text-sm font-semibold text-green-400">📱 SINPE Móvil</p>
                  <p className="text-white font-mono font-bold">{sinpe.phone}</p>
                  <p className="text-muted-foreground text-sm">{sinpe.name} — Monto: <strong className="text-white">{formatPrice(finalTotal)}</strong></p>
                </div>
              )}
            </div>
            <Button type="submit" size="xl" className="w-full btn-neon font-black gap-2" disabled={isLoading}>
              {isLoading ? "Procesando..." : `Confirmar Pedido — ${formatPrice(finalTotal)}`}
            </Button>
          </form>
        </div>
        <div className="glass-card rounded-2xl p-6 h-fit space-y-4 sticky top-20">
          <h3 className="font-bold text-white">Resumen</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground line-clamp-1">{item.name} ×{item.quantity}</span>
                <span className="text-white font-medium shrink-0 ml-2">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-400"><span>Descuento</span><span>-{formatPrice(discount)}</span></div>}
            <div className="flex justify-between text-muted-foreground"><span>Envío</span><span>{deliveryFee === 0 ? <span className="text-green-400">GRATIS</span> : formatPrice(deliveryFee)}</span></div>
            <Separator />
            <div className="flex justify-between font-black text-white text-base"><span>Total</span><span className="text-neon-purple">{formatPrice(finalTotal)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
