"use client";

import { FaInstagram } from "react-icons/fa";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { INSTAGRAM_URL } from "@/constants";

export function InstagramButton() {
  return (
    <FloatingActionButton
      href={INSTAGRAM_URL}
      icon={FaInstagram}
      label="Síguenos"
      ariaLabel="Seguinos en Instagram"
      iconBg="linear-gradient(135deg, #f43f5e, #ec4899, #a855f7)"
      labelBg="#9d174d"
      iconGlow="0 4px 20px rgba(219,39,119,0.4)"
      bottomClass="bottom-24"
      delay={1.2}
    />
  );
}
