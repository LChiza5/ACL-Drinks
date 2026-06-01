import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, INSTAGRAM_URL, DELIVERY_ZONE } from "@/constants";

export function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer style={{ background: "#1E1A17", borderTop: "1px solid rgba(166,124,82,0.15)" }}>
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="space-y-4">
            <Link href="/" className="block text-2xl font-black gradient-text">ACL DRINKS</Link>
            <p className="text-sm leading-relaxed" style={{ color: "#B8B1A7" }}>
              Tu licorería online de confianza en Costa Rica. Entrega rápida, precios justos y la mejor selección.
            </p>
            <div className="flex gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors"
                style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80" }}>
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors"
                style={{ background: "rgba(201,152,74,0.1)", color: "#C9984A" }}>
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#"
                className="p-2 rounded-lg transition-colors"
                style={{ background: "rgba(166,124,82,0.1)", color: "#A67C52" }}>
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold" style={{ color: "#F5F2EC" }}>Tienda</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/products", label: "Todos los Productos" },
                { href: "/categories", label: "Categorías" },
                { href: "/combos-fiesteros", label: "Combos Fiesteros" },
                { href: "/rebajas", label: "Rebajas" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white" style={{ color: "#B8B1A7" }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold" style={{ color: "#F5F2EC" }}>Mi Cuenta</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/login", label: "Iniciar Sesión" },
                { href: "/register", label: "Registrarse" },
                { href: "/orders", label: "Mis Pedidos" },
                { href: "/tracking", label: "Rastrear Pedido" },
                { href: "/profile", label: "Mi Perfil" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white" style={{ color: "#B8B1A7" }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold" style={{ color: "#F5F2EC" }}>Contacto</h3>
            <ul className="space-y-3 text-sm" style={{ color: "#B8B1A7" }}>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#A67C52" }} />
                <span>{DELIVERY_ZONE}, Costa Rica</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" style={{ color: "#C9984A" }} />
                <a href={`tel:${WHATSAPP_NUMBER}`} className="hover:text-white transition-colors">{WHATSAPP_NUMBER}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" style={{ color: "#A67C52" }} />
                <a href="mailto:info@acldrinks.cr" className="hover:text-white transition-colors">info@acldrinks.cr</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#C9984A" }} />
                <span>Lun–Dom: 8am–11pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(166,124,82,0.12)", color: "#B8B1A7" }}>
          <p>© 2025 ACL Drinks. Todos los derechos reservados.</p>
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
