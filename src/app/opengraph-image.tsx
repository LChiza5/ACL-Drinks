import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ACL Drinks - Licores a Domicilio en Costa Rica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#12110F",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <div style={{ fontSize: 100 }}>🍾</div>
      <div style={{ color: "#C9984A", fontSize: 72, fontWeight: 900, letterSpacing: -2 }}>
        ACL Drinks
      </div>
      <div style={{ color: "#B8B1A7", fontSize: 30 }}>
        Licores a Domicilio · Tilarán, Costa Rica
      </div>
    </div>,
    { ...size }
  );
}
