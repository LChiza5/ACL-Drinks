export const SITE_NAME = process.env.NEXT_PUBLIC_APP_NAME || "ACL Drinks";
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const DELIVERY_ZONE = process.env.NEXT_PUBLIC_DELIVERY_ZONE || "Tilarán, Guanacaste";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+50688888888";
export const WHATSAPP_MESSAGE = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Hola! Quiero hacer un pedido";
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/acldrinks";

export const DELIVERY_FEE_LOCAL = 0;
export const DELIVERY_FEE_NATIONAL = 3500;
export const FREE_DELIVERY_THRESHOLD = 30000;
export const SINPE_PHONE = process.env.SINPE_PHONE || "+50688888888";
export const SINPE_NAME = process.env.SINPE_NAME || "ACL Drinks CR";

export const ORDER_STATUSES = {
  PENDING: { label: "Pendiente", color: "amber", emoji: "⏳" },
  CONFIRMED: { label: "Confirmado", color: "blue", emoji: "✅" },
  PREPARING: { label: "Preparando", color: "amber", emoji: "🍾" },
  SHIPPED: { label: "Enviado", color: "cyan", emoji: "🚚" },
  OUT_FOR_DELIVERY: { label: "En camino", color: "orange", emoji: "🛵" },
  DELIVERED: { label: "Entregado", color: "green", emoji: "🎉" },
  CANCELLED: { label: "Cancelado", color: "red", emoji: "❌" },
  REFUNDED: { label: "Reembolsado", color: "gray", emoji: "💸" },
} as const;

export const PAYMENT_METHODS = {
  SINPE: { label: "SINPE Móvil", icon: "📱", description: "Transferencia instantánea" },
  CREDIT_CARD: { label: "Tarjeta de Crédito", icon: "💳", description: "Visa, MasterCard, AmEx" },
  DEBIT_CARD: { label: "Tarjeta de Débito", icon: "💳", description: "Todas las tarjetas" },
  PAYPAL: { label: "PayPal", icon: "🅿️", description: "Pago seguro online" },
  CASH_ON_DELIVERY: { label: "Pago al Recibir", icon: "💵", description: "Solo zonas locales" },
} as const;

export const PROVINCES_CR = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
];

export const BRAND_COLORS = {
  primary: "#A67C52",
  accent: "#C9984A",
  background: "#12110F",
  surface: "#1E1A17",
  light: "#F5F2EC",
  muted: "#B8B1A7",
} as const;

export const ITEMS_PER_PAGE = 12;
export const MAX_CART_QUANTITY = 20;

export const SEO = {
  title: `ACL Drinks - Licores a Domicilio en Costa Rica`,
  description:
    "Compra licores online en Costa Rica. Entrega rápida en Tilarán y envíos nacionales. Whisky, Ron, Vodka, Tequila, Cervezas y Combos Fiesteros.",
  keywords:
    "licores costa rica, licorería online, delivery licores, whisky, ron, vodka, tequila, cervezas, combos fiesteros",
  ogImage: `${SITE_URL}/og-image.jpg`,
} as const;
