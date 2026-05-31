export type UserRole = "ADMIN" | "MANAGER" | "CUSTOMER";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod =
  | "SINPE"
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "PAYPAL"
  | "CASH_ON_DELIVERY";

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED";

export type PromotionType =
  | "PERCENTAGE"
  | "FIXED_AMOUNT"
  | "FREE_SHIPPING"
  | "BUY_X_GET_Y";

export type CouponType = "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_SHIPPING";

export type NotificationType =
  | "INFO"
  | "SUCCESS"
  | "WARNING"
  | "ERROR"
  | "ORDER_UPDATE"
  | "PROMOTION";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  emoji?: string | null;
  color?: string | null;
  sortOrder: number;
  isActive: boolean;
  _count?: { products: number };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  comparePrice?: number | null;
  images: string[];
  categoryId: string;
  category?: Category;
  brand?: string | null;
  alcoholContent?: number | null;
  volume?: string | null;
  country?: string | null;
  sku?: string | null;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  tags: string[];
  inventory?: { stock: number; reserved: number } | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Kit {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  comparePrice?: number | null;
  image?: string | null;
  badge?: string | null;
  isActive: boolean;
  isFeatured: boolean;
  kitProducts?: KitProduct[];
}

export interface KitProduct {
  id: string;
  kitId: string;
  productId: string;
  quantity: number;
  product?: Product;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: "product" | "kit";
  sku?: string;
  slug: string;
}

export interface OrderItem {
  id: string;
  productId?: string | null;
  kitId?: string | null;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
  sku?: string | null;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  address: string;
  district: string;
  canton: string;
  province: string;
  postalCode?: string;
  notes?: string;
}

export interface Payment {
  id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  transactionId?: string | null;
  reference?: string | null;
  sinpePhone?: string | null;
}

export interface Shipment {
  id: string;
  carrier?: string | null;
  trackingCode?: string | null;
  estimatedAt?: Date | string | null;
  shippedAt?: Date | string | null;
  deliveredAt?: Date | string | null;
  trackings?: Tracking[];
}

export interface Tracking {
  id: string;
  status: string;
  description: string;
  location?: string | null;
  timestamp: Date | string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  guestEmail?: string | null;
  guestName?: string | null;
  guestPhone?: string | null;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  notes?: string | null;
  deliveryAddress?: DeliveryAddress | null;
  orderItems: OrderItem[];
  payment?: Payment | null;
  shipment?: Shipment | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface UserProfile {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  phone?: string | null;
  role: UserRole;
  loyaltyPoints: number;
  createdAt: Date | string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  alias: string;
  fullName: string;
  phone: string;
  address: string;
  district: string;
  canton: string;
  province: string;
  postalCode?: string | null;
  notes?: string | null;
  isDefault: boolean;
}

export interface Promotion {
  id: string;
  name: string;
  description?: string | null;
  type: PromotionType;
  value: number;
  minOrder?: number | null;
  maxDiscount?: number | null;
  startDate: Date | string;
  endDate: Date | string;
  isActive: boolean;
  image?: string | null;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string | null;
  type: CouponType;
  value: number;
  minOrder?: number | null;
  maxUses?: number | null;
  usedCount: number;
  isActive: boolean;
  expiresAt?: Date | string | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  brand?: string;
  isNew?: boolean;
  isOnSale?: boolean;
  isFeatured?: boolean;
  sortBy?: "price_asc" | "price_desc" | "newest" | "name_asc";
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  pendingOrders: number;
  lowStockProducts: number;
}
