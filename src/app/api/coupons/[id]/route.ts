import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ApiResponse } from "@/types";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }
    const { isActive } = await req.json();
    const coupon = await prisma.coupon.update({ where: { id }, data: { isActive } });
    return NextResponse.json<ApiResponse>({ success: true, data: coupon });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al actualizar cupón" }, { status: 500 });
  }
}
