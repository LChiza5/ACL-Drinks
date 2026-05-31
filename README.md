# 🍾 BrandName — Plataforma E-Commerce de Licores

Plataforma full-stack moderna de venta de licores online para Costa Rica. Construida con Next.js 15, React 19, TypeScript, Prisma, PostgreSQL y TailwindCSS.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript |
| Estilos | TailwindCSS, Shadcn UI, Framer Motion |
| Estado | Zustand |
| Formularios | React Hook Form + Zod |
| Backend | Next.js API Routes |
| Base de datos | PostgreSQL + Prisma ORM |
| Autenticación | NextAuth v4 + JWT |
| Imágenes | Cloudinary |
| Notificaciones | Sonner |
| Deploy | Vercel (frontend) + Railway/VPS (DB) |

---

## Instalación Paso a Paso

### 1. Instalar dependencias

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` es necesario por la compatibilidad de React 19 con algunos paquetes.

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus valores reales:

```env
# Base de datos PostgreSQL (Railway, Supabase, Neon, o local)
DATABASE_URL="postgresql://usuario:password@localhost:5432/brandname_db"

# NextAuth — genera tu secret con: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-super-seguro"

# JWT
JWT_SECRET="otro-secret-seguro"

# Cloudinary (cloudinary.com — cuenta gratuita disponible)
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name"

# WhatsApp Business
NEXT_PUBLIC_WHATSAPP_NUMBER="+50688888888"
NEXT_PUBLIC_WHATSAPP_MESSAGE="Hola! Quiero hacer un pedido 🍾"

# Instagram
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/tu-usuario"

# App
NEXT_PUBLIC_APP_NAME="BrandName"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_DELIVERY_ZONE="Tilarán, Guanacaste"

# SINPE Móvil
SINPE_PHONE="+50688888888"
SINPE_NAME="BrandName CR"
```

### 3. Configurar la base de datos

```bash
# Opción A — Desarrollo rápido (sin historial de migraciones)
npm run db:push

# Opción B — Producción (con migraciones versionadas)
npm run db:migrate

# El cliente Prisma se genera automáticamente con npm install
# Para regenerar manualmente:
npx prisma generate
```

### 4. Cargar datos de prueba

```bash
npm run db:seed
```

Esto crea:
- ✅ Admin: `admin@brandname.cr` / `Admin123!`
- ✅ 5 categorías (Whisky, Ron, Vodka, Tequila, Cervezas)
- ✅ 6 productos con imágenes reales
- ✅ 2 kits de fiesta
- ✅ Cupón: `GUARO2025`

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) 🎉

---

## Scripts

```bash
npm run dev           # Servidor de desarrollo (http://localhost:3000)
npm run build         # Build de producción
npm run start         # Servidor de producción

npm run db:push       # Sincronizar schema → DB (desarrollo)
npm run db:migrate    # Ejecutar migraciones (producción)
npm run db:seed       # Cargar datos de prueba
npm run db:studio     # Abrir Prisma Studio (GUI visual de DB)
npm run db:reset      # Reset completo de la base de datos
npm run lint          # ESLint
```

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/              # API Routes
│   │   ├── auth/         # NextAuth [...nextauth]
│   │   ├── products/     # GET, POST, PUT, DELETE
│   │   ├── categories/   # GET, POST
│   │   ├── orders/       # GET, POST (crear pedido)
│   │   ├── tracking/     # GET por código/orderNumber
│   │   ├── coupons/      # validate coupon
│   │   └── users/        # register
│   ├── dashboard/        # Admin — layout + Products, Orders, Users, Categories, Inventory
│   ├── products/         # Catálogo + [slug] detalle
│   ├── categories/       # Lista + [slug] filtro
│   ├── kits/             # Kits y combos
│   ├── offers/           # Ofertas activas
│   ├── checkout/         # Proceso de compra
│   ├── orders/           # Historial + [id] detalle
│   ├── tracking/         # Rastreo de pedidos
│   ├── profile/          # Perfil de usuario
│   ├── login/            # Inicio de sesión
│   └── register/         # Crear cuenta
│
├── components/
│   ├── ui/               # Button, Card, Input, Badge, Dialog, Sheet, etc.
│   ├── layout/           # Navbar, Footer, Providers
│   ├── hero/             # Hero, BenefitsSection
│   ├── categories/       # CategoryCard, CategoryGrid
│   ├── products/         # ProductCard, FeaturedProducts, AddToCartButton
│   ├── kits/             # KitCard, KitsPreview
│   ├── cart/             # CartSidebar, CartItem, CartSummary
│   ├── whatsapp/         # WhatsAppButton (flotante)
│   └── instagram/        # InstagramButton (flotante)
│
├── store/
│   ├── cart.store.ts     # Carrito + persistencia localStorage
│   ├── user.store.ts     # Perfil de usuario en memoria
│   └── ui.store.ts       # Estado de menú, filtros, modales
│
├── lib/
│   ├── prisma.ts         # Singleton PrismaClient
│   ├── auth.ts           # NextAuth options
│   ├── utils.ts          # formatPrice, slugify, formatDate, etc.
│   └── cloudinary.ts     # Upload/delete imágenes
│
├── types/index.ts        # Todos los tipos TypeScript
├── validations/          # Esquemas Zod (auth, product, order)
├── constants/index.ts    # Constantes globales
└── middleware.ts         # Protección de rutas por rol

prisma/
├── schema.prisma         # 15+ modelos (User, Product, Order, etc.)
└── seed.ts               # Datos de prueba realistas
```

---

## Funcionalidades

### Tienda Pública
| Feature | Detalle |
|---|---|
| 🛒 Carrito | Persistente en localStorage, gestión de cantidad |
| 🔍 Catálogo | Filtro por categoría, búsqueda, ordenamiento |
| 📦 Kits | Combos armados con múltiples productos |
| 💳 Checkout | Con cuenta o como invitado |
| 🎁 Cupones | Código de descuento en el carrito |
| 📍 Rastreo | Por código de rastreo o número de pedido |
| 💬 WhatsApp | Botón flotante con mensaje pre-configurado |
| 📸 Instagram | Botón flotante a perfil |

### Métodos de Pago
- 📱 **SINPE Móvil** — muestra número y monto automáticamente
- 💳 Tarjeta de crédito / débito
- 🅿️ PayPal
- 💵 Pago al recibir (zonas locales)

### Usuario Registrado
- ⭐ **₡1.000 de bienvenida** al crear cuenta
- 🏆 Sistema de puntos de fidelidad
- 📋 Historial completo de pedidos
- 🏠 Múltiples direcciones guardadas
- 🔔 Notificaciones de estado del pedido

### Dashboard Admin (`/dashboard`)
- 📊 Métricas: ingresos, pedidos, clientes, productos
- 📦 Productos con imágenes, precio, stock
- 🏷️ Categorías con conteo de productos
- 🛍️ Pedidos con filtro por estado y acciones
- 👥 Usuarios con roles, pedidos y puntos
- 📋 Inventario con alertas de stock bajo

---

## Credenciales de Prueba

| Rol | Email | Contraseña |
|---|---|---|
| Admin | `admin@brandname.cr` | `Admin123!` |

**Cupón activo:** `GUARO2025` → ₡2.000 de descuento en pedidos mayores a ₡15.000

---

## Deploy en Producción

### Vercel (recomendado para Next.js)

```bash
npm i -g vercel
vercel --prod
```

Configura las variables de entorno en el dashboard de Vercel.

### Base de datos en Railway

1. Crear proyecto en [railway.app](https://railway.app)
2. Agregar servicio **PostgreSQL**
3. Copiar la `DATABASE_URL` generada
4. Ejecutar `npm run db:migrate` apuntando a Railway
5. Ejecutar `npm run db:seed` para los datos iniciales

---

## Personalización de Marca

Para cambiar el nombre `BrandName` por tu marca real:

1. `src/constants/index.ts` → variable `SITE_NAME`
2. `.env` → `NEXT_PUBLIC_APP_NAME`
3. `src/app/layout.tsx` → metadata title/description
4. `src/components/layout/Navbar.tsx` → logo
5. `src/components/layout/Footer.tsx` → footer

---

*Construido con ❤️ para Costa Rica 🇨🇷*
