"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, Menu, X, MapPin, LogOut, LayoutDashboard, Package } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCartStore, useCartTotals } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, INSTAGRAM_URL } from "@/constants";
import { getInitials } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/categories", label: "Categorías" },
  { href: "/kits", label: "Kits" },
  { href: "/offers", label: "Ofertas 🔥" },
];

export function Navbar() {
  const { data: session } = useSession();
  const { openCart } = useCartStore();
  const { totalItems } = useCartTotals();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-neon-purple/20">
      <div className="container-max">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <span className="text-2xl font-black gradient-text tracking-tight">🍾 BrandName</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg transition-all">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link href="/tracking">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <MapPin className="h-3.5 w-3.5" />Rastrear
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-green-400 hover:text-green-300 hover:bg-green-500/10">
                <FaWhatsapp className="h-5 w-5" />
              </Button>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10">
                <FaInstagram className="h-5 w-5" />
              </Button>
            </a>
            <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-neon-pink text-white text-xs font-bold flex items-center justify-center animate-bounce-subtle">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Button>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback className="text-xs">{getInitials(session.user?.name || "U")}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/profile" className="flex items-center gap-2"><User className="h-4 w-4" />Mi Perfil</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/orders" className="flex items-center gap-2"><Package className="h-4 w-4" />Mis Pedidos</Link></DropdownMenuItem>
                  {(session.user?.role === "ADMIN" || session.user?.role === "MANAGER") && (
                    <DropdownMenuItem asChild><Link href="/dashboard" className="flex items-center gap-2"><LayoutDashboard className="h-4 w-4" />Dashboard</Link></DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-destructive focus:text-destructive flex items-center gap-2">
                    <LogOut className="h-4 w-4" />Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login"><Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button></Link>
            )}
            <Link href="/products">
              <Button size="sm" className="btn-neon font-bold text-xs px-4">🍾 NECESITO GUARO YA</Button>
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-neon-pink text-white text-xs font-bold flex items-center justify-center">{totalItems}</span>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden border-t border-border overflow-hidden">
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg transition-all">{link.label}</Link>
                ))}
                <div className="pt-3 flex flex-col gap-2">
                  <Link href="/tracking" onClick={closeMobileMenu}><Button variant="outline" className="w-full gap-2"><MapPin className="h-4 w-4" />Rastrear Pedido</Button></Link>
                  <Link href="/products" onClick={closeMobileMenu}><Button className="w-full btn-neon font-bold">🍾 NECESITO GUARO YA</Button></Link>
                  {session ? (
                    <>
                      <Link href="/profile" onClick={closeMobileMenu}><Button variant="ghost" className="w-full justify-start gap-2"><User className="h-4 w-4" />Mi Perfil</Button></Link>
                      <Button variant="ghost" className="w-full justify-start gap-2 text-destructive" onClick={() => { signOut(); closeMobileMenu(); }}><LogOut className="h-4 w-4" />Cerrar Sesión</Button>
                    </>
                  ) : (
                    <Link href="/login" onClick={closeMobileMenu}><Button variant="ghost" className="w-full justify-start gap-2"><User className="h-4 w-4" />Iniciar Sesión</Button></Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
