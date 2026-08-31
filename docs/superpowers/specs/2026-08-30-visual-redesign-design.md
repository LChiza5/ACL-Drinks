# Rediseño visual/UX — ACL Drinks

**Fecha:** 2026-08-30
**Estado:** Aprobado, en implementación
**Sub-proyecto:** 1 de 2 (el segundo es "Endurecimiento de seguridad", spec separado)

## Contexto

El sitio ya tiene una base ámbar/tropical decente (Aurora WebGL en el Hero, `glass-card`,
`glow-amber`, `shimmer`, cards con tilt/spotlight/glare tomadas de react-bits en un pase
anterior). El pedido es que deje de sentirse "genérico" y gane una identidad propia y
memorable, conservando la paleta ámbar existente, con un guiño fuerte a Costa Rica.

Fuentes de inspiración revisadas: reactbits.dev (catálogo de 170+ componentes animados,
ya parcialmente adoptado), 21st.dev (vía MCP, patrones de hero modernos: glass/gradient
blobs, reveals escalonados), awwwards.com/websites/e-commerce (nivel de pulido esperado:
motion con propósito, tipografía editorial, microinteracciones).

## Enfoque

**Capas sobre lo existente**, no un rediseño desde cero. Se evaluaron y descartaron:
overhaul completo (alto riesgo, contradice "conservar colores") y swap componente-por-
componente sin narrativa unificadora (cae en "muestrario de efectos", el efecto genérico
que se quiere evitar). La diferenciación viene de piezas con intención — la mascota,
profundidad de movimiento dirigida, ritmo visual entre secciones — no de acumular shaders.

## 1. Identidad de marca (✅ implementado, commit `56cc1e6`)

Logo real (`ACL Drinks/Logo.jpg` del usuario) reemplaza el placeholder SVG genérico:
- `src/app/icon.png` + `apple-icon.png` — favicon (convención de archivo de Next.js,
  sin tocar metadata manualmente), 512×512, fondo `rgb(18,17,15)` (mismo tono que
  `--background` del sitio) para que el padding sea invisible.
- `public/logo-mark.png` — mismo asset, usado por `src/components/layout/Logo.tsx`
  vía `next/image`, que se propaga automáticamente a los 5 usos existentes (Navbar,
  Footer, login, register, dashboard layout) sin tocar cada sitio por separado.

## 2. Mascota Pizote

Pieza central y firma del sitio. Componente SVG propio y autocontenido (sin assets
externos, mismo espíritu que `aurora.tsx`), coloreado con la paleta ámbar/marrón del
sitio — no un pizote "realista" sino uno que se sienta parte de la marca.

**Ubicación:** `src/components/ui/pizote-mascot.tsx`. Se engancha en `LoginForm`
(`src/app/login/page.tsx`) y `RegisterPage` (`src/app/register/page.tsx`) — ambos ya
usan `react-hook-form`; el estado de "cubriendo" se deriva con `watch()` sobre el campo
`password` (y `confirmPassword` en registro) combinado con el estado de foco del input.

**Estados y transiciones (via `framer-motion`, springs cortos ~250-350ms):**
- **Idle** — patas abajo, ojos abiertos, pulso de escala sutil (respiración).
- **Cubriendo** — al enfocar contraseña/confirmar-contraseña con contenido: patas suben
  y tapan los ojos.
- **Reacción al tipeo** — mientras está tapado, un pequeño "flinch" por tecla (sin
  destaparse) para que no se sienta estático.
- **Destapando** — al perder foco el campo sensible, o al vaciarse.
- **Peek** — si el usuario usa el toggle de mostrar/ocultar contraseña que ya existe en
  ambos forms (ícono `Eye`/`EyeOff`), el Pizote entreabre un ojo mientras `showPass` es
  `true`.

Esto resuelve dos pedidos en uno: la mascota animada del password Y el "animalito
escondido de Costa Rica" — no se necesita un segundo easter egg separado.

## 3. Profundidad y movimiento

- **Hero** (`src/components/hero/Hero.tsx`): Aurora se conserva tal cual (color/identidad
  intactos). Se agrega **una sola** capa adicional de textura/profundidad inspirada en
  reactbits (candidata: `Beams` o `DotField` a opacidad baja) — deliberadamente una sola
  pieza nueva, no varias, para no caer en "muestrario".
- **Scroll reveals**: las entradas `framer-motion` existentes (fade/slide genéricos) pasan
  a spring physics con timing escalonado — mismo mecanismo, más vivo.
- **Ritmo entre secciones**: `BenefitsSection` (o la sección de "¿Por qué elegirnos?")
  recibe un fondo sutil distinto al de Hero, para que el scroll tenga variación en vez de
  repetir el mismo efecto.
- **Auditoría de cards**: confirmar que `ProductCard`/`KitCard` usan consistentemente
  `TiltCard`/`SpotlightCard`/`GlareHover` (ya existen, revisar cobertura real).

## 4. Limpieza

`tailwind.config.ts` tiene tokens de un tema "neon" morado/rosa/azul pre-rebrand sin usar
(`boxShadow.neon-*`, `backgroundImage.neon-gradient/dark-gradient/purple-gradient`, hex
crudos `#a855f7`/`#ec4899`/`#3b82f6`). Se eliminan tras confirmar por grep que ninguna
clase (`shadow-neon-*`, `bg-neon-gradient`, `bg-purple-gradient`) se usa en `src/`.

Nota: `colors.neon.*` (purple/pink/blue/amber/gold) **se conserva** — esos nombres de
clave son confusos pero los valores hex ya están recoloreados a ámbar y están en uso
activo (`text-neon-purple`, `bg-neon-amber/10`, etc. en login/register). Renombrar las
keys es churn innecesario para el alcance de este trabajo.

## Fuera de alcance

- Seguridad (headers, rate limiting, validación de inputs, CVEs de dependencias) — spec
  separado, sub-proyecto 2, se hace después de este.
- Reescritura de historial de git — no aplica, se confirmó que nunca hubo secrets reales
  commiteados (ver conversación).
- Migración a Supabase RLS/anon-key — no aplica a esta arquitectura (Prisma corre 100%
  server-side); se documenta en el spec de seguridad en vez de aquí.

## Commits de este sub-proyecto

1. ✅ Logo real (favicon + Logo.tsx) — `56cc1e6`
2. Mascota Pizote + integración en login/register
3. Hero: capa de profundidad + scroll reveals con spring + fondo nuevo en Beneficios
4. Limpieza de tokens neon sin uso + auditoría/pulido de microinteracciones (cards, nav,
   botones)
