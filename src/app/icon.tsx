import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg width="32" height="32" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#A67C52" />
        <path d="M17.5 6h5v2h-5z" fill="#F5F2EC" />
        <path d="M17 8h6v6l4 4v12a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V18l4-4Z" fill="#F5F2EC" />
        <rect x="14" y="21" width="12" height="2.5" fill="#12110F" opacity="0.3" />
      </svg>
    ),
    { ...size }
  );
}
