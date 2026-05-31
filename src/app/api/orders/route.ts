import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateOrderNumber, generateTrackingCode } from "@/lib/utils";
import { DELIVERY_FEE_NATIONAL, FREE_DELIVERY_THRESHOLD } from "@/constants";
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
    const { items, discount = 0, paymentMethod, deliveryAddress, notes, guestEmail, guestName, guestPhone } = body as {
      items: CartItem[];
      discount?: number;
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

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE_NATIONAL;
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
          create: items.map((item) => ({
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

    return NextResponse.json<ApiResponse>({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al crear el pedido" }, { status: 500 });
  }
}
