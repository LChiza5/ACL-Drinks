import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import type { ApiResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json<ApiResponse>({ success: false, error: "No se recibió archivo" }, { status: 400 });

    const buffer = await file.arrayBuffer();
    const base64 = `data:${file.type};base64,${Buffer.from(buffer).toString("base64")}`;
    const url = await uploadImage(base64, "acldrinks/products");

    return NextResponse.json<ApiResponse<{ url: string }>>({ success: true, data: { url } });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al subir imagen" }, { status: 500 });
  }
}
