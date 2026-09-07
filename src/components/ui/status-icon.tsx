import {
  ArrowUUpLeft,
  CheckCircle,
  CreditCard,
  DeviceMobile,
  Hourglass,
  MapPin,
  Money,
  Package,
  SealCheck,
  Truck,
  Wallet,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { ORDER_STATUSES, PAYMENT_METHODS } from "@/constants";

/**
 * ORDER_STATUSES / PAYMENT_METHODS used to carry emoji so every consumer could
 * print one inline. They now carry an icon *name* instead, and this file is the
 * single place that turns that name into the real Phosphor glyph — same icon
 * set the rest of the UI already uses, so no second icon library is needed.
 */
const GLYPHS: Record<string, PhosphorIcon> = {
  ArrowUUpLeft,
  CheckCircle,
  CreditCard,
  DeviceMobile,
  Hourglass,
  MapPin,
  Money,
  Package,
  SealCheck,
  Truck,
  Wallet,
  XCircle,
};

type Props = { name: string; className?: string; size?: number; weight?: "regular" | "bold" | "fill" | "duotone" };

export function StatusGlyph({ name, className, size = 14, weight = "bold" }: Props) {
  const Glyph = GLYPHS[name];
  if (!Glyph) return null;
  return <Glyph size={size} weight={weight} className={className} aria-hidden="true" />;
}

export function orderStatusInfo(status: string | undefined) {
  return status ? ORDER_STATUSES[status as keyof typeof ORDER_STATUSES] : undefined;
}

export function paymentMethodInfo(method: string | undefined) {
  return method ? PAYMENT_METHODS[method as keyof typeof PAYMENT_METHODS] : undefined;
}
