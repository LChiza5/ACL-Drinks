import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ApiResponse } from "@/types";

const VALID_ROLES = ["ADMIN", "MANAGER", "CUSTOMER"] as const;

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json<ApiResponse>({ success: false, error: "Solo ADMIN puede cambiar roles" }, { status: 403 });
    }
    if (id === session.user.id) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No puedes cambiar tu propio rol" }, { status: 400 });
    }

    const { role } = await req.json();
    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Rol inválido" }, { status: 400 });
    }

    const user = await prisma.user.update({ where: { id }, data: { role }, select: { id: true, role: true } });
    return NextResponse.json<ApiResponse>({ success: true, data: user });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al cambiar rol" }, { status: 500 });
  }
}
