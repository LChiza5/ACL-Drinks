import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
    }
    const { productId } = await params;
    const body = await req.json();
    const update: Record<string, number> = {};
    if (body.stock !== undefined) update.stock = Math.max(0, Number(body.stock));
    if (body.lowStock !== undefined) update.lowStock = Math.max(0, Number(body.lowStock));

    const inventory = await prisma.inventory.upsert({
      where: { productId },
      update,
      create: { productId, stock: update.stock ?? 0, lowStock: update.lowStock ?? 5 },
    });
    return NextResponse.json({ success: true, data: inventory });
  } catch {
    return NextResponse.json({ success: false, error: "Error al actualizar inventario" }, { status: 500 });
  }
}
