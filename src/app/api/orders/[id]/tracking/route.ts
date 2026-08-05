import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ApiResponse } from "@/types";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }

    const { description, location } = await req.json();
    if (!description?.trim()) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Descripción requerida" }, { status: 400 });
    }

    const shipment = await prisma.shipment.findUnique({ where: { orderId: id } });
    if (!shipment) return NextResponse.json<ApiResponse>({ success: false, error: "Envío no encontrado" }, { status: 404 });

    const tracking = await prisma.tracking.create({
      data: { shipmentId: shipment.id, status: "UPDATE", description: description.trim(), location: location?.trim() || null },
    });

    return NextResponse.json<ApiResponse>({ success: true, data: tracking }, { status: 201 });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al agregar evento" }, { status: 500 });
  }
}
