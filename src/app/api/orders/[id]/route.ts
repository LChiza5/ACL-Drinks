import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ApiResponse } from "@/types";

const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "PREPARING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED", "REFUNDED"]).optional(),
  paymentStatus: z.enum(["PENDING", "PROCESSING", "COMPLETED", "FAILED", "REFUNDED"]).optional(),
});

const STATUS_MESSAGES: Partial<Record<string, string>> = {
  CONFIRMED: "Pedido confirmado ✅",
  PREPARING: "Preparando tu pedido 🍾",
  SHIPPED: "Pedido enviado 🚚",
  OUT_FOR_DELIVERY: "Tu pedido está en camino 🛵",
  DELIVERED: "Pedido entregado 🎉",
  CANCELLED: "Pedido cancelado ❌",
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { status, paymentStatus } = updateOrderSchema.parse(body);

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { payment: { update: { status: paymentStatus } } }),
      },
    });

    if (status && STATUS_MESSAGES[status]) {
      await prisma.shipment.update({
        where: { orderId: id },
        data: { trackings: { create: { status, description: STATUS_MESSAGES[status]! } } },
      });
    }

    return NextResponse.json<ApiResponse>({ success: true, data: order });
  } catch (error) {
    console.error(error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al actualizar pedido" }, { status: 500 });
  }
}
