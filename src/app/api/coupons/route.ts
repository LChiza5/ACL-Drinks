import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ApiResponse } from "@/types";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json<ApiResponse>({ success: true, data: coupons });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al obtener cupones" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }
    const { code, type, value, description, minOrder, maxUses, expiresAt } = await req.json();
    if (!code || !type || !value) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Código, tipo y valor son requeridos" }, { status: 400 });
    }
    const coupon = await prisma.coupon.create({
      data: {
        code: String(code).toUpperCase(),
        type,
        value: Number(value),
        description: description || null,
        minOrder: minOrder ? Number(minOrder) : null,
        maxUses: maxUses ? Number(maxUses) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });
    return NextResponse.json<ApiResponse>({ success: true, data: coupon }, { status: 201 });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al crear cupón (el código ya existe?)" }, { status: 500 });
  }
}
