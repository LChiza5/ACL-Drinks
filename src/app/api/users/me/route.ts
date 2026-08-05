import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ApiResponse } from "@/types";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });

    const { name, phone } = await req.json();
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, phone },
      select: { name: true, phone: true },
    });
    return NextResponse.json<ApiResponse>({ success: true, data: user });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al actualizar perfil" }, { status: 500 });
  }
}
