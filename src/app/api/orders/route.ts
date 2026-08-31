import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateOrderNumber, generateTrackingCode } from "@/lib/utils";
import { DELIVERY_FEE_NATIONAL, FREE_DELIVERY_THRESHOLD } from "@/constants";
import { sendOrderConfirmation } from "@/lib/email";
import type { ApiResponse, CartItem } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });

    const isAdmin = session.user.role === "ADMIN" || session.user.role === "MANAGER";
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status") || undefined;

    const where = isAdmin ? { ...(status && { status: status as never }) } : { userId: session.user.id };
    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        include: { orderItems: true, payment: true, shipment: { include: { trackings: { orderBy: { timestamp: "desc" } } } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json<ApiResponse>({ success: true, data: { data: orders, total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al obtener pedidos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { items, couponCode, paymentMethod, deliveryAddress, notes, guestEmail, guestName, guestPhone } = body as {
      items: CartItem[];
      couponCode?: string;
      paymentMethod: string;
      deliveryAddress: Record<string, string>;
      notes?: string;
      guestEmail?: string;
      guestName?: string;
      guestPhone?: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json<ApiResponse>({ success: false, error: "El carrito está vacío" }, { status: 400 });
    }

    // Re-fetch real prices server-side — never trust item.price from the client body.
    const productIds = items.filter((i) => i.type === "product").map((i) => i.id);
    const kitIds = items.filter((i) => i.type === "kit").map((i) => i.id);
    const [dbProducts, dbKits] = await Promise.all([
      productIds.length ? prisma.product.findMany({ where: { id: { in: productIds }, isActive: true }, select: { id: true, price: true } }) : [],
      kitIds.length ? prisma.kit.findMany({ where: { id: { in: kitIds }, isActive: true }, select: { id: true, price: true } }) : [],
    ]);
    const priceById = new Map([...dbProducts, ...dbKits].map((p) => [p.id, p.price]));

    const verifiedItems = items.map((item) => {
      const realPrice = priceById.get(item.id);
      if (realPrice === undefined) throw new Error(`Producto no disponible: ${item.name}`);
      return { ...item, price: realPrice };
    });

    const subtotal = verifiedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE_NATIONAL;

    // Validate coupon server-side — never trust the client discount
    let discount = 0;
    let validCoupon: Awaited<ReturnType<typeof prisma.coupon.findUnique>> | null = null;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: String(couponCode).toUpperCase() } });
      const valid = coupon &&
        coupon.isActive &&
        !(coupon.expiresAt && coupon.expiresAt < new Date()) &&
        !(coupon.maxUses && coupon.usedCount >= coupon.maxUses) &&
        !(coupon.minOrder && subtotal < coupon.minOrder);
      if (valid && coupon) {
        validCoupon = coupon;
        discount =
          coupon.type === "PERCENTAGE" ? Math.round(subtotal * (coupon.value / 100)) :
          coupon.type === "FIXED_AMOUNT" ? coupon.value :
          deliveryFee; // FREE_SHIPPING: discount equals delivery fee
      }
    }

    const total = subtotal - discount + deliveryFee;

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session?.user.id || null,
        guestEmail,
        guestName,
        guestPhone,
        status: "PENDING",
        subtotal,
        discount,
        deliveryFee,
        total,
        notes,
        deliveryAddress,
        orderItems: {
          create: verifiedItems.map((item) => ({
            productId: item.type === "product" ? item.id : null,
            kitId: item.type === "kit" ? item.id : null,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            sku: item.sku,
          })),
        },
        payment: { create: { method: paymentMethod as never, status: "PENDING", amount: total } },
        shipment: {
          create: {
            trackingCode: generateTrackingCode(),
            trackings: { create: { status: "CONFIRMED", description: "Pedido confirmado y en proceso de preparación 🍾" } },
          },
        },
      },
      include: { orderItems: true, payment: true, shipment: true },
    });

    // Decrement stock + register coupon usage (fire-and-forget style, non-blocking)
    const productItems = verifiedItems.filter((i) => i.type === "product");
    await Promise.all([
      ...productItems.map((item) =>
        prisma.inventory.updateMany({
          where: { productId: item.id, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity }, sold: { increment: item.quantity } },
        })
      ),
      ...(validCoupon ? [
        prisma.coupon.update({ where: { id: validCoupon.id }, data: { usedCount: { increment: 1 } } }),
        prisma.couponUsage.create({ data: { couponId: validCoupon.id, orderId: order.id, userId: session?.user.id ?? null } }),
      ] : []),
    ]);

    // Fire-and-forget confirmation email
    const emailTo = session?.user?.email || guestEmail;
    if (emailTo) {
      sendOrderConfirmation({ to: emailTo, orderNumber: order.orderNumber, total: order.total, items: order.orderItems }).catch(() => {});
    }

    return NextResponse.json<ApiResponse>({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al crear el pedido" }, { status: 500 });
  }
}
