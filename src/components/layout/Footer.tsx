import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, INSTAGRAM_URL, DELIVERY_ZONE } from "@/constants";

export function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer className="border-t border-border bg-brand-dark/80 backdrop-blur-sm">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="block text-2xl font-black gradient-text">🍾 BrandName</Link>
            <p className="text-sm text-muted-foreground leading-relaxed">Tu licorería online de confianza en Costa Rica. Entrega rápida, precios justos y la mejor selección.</p>
            <div className="flex gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"><FaWhatsapp className="h-5 w-5" /></a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors"><FaInstagram className="h-5 w-5" /></a>
              <a href="#" className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"><FaFacebook className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Tienda</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[{href:"/products",label:"Todos los Productos"},{href:"/categories",label:"Categorías"},{href:"/kits",label:"Kits & Combos"},{href:"/offers",label:"Ofertas"}].map(l=>(
                <li key={l.href}><Link href={l.href} className="hover:text-neon-purple transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Mi Cuenta</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[{href:"/login",label:"Iniciar Sesión"},{href:"/register",label:"Registrarse"},{href:"/orders",label:"Mis Pedidos"},{href:"/tracking",label:"Rastrear Pedido"},{href:"/profile",label:"Mi Perfil"}].map(l=>(
                <li key={l.href}><Link href={l.href} className="hover:text-neon-purple transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contacto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-neon-purple mt-0.5 shrink-0" /><span>{DELIVERY_ZONE}, Costa Rica</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-neon-pink shrink-0" /><a href={`tel:${WHATSAPP_NUMBER}`} className="hover:text-neon-pink transition-colors">{WHATSAPP_NUMBER}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-neon-blue shrink-0" /><a href="mailto:info@brandname.cr" className="hover:text-neon-blue transition-colors">info@brandname.cr</a></li>
              <li className="flex items-start gap-2"><Clock className="h-4 w-4 text-neon-amber mt-0.5 shrink-0" /><span>Lun–Dom: 8am–11pm</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2025 BrandName. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-neon-purple transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-neon-purple transition-colors">Términos</Link>
          </div>
          <p>🔞 Prohibida la venta de licor a menores de 18 años.</p>
        </div>
      </div>
    </footer>
  );
}
