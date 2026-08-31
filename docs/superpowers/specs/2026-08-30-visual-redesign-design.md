# Rediseño visual/UX — ACL Drinks

**Fecha:** 2026-08-30
**Estado:** v2 implementada (reemplaza la v1 de este mismo documento)
**Sub-proyecto:** 1 de 2 (el segundo es "Endurecimiento de seguridad", spec separado)

## Por qué hay una v2

La v1 (mascota Pizote, una capa de profundidad en el Hero, limpieza de tokens
muertos) se implementó conservando la paleta ámbar existente casi sin tocarla,
bajo la premisa de "capas sobre lo existente, no rediseño desde cero". El
dueño del proyecto la rechazó explícitamente:

> "la página está igual a como se veía [...] colores muy apagados, íconos
> horribles [...] es totalmente lógico que la hizo una inteligencia artificial"

El diagnóstico real: la paleta era efectivamente **un solo tono** — todas las
variables (`--primary`, `--accent`, `colors.neon.*`, los grises de fondo)
resolvían a variaciones del mismo ámbar/marrón. Eso es lo que se lee como
"apagado" y "genérico", más que cualquier problema de mascota o motion. Esta
v2 sí cambia la identidad visual de fondo.

## Referencia principal: fundaca.vercel.app

Sitio hecho por el mismo equipo del dueño, señalado explícitamente como
referencia de lo que sí funciona. Análisis (vía DOM/CSS computado, no solo
apariencia):

- Tipografía: **Fraunces** (serif editorial, alto contraste) para títulos +
  **Inter** para cuerpo. H1 a 96px/600 con letter-spacing negativo.
- Paleta real de 4 tonos, no uno: crema/marfil de fondo (`#FBF7EE`), verde
  bosque casi negro para texto/hero (`#072019`/`#0E3B2E`), naranja quemado
  como acento primario (`#D98A2B`), y un teal vívido como sorpresa puntual en
  stats (`#7FCDD8`) — cada color con un rol distinto, no intercambiables.
- Fondos cálidos no planos, bordes con tinte de color a baja opacidad en vez
  de gris genérico, secciones numeradas (01/02/03), motion con propósito.

21st.dev (vía MCP) se revisó también, pero sus componentes de "hero premium"
son en su mayoría plantillas SaaS genéricas (glassmorphism, blobs de
gradiente, shimmer buttons) — el mismo lenguaje visual que ya se quiere dejar
atrás. No se usó como fuente de diseño, solo confirmó qué evitar.

## Paleta nueva

Se mantiene el fondo casi negro (identidad "licorería nocturna") pero se
reemplaza el ámbar-monocromo por tres acentos con roles distintos:

| Rol | Color | Uso |
|---|---|---|
| **Oro** (`gold.*`, #D4A72C) | identidad de marca | logo, wordmark (`.gradient-text`), detalles decorativos — es lo que queda de la paleta ámbar original |
| **Esmeralda** (`emerald.*`, #16A673) | primario/interactivo nuevo | botón principal (`.btn-primary`/`.btn-neon`), `--primary`, bordes de hover en ProductCard, nav-pill |
| **Hibisco** (`hibiscus.*`, #F0356E) | acento puntual | badges de descuento/oferta, Combos Fiesteros (dominante ahí, a propósito, para diferenciar esa sección), contador del carrito |

`tailwind.config.ts` mantiene un mapa de compatibilidad (`colors.neon.*`,
`boxShadow["neon-*"]`) que redirige el código pre-existente (dashboard,
checkout, carrito, primitivas shadcn — no tocado en este rediseño) a estos
mismos tres tonos, conservando el rol semántico original de cada clase
(morado=primario→esmeralda, ámbar=secundario→oro, rosa=terciario→hibisco,
azul=cuarto tono→celeste nuevo, verde=éxito→esmeralda claro) en vez de dejarlo
en amarillo-marrón para todo.

## Tipografía

`Bricolage_Grotesque` (geométrica, se repite en muchísimos sitios generados
por IA) se reemplaza por **Fraunces** para `--font-display` — la misma
familia que usa fundaca. DM Sans se mantiene para cuerpo de texto.

## Íconos

Los lucide-react planos coloreados directo (`<Zap style={{color:"#..."}}/>`)
se reemplazan por `IconBadge` (`src/components/ui/icon-badge.tsx`): medallón
con gradiente por tono, glow (`shadow-glow-*`), y un shine sweep al hover del
contenedor `.group`. Se aplica en Hero (stats) y Beneficios.

Se agrega `BrandGlassIcon` (`src/components/ui/brand-glass-icon.tsx`): un
ícono de línea propio (vaso + diamante) que retoma el glifo del logo real en
vez de depender de un emoji (🥃) o un ícono genérico de librería.

## Motion

`src/lib/motion.ts` centraliza springs (`snappy`/`gentle`/`bouncy`) y un
helper `fadeUp` para scroll-reveals, para que el motion nuevo comparta el
mismo "peso físico" en vez de valores ad-hoc por archivo. Se sigue usando
`framer-motion` (ya instalado y usado en todo el proyecto) — no se migró a
`motion/react` porque hubiera sido un cambio de dependencia fuera de alcance
sin beneficio visual.

Motion con propósito agregado más allá de Hero/Beneficios (el alcance de la
v1):

- **Navbar:** estado activo real por ruta (antes solo hover), la barra se
  comprime y gana sombra al hacer scroll, el contador del carrito hace un pop
  animado en cada cambio.
- **Footer:** columnas con reveal escalonado al entrar en viewport, links con
  subrayado animado, iconos sociales con microinteracción al hover.
- **ProductCard/KitCard:** hover más vivo (lift + scale con spring
  compartido), colores de marca en vez de ámbar plano.
- **Botones (global):** `active:scale-[0.97]` en la primitiva `Button` —
  feedback de presión en todos los botones del sitio, no solo los nuevos.

## Alcance de este rediseño

Se tocó a fondo: tokens globales (`globals.css`, `tailwind.config.ts`,
tipografía en `layout.tsx`), Navbar, Footer, Hero, BenefitsSection,
ProductCard, KitCard, y el resto de secciones del home (CatalogSection,
FeaturedProducts, KitsPreview, CategoryCard/Grid, TrustMarquee).

Deliberadamente fuera de alcance (quedan con la paleta vieja resuelta vía el
mapa de compatibilidad, pero sin rediseño de layout/motion): dashboard/admin,
checkout, carrito, perfil, pedidos, tracking. Son páginas utilitarias, no
donde vive la identidad de marca — mismo criterio que ya aplicaba la v1 para
separar "sitio público" de "herramientas internas".

## Mascota Pizote (de la v1, sin cambios de diseño)

Sigue tal cual se implementó: SVG propio, estados idle/cubriendo/peek en
login y registro. Solo cambió el nombre del archivo/componente
(`pisote-mascot.tsx` → `pizote-mascot.tsx`, `PisoteMascot` → `PizoteMascot`)
porque el nombre correcto del animal en Costa Rica lleva Z, no S.

## Logo / favicon

El crop anterior (`56cc1e6`) metía el lockup completo (monograma + wordmark)
en un canvas cuadrado con mucho margen negro. Se recorta ahora solo al
monograma, tomado directo de la imagen fuente (mismo fondo/viñeta original,
sin padding sintético) para que favicon y logo del navbar/footer se vean
llenos en vez de flotando en un cuadro.

## Fuera de alcance (sin cambios respecto a la v1)

- Seguridad — spec separado, sub-proyecto 2.
- Reescritura de historial de git.
- Migración a Supabase RLS/anon-key.
