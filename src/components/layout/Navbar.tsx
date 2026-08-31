"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard, Package } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCartStore, useCartTotals } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, INSTAGRAM_URL } from "@/constants";
import { getInitials } from "@/lib/utils";
import { springs } from "@/lib/motion";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/categories", label: "Categorías" },
  { href: "/combos-fiesteros", label: "Combos Fiesteros" },
  { href: "/rebajas", label: "Rebajas" },
  { href: "/tracking", label: "Rastrear Pedido" },
];

export function Navbar() {
  const { data: session } = useSession();
  const { openCart } = useCartStore();
  const { totalItems } = useCartTotals();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 w-full glass-card transition-shadow duration-300"
      style={{
        borderBottom: `1px solid rgba(212,167,44,${scrolled ? 0.28 : 0.15})`,
        boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.35)" : "none",
      }}
    >
      <div className="container-max">
        <div
          className="flex items-center justify-between px-4 lg:px-6 transition-[height] duration-300"
          style={{ height: scrolled ? "3.5rem" : "4rem" }}
        >

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={closeMobileMenu}>
            <motion.div whileHover={{ scale: 1.08, rotate: -3 }} whileTap={{ scale: 0.94 }} transition={springs.snappy}>
              <Logo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />
            </motion.div>
            <span className="text-lg sm:text-2xl font-display font-semibold gradient-text tracking-tight">ACL DRINKS</span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-pill relative px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 hover:text-white"
                  style={{ color: isActive ? "#7EE0B8" : "#B8B1A7" }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-dot"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-1 w-1 rounded-full"
                      style={{ background: "#16A673" }}
                      transition={springs.snappy}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Acciones desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-11 w-11 text-green-400 hover:text-green-300 hover:bg-green-500/10 transition-transform hover:scale-110 active:scale-95">
                <FaWhatsapp className="h-6 w-6" />
              </Button>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-11 w-11 hover:bg-hibiscus-500/10 transition-transform hover:scale-110 active:scale-95" style={{ color: "#F0356E" }}>
                <FaInstagram className="h-6 w-6" />
              </Button>
            </a>
            <Button variant="ghost" size="icon" className="h-11 w-11 relative transition-transform hover:scale-110 active:scale-95" style={{ color: "#F5F2EC" }} onClick={openCart}>
              <ShoppingCart className="h-6 w-6" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={springs.bouncy}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    style={{ background: "#F0356E" }}
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-11 w-11">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback className="text-xs font-bold" style={{ background: "#D4A72C", color: "#2A1F0C" }}>
                        {getInitials(session.user?.name || "U")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2"><User className="h-4 w-4" />Mi Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center gap-2"><Package className="h-4 w-4" />Mis Pedidos</Link>
                  </DropdownMenuItem>
                  {(session.user?.role === "ADMIN" || session.user?.role === "MANAGER") && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2"><LayoutDashboard className="h-4 w-4" />Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-destructive focus:text-destructive flex items-center gap-2">
                    <LogOut className="h-4 w-4" />Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="h-11 w-11" style={{ color: "#F5F2EC" }}>
                  <User className="h-6 w-6" />
                </Button>
              </Link>
            )}
            <Link href="/products">
              <Button size="sm" className="btn-primary font-bold text-sm px-5 text-white rounded-lg">
                COMPRAR AHORA
              </Button>
            </Link>
          </div>

          {/* Mobile: carrito + hamburgesa */}
          <div className="flex lg:hidden items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" style={{ color: "#F5F2EC" }} onClick={openCart}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: "#F0356E" }}>
                  {totalItems}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" style={{ color: "#F5F2EC" }} onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Menú mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={springs.gentle}
              className="lg:hidden overflow-hidden"
              style={{ borderTop: "1px solid rgba(212,167,44,0.15)" }}
            >
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link, i) => {
                  const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...springs.gentle, delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="block px-4 py-3 text-sm font-semibold rounded-lg transition-all hover:text-white hover:bg-white/5"
                        style={{ color: isActive ? "#7EE0B8" : "#B8B1A7" }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="pt-3 flex flex-col gap-2">
                  <Link href="/products" onClick={closeMobileMenu}>
                    <Button className="w-full btn-primary font-bold text-white">COMPRAR AHORA</Button>
                  </Link>
                  {session ? (
                    <>
                      <Link href="/profile" onClick={closeMobileMenu}>
                        <Button variant="ghost" className="w-full justify-start gap-2" style={{ color: "#F5F2EC" }}>
                          <User className="h-4 w-4" />Mi Perfil
                        </Button>
                      </Link>
                      <Link href="/orders" onClick={closeMobileMenu}>
                        <Button variant="ghost" className="w-full justify-start gap-2" style={{ color: "#F5F2EC" }}>
                          <Package className="h-4 w-4" />Mis Pedidos
                        </Button>
                      </Link>
                      {(session.user?.role === "ADMIN" || session.user?.role === "MANAGER") && (
                        <Link href="/dashboard" onClick={closeMobileMenu}>
                          <Button variant="ghost" className="w-full justify-start gap-2" style={{ color: "#D4A72C" }}>
                            <LayoutDashboard className="h-4 w-4" />Dashboard
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" className="w-full justify-start gap-2 text-destructive" onClick={() => { signOut(); closeMobileMenu(); }}>
                        <LogOut className="h-4 w-4" />Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <Link href="/login" onClick={closeMobileMenu}>
                      <Button variant="outline" className="w-full justify-center gap-2 font-semibold" style={{ borderColor: "rgba(212,167,44,0.5)", color: "#F5F2EC" }}>
                        <User className="h-4 w-4" />Iniciar Sesión
                      </Button>
                    </Link>
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
