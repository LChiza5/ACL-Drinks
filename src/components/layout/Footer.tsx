"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, INSTAGRAM_URL, DELIVERY_ZONE, PAYMENT_METHODS } from "@/constants";
import { fadeUp } from "@/lib/motion";
import { Logo } from "./Logo";

const contactItems = [
  { icon: MapPin, text: `${DELIVERY_ZONE}, Costa Rica`, color: "#F2A900" },
  { icon: Phone, text: WHATSAPP_NUMBER, href: `tel:${WHATSAPP_NUMBER}`, color: "#22B14C" },
  { icon: Mail, text: "info@acldrinks.cr", href: "mailto:info@acldrinks.cr", color: "#FF3D8A" },
  { icon: Clock, text: "Lun–Dom: 8am–11pm", color: "#F2A900" },
];

const shopLinks = [
  { href: "/products", label: "Todos los Productos" },
  { href: "/categories", label: "Categorías" },
  { href: "/combos-fiesteros", label: "Combos Fiesteros" },
  { href: "/rebajas", label: "Rebajas" },
];

const accountLinks = [
  { href: "/login", label: "Iniciar Sesión" },
  { href: "/register", label: "Registrarse" },
  { href: "/orders", label: "Mis Pedidos" },
  { href: "/tracking", label: "Rastrear Pedido" },
  { href: "/profile", label: "Mi Perfil" },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1.5 transition-colors hover:text-white" style={{ color: "#B8B1A7" }}>
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
      </span>
    </Link>
  );
}

export function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer style={{ background: "#1E1A17", borderTop: "1px solid rgba(242,169,0,0.15)" }}>
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <motion.div {...fadeUp(0)} className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.08, rotate: -3 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}>
                <Logo className="h-8 w-8 shrink-0" />
              </motion.div>
              <span className="text-2xl font-display font-semibold gradient-text">ACL DRINKS</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "#B8B1A7" }}>
              Tu licorería online de confianza en Costa Rica. Entrega rápida, precios justos y la mejor selección.
            </p>
            <div className="flex gap-3">
              <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
                className="p-2 rounded-lg transition-colors"
                style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80" }}>
                <FaWhatsapp className="h-5 w-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Seguinos en Instagram"
                className="p-2 rounded-lg transition-colors"
                style={{ background: "rgba(255,61,138,0.1)", color: "#FF3D8A" }}>
                <FaInstagram className="h-5 w-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} href="#" aria-label="Seguinos en Facebook"
                className="p-2 rounded-lg transition-colors"
                style={{ background: "rgba(34,177,76,0.1)", color: "#22B14C" }}>
                <FaFacebook className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div {...fadeUp(1)} className="space-y-4">
            <h3 className="font-semibold" style={{ color: "#F5F2EC" }}>Tienda</h3>
            <ul className="space-y-2 text-sm">
              {shopLinks.map(l => <li key={l.href}><FooterLink {...l} /></li>)}
            </ul>
          </motion.div>

          <motion.div {...fadeUp(2)} className="space-y-4">
            <h3 className="font-semibold" style={{ color: "#F5F2EC" }}>Mi Cuenta</h3>
            <ul className="space-y-2 text-sm">
              {accountLinks.map(l => <li key={l.href}><FooterLink {...l} /></li>)}
            </ul>
          </motion.div>

          <motion.div {...fadeUp(3)} className="space-y-4">
            <h3 className="font-semibold" style={{ color: "#F5F2EC" }}>Contacto</h3>
            <ul className="space-y-3 text-sm" style={{ color: "#B8B1A7" }}>
              {contactItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <item.icon className="h-4 w-4 mt-0.5 shrink-0" style={{ color: item.color }} />
                  {item.href ? (
                    <a href={item.href} className="hover:text-white transition-colors">{item.text}</a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-10 pt-6 flex flex-wrap items-center gap-x-3 gap-y-2"
          style={{ borderTop: "1px solid rgba(242,169,0,0.12)" }}>
          <span className="text-xs font-semibold" style={{ color: "#F5F2EC" }}>Aceptamos:</span>
          {Object.values(PAYMENT_METHODS).map((m) => (
            <span key={m.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs"
              style={{ background: "rgba(242,169,0,0.1)", color: "#B8B1A7" }}>
              <span>{m.icon}</span>{m.label}
            </span>
          ))}
        </div>

        {/* pb-24 clears the fixed WhatsApp/Instagram buttons stacked bottom-right on mobile,
            where this row stacks full-width instead of sharing the line with sm:flex-row */}
        <div className="mt-6 pt-6 pb-24 sm:pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(242,169,0,0.12)", color: "#B8B1A7" }}>
          <p>© {new Date().getFullYear()} ACL Drinks. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
          </div>
          <p>🔞 Prohibida la venta de licor a menores de 18 años.</p>
        </div>
      </div>
    </footer>
  );
}
