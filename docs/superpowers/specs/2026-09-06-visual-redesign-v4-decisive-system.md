# Rediseño visual v4 — sistema decisivo, sin "look de vibecoding"

**Fecha:** 2026-09-06
**Estado:** en ejecución
**Reemplaza:** no reemplaza el trabajo funcional de v3 (streaming, Turbopack, fix de overflow del header) — reemplaza su lenguaje visual (gradientes, glow, radio blando).

## Por qué otra vez

v3 arregló bugs reales (carga en blanco, navegación lenta, overflow del header) y mejoró la paleta y la fauna, pero el dueño siguió viendo el sitio como "hecho con IA". Trajo evidencia nueva y mucho más específica: un video de 30 razones concretas por las que un sitio "se ve vibecodeado", y tres referencias de nivel profesional (Skiper UI, Refero/Ghia, Refero/Woven, más sitios reales premiados de vino/licor). Cruzando las 30 razones contra el código actual, el problema no era la paleta (ya se había resuelto en v3) sino el **lenguaje estructural**: gradientes en botones y texto, glow/drop-shadow sintético en íconos y tarjetas, `rounded-xl`/`rounded-2xl` por todos lados (el "soft corner radius" genérico de Tailwind sin decisión propia), iconografía lucide todavía presente en partes del sitio, "orbes" decorativos de blur, y cero jerarquía fotográfica real (los productos son miniaturas chiquitas en vez de ser el color y el interés visual del sitio).

## Las 30 razones (video del dueño) y qué hacemos con cada una

| # | Razón | Acción v4 |
|---|---|---|
| 1 | Harsh gradients | Eliminar `.gradient-text`, `.gradient-text-vivid`, gradiente de `.btn-primary`, gradiente de Aurora — todo pasa a color plano |
| 2 | Lucide icons | Auditoría completa: todo ícono visible en storefront pasa a Phosphor duotone (ya empezado en v3, faltaba terminarlo) |
| 3 | Pure white background | N/A — el sitio ya es oscuro |
| 4 | Rainbow coloring | Bajar de 4 acentos "neon" de uso libre a 1 acento primario + 1 acento restringido a un solo uso (como Limoncello Yellow en Ghia: "solo para overlays promocionales") |
| 5 | Drop shadows | Eliminar `drop-shadow` de IconBadge, `shadow-glow-*`, box-shadow de `.glass-card`/`.btn-primary`. Profundidad viene de contraste de color y fotografía, no de luz sintética |
| 6 | 3 feature cards en fila | Revisar BenefitsSection/CatalogSection — variar el ritmo, no todo en grids de 3 parejos |
| 7 | Emojis | Ya no hay emojis en UI propia (quedan `{cat.emoji}` de datos de categoría — evaluar si se reemplazan por ícono real) |
| 8 | Liquid glass | Eliminar `.glass-card`/`backdrop-blur` como estilo por defecto de tarjetas |
| 9 | Em dashes | Revisar copy propio (no placeholder) |
| 10 | Inter/Geist/Space Grotesk | Ya usamos Fraunces + DM Sans — correcto, no tocar |
| 11 | Colored left stripe | No presente — no tocar |
| 12 | Fake testimonials | No hay testimonios inventados — no tocar |
| 13 | Bento grids | Revisar CatalogSection/Beneficios por si caen en ese patrón |
| 14 | Terminal window | No presente |
| 15 | "It's not x, it's y" | Revisar copy |
| 16 | Checkmark bullets | Revisar BenefitsSection (actualmente son íconos temáticos, no checks genéricos — bien) |
| 17 | 3 pricing tiers | No aplica (no es SaaS) |
| 18 | No real product demos | Este es grande: subir la presencia de fotografía real de producto — más grande, marco propio, no thumbnail genérico |
| 19 | Soft corner radius | Decisión decisiva: **radio casi cero (2-6px) en contenedores/tarjetas/botones**, reservando círculo completo solo para medallones de fauna y crops de producto puntuales |
| 20 | Purple and black | No presente |
| 21 | No skeleton loaders | Ya tenemos skeletons (v3) — no tocar |
| 22 | Radial orbs | Eliminar los `blur-3xl` decorativos en BenefitsSection y similares |
| 23 | Dot grids | No presente |
| 24 | Sparkle icons | No presente |
| 25 | Animated arrows | Revisar CTAs por flechitas animadas genéricas |
| 26 | No TOS | Ya existen `/terms` y `/privacy` — confirmar que están linkeados |
| 27 | No privacy policy | Idem |
| 28 | Hover animations | No eliminar motion en general (es parte de la marca), pero quitar los genéricos "scale-110 en todo" sin propósito |
| 29 | Neon colors | Bajar saturación/uso de emerald-hibiscus-sky como "neon-todo-el-tiempo"; ver #4 |
| 30 | Basic pastel colors | N/A — la paleta ya no es pastel |

## Referencias estudiadas

**Skiper UI** (`skiper-ui.com`, instalable via `npx shadcn add @skiper-ui/skiperN`, 106 componentes numerados) — catálogo de micro-interacciones "un-common": reveals de imagen, cursores custom, tooltips, dynamic island, etc. Se usa como fuente puntual de calidad de interacción, no como fuente de dirección de marca (igual que 21st.dev en v3).

**Refero — estilo Ghia** (aperitivo mediterráneo): paleta con roles fijos (burgundy `#651c32` primario, coral `#ef6079` CTA, crema `#f2e2d5` fondo, colores secundarios con un solo uso permitido cada uno), tipografía serif humanista + display condensado en mayúsculas, radio de pastilla (9999px) en botones/tags pero **fotografía como protagonista** (crops circulares de botella), cero gradientes, cero drop-shadow.

**Refero — estilo Woven** (whisky monocromático): casi sin color (`#eeede5` crema, `#232323` tinta, blanco), radio **0px en todo**, la fotografía de producto es literalmente el único color permitido en pantalla, tipografía mono + display propio, secciones con muchísimo aire (120-160px de separación).

**Sitios reales premiados** (Awwwards, vinos/spirits 2025-2026): confirman el mismo patrón — paletas de 2 colores bien definidos (ej. `#10312B` + `#F8EEDF`), animación con propósito narrativo (GSAP/scroll-story), fotografía/video como eje.

**Conclusión cruzada:** ningún sitio profesional de licor usa gradientes, glow ni radio blando. Todos usan una paleta angosta con roles fijos y dejan que la fotografía real sea el color dominante.

## Decisiones de diseño v4

- **Concepto de marca:** se mantiene "licorería nocturna tropical" (fondo casi negro, personalidad Costa Rica, mascota Pizote y fauna) — eso nunca fue lo rechazado. Lo que cambia es la ejecución: de "componentes de SaaS con acentos de colores" a "sistema editorial disciplinado con fotografía real como protagonista".
- **Paleta:** fondo casi negro sin tocar. Emerald (`#22B14C`/`#178A38`) pasa a ser el único acento de uso libre (CTA primario, estados activos). Hibiscus (`#FF3D8A`) se restringe a un solo rol — badges de descuento/oferta — igual que Limoncello en Ghia, no se vuelve a usar como decoración general. Gold sigue exclusivo del logo. Se retira "sky" como acento de uso libre (fue un parche de v3 para diluir el gold; bajo esta disciplina, un 4to acento vistoso es parte del problema, no la solución) — puede sobrevivir como tono neutro raro, no como color de marca.
- **Tipografía:** Fraunces + DM Sans se mantienen (ya no genéricos). Se empuja el display más grande/confiado y se agrega tratamiento de mayúsculas + tracking ancho para eyebrows/labels de sección, buscando el mismo peso editorial que Ghia/Woven.
- **Radio:** decisión decisiva de 2-6px (`rounded-sm`/`rounded-md`) en tarjetas, botones, inputs — no más `rounded-xl`/`rounded-2xl` por defecto. Excepción única y a propósito: medallones de fauna (círculo completo) y algún crop de producto puntual.
- **Sombras y gradientes:** fuera por completo. Profundidad = borde de 1px + contraste de color, no glow.
- **Fotografía de producto:** se le da más tamaño/protagonismo en ProductCard/CatalogSection en vez de thumbnails chicos genéricos.
- **Iconografía:** se termina la migración a Phosphor duotone en todo el storefront (Navbar, Footer, tarjetas, empty states) — cero lucide-react visible al cliente.

## Alcance de esta pasada

Tokens globales (`globals.css`, `tailwind.config.ts`) → Hero → Navbar/Footer → ProductCard/CatalogSection/KitCard → páginas de catálogo (categories/rebajas/combos-fiesteros/products) → limpieza final de lucide restante. Dashboard/checkout/carrito siguen fuera de alcance (páginas utilitarias, mismo criterio que v3).

Sin restricción de tiempo/alcance según el dueño ("no me importa cuánto código haya que cambiar"). Única restricción: nunca agregar a Claude como colaborador/co-autor en git.
