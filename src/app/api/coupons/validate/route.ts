import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ApiResponse } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const subtotal = parseFloat(searchParams.get("subtotal") || "0");

    if (!code) return NextResponse.json<ApiResponse>({ success: false, error: "Código requerido" }, { status: 400 });

    const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });

    if (!coupon || !coupon.isActive) return NextResponse.json<ApiResponse>({ success: false, error: "Cupón no válido o expirado" }, { status: 400 });
    if (coupon.expiresAt && coupon.expiresAt < new Date()) return NextResponse.json<ApiResponse>({ success: false, error: "Cupón expirado" }, { status: 400 });
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return NextResponse.json<ApiResponse>({ success: false, error: "Cupón agotado" }, { status: 400 });
    if (coupon.minOrder && subtotal < coupon.minOrder) return NextResponse.json<ApiResponse>({ success: false, error: `Mínimo de compra: ₡${coupon.minOrder.toLocaleString()}` }, { status: 400 });

    const discountAmount =
      coupon.type === "PERCENTAGE" ? Math.round(subtotal * (coupon.value / 100)) :
      coupon.type === "FIXED_AMOUNT" ? coupon.value :
      3500;

    return NextResponse.json<ApiResponse>({ success: true, data: { code: coupon.code, type: coupon.type, value: coupon.value, discountAmount } });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al validar cupón" }, { status: 500 });
  }
}
