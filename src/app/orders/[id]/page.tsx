export const dynamic = "force-dynamic";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Truck, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { ORDER_STATUSES, PAYMENT_METHODS } from "@/constants";

interface Props { params: Promise<{ id: string }> }
export const metadata: Metadata = { title: "Detalle de Pedido" };

export default async function OrderDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params;
  const order = await prisma.order.findFirst({
    where: { id, ...(session.user.role === "CUSTOMER" && { userId: session.user.id }) },
    include: { orderItems: true, payment: true, shipment: { include: { trackings: { orderBy: { timestamp: "desc" } } } } },
  });
  if (!order) notFound();

  const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
  const paymentInfo = order.payment ? PAYMENT_METHODS[order.payment.method as keyof typeof PAYMENT_METHODS] : null;
  const addr = order.deliveryAddress as Record<string, string> | null;

  return (
    <div className="section-padding container-max max-w-2xl">
      <Link href="/orders" className="inline-flex items-center gap-2 text-sm text-[#B8B1A7] hover:text-white mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />Mis pedidos
      </Link>

      <div className="glass-card rounded-2xl p-6 mb-4">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-black text-white font-mono">{order.orderNumber}</h1>
            <p className="text-sm text-muted-foreground mt-1">{formatDateTime(order.createdAt)}</p>
          </div>
          <Badge className="bg-neon-purple/20 border-neon-purple/50 text-neon-purple font-bold px-3 py-1.5">{status?.emoji} {status?.label}</Badge>
        </div>
        {order.shipment?.trackingCode && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Código de rastreo:</span>
            <span className="font-mono font-bold text-neon-amber">{order.shipment.trackingCode}</span>
          </div>
        )}
      </div>

      <div className="glass-card rounded-2xl p-6 mb-4 space-y-4">
        <h2 className="font-bold text-white">Productos</h2>
        {order.orderItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-lg overflow-hidden bg-brand-mid shrink-0 flex items-center justify-center text-2xl">
              {item.image ? <Image src={item.image} alt={item.name} width={56} height={56} className="object-cover" /> : "🍾"}
            </div>
            <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-white line-clamp-1">{item.name}</p><p className="text-xs text-muted-foreground">×{item.quantity}</p></div>
            <p className="font-bold text-white shrink-0">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
        <Separator />
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
          {order.discount > 0 && <div className="flex justify-between text-green-400"><span>Descuento</span><span>-{formatPrice(order.discount)}</span></div>}
          <div className="flex justify-between text-muted-foreground"><span>Envío</span><span>{order.deliveryFee === 0 ? <span className="text-green-400">GRATIS</span> : formatPrice(order.deliveryFee)}</span></div>
          <Separator />
          <div className="flex justify-between font-black text-white text-base"><span>Total</span><span className="text-neon-purple">{formatPrice(order.total)}</span></div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {addr && (
          <div className="glass-card rounded-2xl p-5 space-y-1">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 mb-2"><MapPin className="h-4 w-4 text-neon-pink" />Dirección</h3>
            <p className="text-sm text-white font-medium">{addr.fullName}</p>
            <p className="text-sm text-muted-foreground">{addr.address}</p>
            <p className="text-sm text-muted-foreground">{addr.district}, {addr.canton}, {addr.province}</p>
            <p className="text-sm text-muted-foreground">{addr.phone}</p>
          </div>
        )}
        {order.payment && (
          <div className="glass-card rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-white text-sm mb-2">💳 Pago</h3>
            <p className="text-sm text-white font-medium">{paymentInfo?.label}</p>
            <Badge variant={order.payment.status === "COMPLETED" ? "neon-green" : "neon-amber"} className="text-xs">
              {order.payment.status === "COMPLETED" ? "✅ Pagado" : "⏳ Pendiente"}
            </Badge>
          </div>
        )}
      </div>

      {order.shipment?.trackings && order.shipment.trackings.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Truck className="h-4 w-4 text-neon-blue" />Historial</h2>
          <div className="space-y-4">
            {order.shipment.trackings.map((t, i) => (
              <div key={t.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`p-2 rounded-full ${i === 0 ? "bg-neon-purple text-white" : "bg-muted text-muted-foreground"}`}><CheckCircle2 className="h-4 w-4" /></div>
                  {i < (order.shipment?.trackings?.length ?? 0) - 1 && <div className="w-0.5 h-6 bg-border mt-1" />}
                </div>
                <div className="pb-4">
                  <p className={`font-semibold text-sm ${i === 0 ? "text-white" : "text-muted-foreground"}`}>{t.description}</p>
                  {t.location && <p className="text-xs text-muted-foreground">{t.location}</p>}
                  <p className="text-xs text-muted-foreground mt-1">{formatDateTime(t.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
