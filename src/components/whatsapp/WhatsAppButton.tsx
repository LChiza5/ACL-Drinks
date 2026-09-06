"use client";

import { FaWhatsapp } from "react-icons/fa";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/constants";

export function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <FloatingActionButton
      href={url}
      icon={FaWhatsapp}
      label="Soporte"
      ariaLabel="Contactar por WhatsApp"
      iconBg="linear-gradient(135deg, #25D366 0%, #128C7E 100%)"
      iconGlow="0 6px 24px rgba(37,211,102,0.45)"
      bottomClass="bottom-6"
      delay={1}
    />
  );
}
