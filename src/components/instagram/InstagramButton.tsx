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
      iconBg="linear-gradient(135deg, #f09433 0%, #dc2743 45%, #bc1888 100%)"
      iconGlow="0 6px 24px rgba(220,39,67,0.45)"
      bottomClass="bottom-28"
      delay={1.2}
    />
  );
}
