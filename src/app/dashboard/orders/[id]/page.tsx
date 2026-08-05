import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, Truck, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { ORDER_STATUSES, PAYMENT_METHODS } from "@/constants";
import { OrderStatusSelect, MarkPaidButton } from "@/components/dashboard/OrderStatusSelect";
import { AddTrackingForm } from "@/components/dashboard/AddTrackingForm";

export const metadata: Metadata = { title: "Detalle Pedido - Dashboard" };

export default async function DashboardOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: true,
      payment: true,
      user: { select: { name: true, email: true, phone: true } },
      shipment: { include: { trackings: { orderBy: { timestamp: "desc" } } } },
    },
  });
  if (!order) notFound();

  const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
  const paymentInfo = order.payment ? PAYMENT_METHODS[order.payment.method as keyof typeof PAYMENT_METHODS] : null;
  const addr = order.deliveryAddress as Record<string, string> | null;
  const customer = order.user ?? { name: order.guestName, email: order.guestEmail, phone: order.guestPhone };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/orders" className="text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-black text-white font-mono">{order.orderNumber}</h1>
        <Badge className="bg-neon-purple/20 border-neon-purple/50 text-neon-purple">{status?.emoji} {status?.label}</Badge>
      </div>

      {/* Controls */}
      <div className="glass-card rounded-2xl p-5 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Estado:</span>
          <OrderStatusSelect orderId={order.id} current={order.status} />
        </div>
        {order.payment && order.payment.status !== "COMPLETED" && (
          <MarkPaidButton orderId={order.id} />
        )}
        {order.payment?.status === "COMPLETED" && (
          <span className="text-xs text-green-400 font-bold">✅ Pagado</span>
        )}
        <div className="ml-auto text-right">
          <p className="text-2xl font-black text-neon-purple">{formatPrice(order.total)}</p>
          <p className="text-xs text-muted-foreground">{formatDateTime(order.createdAt)}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Items */}
        <div className="glass-card rounded-2xl p-5 space-y-3 md:col-span-2">
          <h2 className="font-bold text-white text-sm">Productos</h2>
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-brand-mid shrink-0 flex items-center justify-center text-xl">
                {item.image ? <Image src={item.image} alt={item.name} width={48} height={48} className="object-cover" /> : "🍾"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white line-clamp-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">×{item.quantity} · {item.sku || "—"}</p>
              </div>
              <p className="font-bold text-white shrink-0">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
          <Separator />
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-green-400"><span>Descuento</span><span>-{formatPrice(order.discount)}</span></div>}
            <div className="flex justify-between text-muted-foreground"><span>Envío</span><span>{order.deliveryFee === 0 ? "GRATIS" : formatPrice(order.deliveryFee)}</span></div>
            <div className="flex justify-between font-black text-white"><span>Total</span><span>{formatPrice(order.total)}</span></div>
          </div>
        </div>

        {/* Customer */}
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <h2 className="font-bold text-white text-sm mb-3">👤 Cliente</h2>
          <p className="text-white font-medium">{customer.name || "—"}</p>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
          {customer.phone && <p className="text-sm text-muted-foreground">{customer.phone}</p>}
          <Badge variant="outline" className="text-xs">{order.userId ? "Registrado" : "Invitado"}</Badge>
        </div>

        {/* Address & Payment */}
        <div className="space-y-4">
          {addr && (
            <div className="glass-card rounded-2xl p-5 space-y-1">
              <h2 className="font-bold text-white text-sm flex items-center gap-2 mb-2"><MapPin className="h-4 w-4 text-neon-pink" />Dirección</h2>
              <p className="text-sm text-white">{addr.fullName}</p>
              <p className="text-sm text-muted-foreground">{addr.address}</p>
              <p className="text-sm text-muted-foreground">{addr.district}, {addr.canton}, {addr.province}</p>
              <p className="text-sm text-muted-foreground">{addr.phone}</p>
            </div>
          )}
          {order.payment && (
            <div className="glass-card rounded-2xl p-5 space-y-1">
              <h2 className="font-bold text-white text-sm mb-2">💳 Pago</h2>
              <p className="text-sm text-white">{paymentInfo?.label}</p>
              <Badge variant={order.payment.status === "COMPLETED" ? "neon-green" : "neon-amber"} className="text-xs">
                {order.payment.status === "COMPLETED" ? "✅ Pagado" : "⏳ Pendiente"}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Tracking */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <h2 className="font-bold text-white flex items-center gap-2"><Truck className="h-4 w-4 text-neon-blue" />Historial de envío</h2>
        <AddTrackingForm orderId={order.id} />
        <div className="space-y-3 mt-2">
          {order.shipment?.trackings?.map((t, i) => (
            <div key={t.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full ${i === 0 ? "bg-neon-purple text-white" : "bg-muted text-muted-foreground"}`}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                {i < (order.shipment?.trackings?.length ?? 0) - 1 && <div className="w-0.5 h-5 bg-border mt-1" />}
              </div>
              <div className="pb-3">
                <p className={`text-sm font-semibold ${i === 0 ? "text-white" : "text-muted-foreground"}`}>{t.description}</p>
                {t.location && <p className="text-xs text-muted-foreground">{t.location}</p>}
                <p className="text-xs text-muted-foreground mt-0.5">{formatDateTime(t.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
