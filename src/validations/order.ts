import { z } from "zod";

export const addressSchema = z.object({
  alias: z.string().max(50).default("Casa"),
  fullName: z.string().min(2, "Nombre requerido").max(100),
  phone: z.string().regex(/^\+?[0-9]{8,15}$/, "Teléfono inválido"),
  address: z.string().min(5, "Dirección requerida").max(500),
  district: z.string().min(2, "Distrito requerido").max(100),
  canton: z.string().min(2, "Cantón requerido").max(100),
  province: z.string().min(2, "Provincia requerida").max(100),
  postalCode: z.string().max(10).optional(),
  notes: z.string().max(500).optional(),
  isDefault: z.boolean().default(false),
});

export const checkoutSchema = z.object({
  deliveryAddress: addressSchema,
  isDelivery: z.boolean().default(true),
  notes: z.string().max(500).optional(),
  paymentMethod: z.enum([
    "SINPE",
    "CREDIT_CARD",
    "DEBIT_CARD",
    "PAYPAL",
    "CASH_ON_DELIVERY",
  ]),
  guestEmail: z.string().email().optional(),
  guestName: z.string().min(2).max(100).optional(),
  guestPhone: z.string().regex(/^\+?[0-9]{8,15}$/).optional(),
  couponCode: z.string().max(50).optional(),
});

export const orderUpdateSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
    "REFUNDED",
  ]),
  notes: z.string().max(500).optional(),
});

export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type OrderUpdateInput = z.infer<typeof orderUpdateSchema>;
