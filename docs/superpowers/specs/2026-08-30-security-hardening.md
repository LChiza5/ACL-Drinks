# Endurecimiento de seguridad — ACL Drinks

**Fecha:** 2026-08-30
**Estado:** Implementado y verificado
**Sub-proyecto:** 2 de 2 (el primero fue "Rediseño visual/UX")

## Contexto

Pase de seguridad cubriendo el checklist pedido: API keys, secrets en git, acceso a
base de datos, cookies de sesión, hash de contraseñas, rate limiting, validación de
inputs, subida de archivos, headers de seguridad, HTTPS y escaneo de dependencias.
La auditoría inicial (agente Explore, mismo día) mapeó el estado real del código antes
de tocar nada — varios ítems del checklist ya estaban resueltos correctamente por
diseño; el resto se implementó en esta pasada.

## Ya estaba correcto (sin cambios)

- **API keys / secrets**: `.env` correctamente en `.gitignore`; se confirmó por grep en
  todo el historial de git (21 commits) que nunca se commiteó un secret real.
- **Key pública de base de datos**: no aplica — Prisma corre 100% server-side, nunca en
  el cliente. El patrón anon-key + RLS es para `supabase-js` en cliente, que este
  proyecto no usa.
- **Hash de contraseñas**: bcrypt costo 12, ya correcto.
- **Parametrización**: cero uso de `$queryRaw`/`$executeRaw` en todo el código — Prisma
  parametriza todo.
- **Escapar contenido de usuario**: React escapa por defecto; cero usos de
  `dangerouslySetInnerHTML` en el proyecto.
- **Recortar respuestas de API**: auditado — las 3 rutas que devuelven datos de usuario
  (`register`, `me`, `[id]/role`) ya usan `select` explícito sin exponer `password`.

## Implementado en esta pasada

1. **Dependencias** (`44c4250`, `402aa50`) — 10 vulnerabilidades → 2. El CVE crítico de
   `next-auth` (bypass de auth vía homoglyph en normalización de email, cookies OAuth
   PKCE no ligadas al provider) se resolvió con un patch dentro de la propia rama 4.x
   (`4.24.14→4.24.15`), sin saltar a la v5 beta. `next` subió de patch (`15.5.18→15.5.24`).
   `nodemailer`/`sharp` se subieron de major de forma dirigida tras confirmar que sus
   usos en el código (`sendMail` básico, `sharp` solo transitivo vía Next) no usan APIs
   que cambiaron. **Pendiente deliberado**: el único vector que queda (XSS/path-traversal
   en `postcss`, arrastrado por `next`) solo se resuelve saltando a Next 16, un cambio de
   framework mayor que está fuera de alcance de un pase de seguridad — no se debe forzar
   a ciegas.
2. **Headers de seguridad** (`fbe91ec`) — CSP, HSTS, X-Frame-Options,
   X-Content-Type-Options, Referrer-Policy, Permissions-Policy en `next.config.ts`,
   verificados en runtime (fetch a `/` y confirmación de cada header) y probados en
   home/products/login sin romper nada (fonts self-hosted vía `next/font`, sin CSP
   violations).
3. **Rate limiting** (`15d7b99`) — `src/lib/rate-limit.ts`, limitador en memoria por
   instancia (sin Redis/Upstash provisionado; Vercel mantiene instancias tibias entre
   requests, así que da protección real sin infra nueva). Aplicado a login (5/15min por
   email), registro (5/hora por IP), validar cupón y tracking (20/5min por IP cada uno).
   Verificado con 22 requests reales al endpoint de cupones: los primeros 20 pasan, el
   21 y 22 devuelven 429.
4. **Subida de archivos** (`cf4f685`) — `api/upload/route.ts` ahora valida
   `Content-Type` (allowlist jpeg/png/webp/avif) y tamaño (máx 5MB) antes de mandar a
   Cloudinary.
5. **Validación de inputs** (`cf4f685`) — `settings` PATCH y `orders/[id]` PATCH
   pasaron de leer el body sin validar a Zod (allowlist real de keys de settings,
   enums reales de `OrderStatus`/`PaymentStatus` sacados del schema de Prisma).
6. **Manipulación de precios en checkout** (`cf4f685`) — hallazgo no listado
   explícitamente en el pedido original pero real: `orders` POST calculaba el subtotal
   usando `item.price` tal cual venía del body del cliente, sin verificarlo contra el
   precio real en la base de datos. Un cliente podía mandar cualquier precio. Se agregó
   re-consulta server-side de `Product`/`Kit` por id y se usa ese precio verificado en
   todo el cálculo (subtotal, items del pedido).
7. **Cookies de sesión** (`077a82b`) — configuración explícita en `authOptions.cookies`
   (`httpOnly`, `sameSite: "lax"`, `secure` en producción, prefijo `__Secure-` en
   producción) en vez de depender solo de los defaults implícitos de NextAuth v4.

## Deliberadamente fuera de alcance

- **Migración a Next 16**: necesaria para cerrar el último CVE de dependencias, pero es
  un cambio de framework mayor que merece su propio proyecto con tiempo de pruebas
  dedicado, no algo para forzar dentro de un pase de seguridad.
- **Audit log de acciones de admin**: el pedido original mencionó "recibir acceso a
  registros". No se implementó — requeriría un modelo nuevo en la base de datos y UI
  para consultarlo, alcance considerable para agregar sin pedirlo explícitamente
  (YAGNI). Si se quiere, es un buen próximo paso independiente.
- **Reescribir historial de git**: no aplica, se confirmó que no hay secrets reales
  commiteados en ningún momento.

## Verificación

Cada cambio se verificó con `npx tsc --noEmit` limpio, reinicio del dev server, y
revisión de consola en una pestaña de navegador sin historial acumulado (home,
products, login, checkout) — cero errores nuevos en ningún caso. El rate limiting se
verificó con requests reales (no solo lectura de código). Los headers se verificaron
leyendo la respuesta HTTP real, no solo el archivo de config.
