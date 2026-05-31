import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/validations/auth";
import type { ApiResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = registerSchema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email: validated.email } });
    if (existing) return NextResponse.json<ApiResponse>({ success: false, error: "Ya existe una cuenta con ese email" }, { status: 400 });

    const hashed = await bcrypt.hash(validated.password, 12);
    const user = await prisma.user.create({
      data: { name: validated.name, email: validated.email, password: hashed, phone: validated.phone || null, loyaltyPoints: 1000 },
      select: { id: true, name: true, email: true, role: true, loyaltyPoints: true },
    });

    return NextResponse.json<ApiResponse>({ success: true, data: user, message: "¡Cuenta creada! ₡1.000 de bienvenida 🎉" }, { status: 201 });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al crear cuenta" }, { status: 500 });
  }
}
