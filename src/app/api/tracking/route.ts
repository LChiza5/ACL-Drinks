import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ApiResponse } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const orderNumber = searchParams.get("orderNumber");

    if (!code && !orderNumber) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Proporciona un código de rastreo o número de pedido" }, { status: 400 });
    }

    const shipment = await prisma.shipment.findFirst({
      where: code ? { trackingCode: code } : { order: { orderNumber: orderNumber! } },
      include: {
        trackings: { orderBy: { timestamp: "desc" } },
        order: {
          select: { orderNumber: true, status: true, total: true, createdAt: true, guestName: true, orderItems: { select: { name: true, quantity: true, image: true } } },
        },
      },
    });

    if (!shipment) return NextResponse.json<ApiResponse>({ success: false, error: "Pedido no encontrado. Verifica el código." }, { status: 404 });
    return NextResponse.json<ApiResponse>({ success: true, data: shipment });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al rastrear el pedido" }, { status: 500 });
  }
}
