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
      iconBg="linear-gradient(135deg, #22c55e, #16a34a)"
      labelBg="#166534"
      iconGlow="0 4px 20px rgba(34,197,94,0.4)"
      bottomClass="bottom-6"
      delay={1}
    />
  );
}
