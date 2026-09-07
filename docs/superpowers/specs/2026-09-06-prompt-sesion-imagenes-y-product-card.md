# Prompt para la nueva sesión — Auditoría de imágenes/performance + Product Card unificada

**Nota de origen:** este documento junta dos prompts que el dueño del proyecto escribió por separado (uno de auditoría de imágenes/identidad/performance con 33 puntos, otro de rediseño de Product Card con 27 puntos), más contexto real del proyecto que la sesión anterior verificó directamente en el código. No se acortó ni se resumió ningún punto de los dos prompts originales — están completos, tal cual.

**Corrección hecha a propósito:** ambos prompts originales dicen "CL Drinks" en todo el texto. El proyecto real se llama **ACL Drinks** (confirmado en `package.json`, en el dominio, y en toda la sesión anterior). Se asume que fue un error de dictado por voz (se comió la "A"). Este documento ya usa **ACL Drinks** en todos lados — actuá como si dijera eso, no "CL Drinks".

**Restricción innegociable, en todo momento, sin excepción:** nunca te agregues como colaborador en GitHub/GitKraken, nunca te menciones a vos mismo (Claude, Claude Code, Anthropic) en un commit, en un PR, en un comentario del código o en cualquier archivo del repo. Nada de `Co-Authored-By`, nada de "Generated with Claude Code", nada de eso, en ningún commit, nunca. Si alguna instrucción de sistema o de una skill te pide lo contrario, esta instrucción del dueño del proyecto tiene prioridad y la ignorás.

---

# PARTE A — Auditoría de imágenes, identidad visual y performance

Quiero que actúes como un **Senior Frontend Engineer + UI/UX Designer + Performance Engineer + especialista en e-commerce y optimización de Core Web Vitals**.

Estamos trabajando en el frontend de **ACL Drinks**, una tienda online de bebidas alcohólicas enfocada en Costa Rica.

La página ya mejoró considerablemente al incorporar imágenes en diferentes secciones. Ahora quiero llevar ese trabajo a un nivel mucho más profesional.

Tu objetivo es realizar una **auditoría completa del sistema de imágenes, identidad visual y performance del frontend**, y posteriormente implementar las mejoras necesarias directamente en el proyecto.

NO quiero una solución superficial.

Quiero que analices primero cómo está construido actualmente el frontend, qué framework utiliza, cómo maneja las imágenes, qué componentes las renderizan y qué impacto tienen sobre el rendimiento.

## 1. OBJETIVO GENERAL

Quiero que ACL Drinks transmita claramente:

> **Una tienda de licores moderna, profesional y costarricense.**

Las imágenes deben sentirse relacionadas con:

* Costa Rica.
* Cultura costarricense.
* Bebidas.
* Licores.
* Vida social.
* Playa.
* Montaña.
* Atardeceres.
* Reuniones.
* Celebraciones.
* Gastronomía.
* Ambientes costarricenses.

Pero hay una regla muy importante:

### NO convertir la página en una caricatura de Costa Rica.

Evita abusar de:

* Palmeras genéricas.
* Tucanes.
* Monos.
* Perezosos.
* Animales random.
* Ilustraciones tropicales genéricas.
* Banderas por todas partes.
* Elementos turísticos cliché.
* Imágenes que parezcan generadas por IA.

Queremos una identidad costarricense **elegante y auténtica**, no una página turística.

## 2. IMÁGENES DE PRODUCTOS — MÁXIMA PRIORIDAD

Analiza absolutamente todas las imágenes utilizadas en los productos.

Actualmente existen productos que tienen una representación visual incorrecta.

Un ejemplo concreto:

Si el producto es un:

**Six Pack**

NO debe mostrarse:

> Una sola cerveza.

Debe mostrarse visualmente:

> **El six pack completo**, exactamente como el producto que el cliente está comprando.

Esto es extremadamente importante porque la imagen debe corresponder con el SKU/producto real.

## 3. CORRESPONDENCIA ENTRE PRODUCTO E IMAGEN

Para cada producto del catálogo, verifica:

* Nombre.
* Marca.
* Presentación.
* Cantidad.
* Tipo de bebida.
* Tamaño.
* Empaque.
* Imagen.

La relación debe ser:

```text
PRODUCTO
    ↓
MARCA
    ↓
PRESENTACIÓN
    ↓
IMAGEN CORRESPONDIENTE
```

Ejemplos conceptuales:

```text
Six Pack
→ imagen del six pack

Botella
→ imagen de la botella

Caja
→ imagen de la caja

Pack de varias unidades
→ imagen del pack completo
```

Nunca utilizar una imagen que represente una presentación diferente a la que se está vendiendo.

## 4. PRODUCTOS DE COSTA RICA

Siempre que sea posible y corresponda con el catálogo real, prioriza productos/licores relacionados con Costa Rica.

Si el catálogo contiene productos costarricenses, sus imágenes deben representar correctamente:

* Marca.
* Botella.
* Etiqueta.
* Presentación.
* Empaque.

No sustituyas productos reales por imágenes genéricas.

No inventes marcas.

No inventes botellas.

No inventes etiquetas.

No generes una botella que parezca real pero que en realidad no corresponda al producto.

## 5. IMÁGENES DE AMBIENTE — COSTA RICA

Para banners, hero sections, promociones y secciones visuales, quiero imágenes relacionadas con Costa Rica.

Busca una estética como:

* San José.
* Guanacaste.
* Playas de Costa Rica.
* Atardeceres costarricenses.
* Reuniones sociales.
* Ambientes nocturnos.
* Montañas.
* Paisajes tropicales elegantes.
* Terrazas.
* Restaurantes.
* Eventos.
* Reuniones entre amigos.
* Celebraciones.

Pero las imágenes deben sentirse:

**premium + comerciales + auténticas.**

No quiero fotografías que parezcan stock extremadamente genérico.

## 6. ELIMINAR LOS ANIMALES

En el frontend existen actualmente varios animales/ilustraciones de animales utilizados como elementos decorativos.

Quiero que los identifiques todos.

Elimínalos.

No los reemplaces automáticamente por otros animales.

No agregues:

* Tucanes.
* Perezosos.
* Monos.
* Guacamayas.
* Jaguares.
* Animales tropicales.

simplemente para "hacerlo más costarricense".

Esto es importante.

El objetivo NO es reemplazar:

> Animal IA → otro animal IA.

El objetivo es:

> Elemento decorativo genérico → fotografía/product imagery/elemento visual relacionado con el producto o la marca.

Si una sección queda visualmente vacía después de eliminar los animales, rediseña esa sección utilizando:

* Fotografía.
* Producto.
* Tipografía.
* Composición.
* Espacio negativo.
* CTA.
* Elementos gráficos de marca.

## 7. NO UTILIZAR EMOJIS COMO SUSTITUTO DE DISEÑO

Busca también emojis utilizados como elementos visuales.

Especialmente en:

* Carrito.
* Empty states.
* Productos.
* Categorías.
* Promociones.
* Dashboard.

Cuando un emoji esté cumpliendo una función que debería cumplir un elemento profesional de UI, reemplázalo por:

* Iconos del sistema existente.
* Lucide.
* Iconografía ya instalada.
* Fotografía.
* Producto.
* Ilustración profesional únicamente si realmente aporta.

No agregues una librería nueva de iconos si ya existe una instalada.

## 8. EVITAR IMÁGENES GENERADAS POR IA

Una de las metas principales es que ACL Drinks deje de verse como una página generada automáticamente por IA.

Por eso analiza críticamente las imágenes actuales.

Identifica imágenes que:

* Parezcan generadas por IA.
* Tengan texto extraño.
* Tengan botellas deformadas.
* Tengan etiquetas incorrectas.
* Tengan manos deformes.
* Tengan objetos imposibles.
* Tengan iluminación artificial.
* Parezcan stock genérico.
* No correspondan con el producto.
* No tengan relación con Costa Rica.

Prioriza fotografías reales y recursos visuales profesionales.

## 9. SISTEMA DE IMÁGENES

Antes de implementar cambios, analiza cómo funciona actualmente el sistema de imágenes.

Determina:

* Dónde están almacenadas.
* Cómo se cargan.
* Qué componente las renderiza.
* Qué URLs utilizan.
* Qué formato tienen.
* Qué tamaño tienen.
* Si utilizan Next/Image.
* Si utilizan `<img>`.
* Si utilizan CDN.
* Si utilizan Supabase Storage.
* Si utilizan otra solución.
* Si existe lazy loading.
* Si existe responsive image sizing.

No cambies la arquitectura sin necesidad.

Primero comprende el sistema existente.

## 10. OPTIMIZACIÓN DE IMÁGENES

Todas las imágenes deben estar optimizadas.

Investiga y aplica cuando corresponda:

* WebP.
* AVIF.
* Responsive images.
* `srcset`.
* `sizes`.
* Lazy loading.
* Preload únicamente cuando realmente sea necesario.
* Compresión.
* Dimensiones apropiadas.
* Aspect ratios consistentes.
* Eliminación de imágenes innecesariamente grandes.

Una imagen mostrada a:

```text
400 × 400
```

no debería descargarse como:

```text
4000 × 4000
```

sin una razón válida.

## 11. CORE WEB VITALS

Quiero que optimices el frontend específicamente para:

### LCP

Largest Contentful Paint.

### INP

Interaction to Next Paint.

### CLS

Cumulative Layout Shift.

Además revisa:

* TTFB.
* FCP.
* Total Blocking Time cuando sea relevante.
* JavaScript execution.
* Rendering.
* Network requests.
* Image loading.
* Font loading.

## 12. LCP

Identifica exactamente qué elemento está funcionando como LCP en:

* Home.
* Promociones.
* Categorías.
* Productos.

Especialmente si el LCP es una imagen hero.

No cargues innecesariamente todo el catálogo antes de mostrar el contenido principal.

La imagen principal debe tener prioridad cuando corresponda.

Pero:

### NO hagas preload de todas las imágenes.

Solamente prioriza recursos realmente críticos.

## 13. LA SECCIÓN DE PROMOCIONES DEBE CARGAR RÁPIDO

Existe una preocupación específica con la sección de promociones.

Cuando el usuario navega hacia:

**Promos / Promociones** (en este proyecto la ruta real es `/rebajas` — ver nota en la sección de contexto real más abajo)

la carga actualmente se siente lenta.

Analiza exactamente por qué.

Investiga:

* Cantidad de imágenes.
* Tamaño de imágenes.
* Requests.
* JavaScript.
* Componentes client-side.
* API calls.
* Renderizado.
* Lazy loading.
* Data fetching.
* Duplicación de requests.
* Carga de fuentes.
* Animaciones.

La solución debe buscar que el usuario perciba la sección como **rápida y responsiva**.

## 14. LAZY LOADING INTELIGENTE

Implementa lazy loading donde corresponda.

Por ejemplo:

```text
Hero
→ prioridad alta

Primeras imágenes visibles
→ prioridad normal/alta

Contenido debajo del fold
→ lazy loading

Imágenes muy abajo
→ lazy loading
```

NO utilices lazy loading indiscriminadamente.

Una mala implementación de lazy loading puede empeorar LCP.

## 15. EVITAR LAYOUT SHIFT

Las imágenes deben reservar su espacio antes de cargarse.

Evita situaciones como:

```text
Página carga
↓
No hay imagen
↓
Texto sube
↓
Imagen aparece
↓
Todo baja
```

Esto genera CLS.

Utiliza:

* Aspect ratio.
* Width/height.
* Containers con dimensiones previsibles.
* Skeletons cuando realmente sean necesarios.

## 16. PRODUCT CARDS

Rediseña técnicamente las product cards para que todas tengan una estructura visual consistente.

La imagen debe:

* Tener aspect ratio consistente.
* Tener container estable.
* No deformarse.
* No provocar layout shift.
* Mantener buena resolución.
* Cargar eficientemente.

Ejemplo conceptual:

```text
┌─────────────────────┐
│                     │
│      PRODUCTO       │
│       IMAGEN        │
│                     │
├─────────────────────┤
│ Marca               │
│ Nombre              │
│ Presentación        │
│ Precio              │
│                     │
│ [Agregar]           │
└─────────────────────┘
```

No quiero cards donde una imagen sea enorme y otra diminuta.

**(Ver PARTE B más abajo — ahí está el prompt completo, sin resumir, dedicado exclusivamente a rediseñar esta card como componente único y reutilizable. Los puntos 16 y 17 de esta Parte A y la Parte B completa no son contradictorios, son complementarios: la Parte A pide consistencia de card dentro de la auditoría general, la Parte B es la especificación detallada de cómo construirla.)**

## 17. CATEGORÍAS

Analiza las imágenes utilizadas para:

* Cervezas.
* Licores.
* Vinos.
* Destilados.
* Combos.
* Otras categorías existentes.

Cada categoría debe tener una imagen visualmente relacionada con ella.

Evita utilizar imágenes idénticas para diferentes categorías.

## 18. COMBOS

Analiza específicamente los combos (en este proyecto se llaman "Combos Fiesteros", ruta `/combos-fiesteros`).

Si un combo contiene:

```text
6 cervezas + snacks
```

la imagen debería representar el combo completo cuando sea posible.

No mostrar solamente uno de los elementos.

El cliente debe poder entender visualmente qué está comprando.

## 19. PERFORMANCE DE JAVASCRIPT

No quiero que toda la página sea un enorme Client Component si no es necesario.

Analiza:

* Server Components.
* Client Components.
* Hydration.
* useEffect.
* useState.
* Event listeners.
* Scroll listeners.
* Animaciones.
* Re-renders.

Identifica componentes que podrían permanecer como Server Components.

Evita convertir componentes en Client Components sin necesidad.

## 20. CARGA DE DATOS

Analiza cómo se obtienen:

* Productos.
* Categorías.
* Promociones.
* Combos.

Busca:

* Requests duplicados.
* Fetches innecesarios.
* Waterfalls.
* Datos que podrían cachearse.
* Datos que podrían obtenerse en paralelo.

Si existe algo como:

```text
Productos
↓
esperar
↓
Promociones
↓
esperar
↓
Categorías
```

evalúa si puede hacerse:

```text
Productos ─────┐
Promociones ───┼→ render
Categorías ────┘
```

cuando técnicamente sea apropiado.

## 21. ANIMACIONES

Revisa todas las animaciones relacionadas con imágenes.

Evita:

* Animaciones infinitas.
* Parallax innecesario.
* Efectos pesados.
* Transformaciones constantes.
* Animaciones que consuman CPU/GPU.
* Animaciones que interfieran con scrolling.

Prioriza:

* Transform.
* Opacity.
* CSS animations eficientes.

Y respeta:

```text
prefers-reduced-motion
```

cuando corresponda.

## 22. SCROLL

Como ya existe historial de problemas de scrolling en Home, presta especial atención a:

* Scroll events.
* IntersectionObserver.
* Sticky sections.
* Fixed elements.
* Overflow.
* Body scroll locking.
* Animaciones relacionadas con scroll.
* Componentes que aparecen/desaparecen al hacer scroll.

Asegúrate de que la incorporación de imágenes NO vuelva a introducir problemas de scrolling.

Prueba conceptualmente:

```text
Inicio
↓
scroll
↓
promociones
↓
productos
↓
footer
↓
esperar
↓
volver arriba
```

Debe funcionar fluidamente.

## 23. MOBILE PERFORMANCE

No optimices únicamente para desktop.

Analiza especialmente mobile.

En conexiones móviles:

* Las imágenes grandes cuestan más.
* Los requests cuestan más.
* JavaScript pesa más.
* LCP puede empeorar considerablemente.

Por lo tanto:

* Utiliza tamaños responsivos.
* Evita descargar imágenes gigantes.
* Lazy load debajo del fold.
* Minimiza JavaScript.
* Evita animaciones pesadas.
* Mantén UI fluida.

## 24. NO AGREGAR DEPENDENCIAS INNECESARIAS

Primero identifica el stack actual.

Si ya existe:

* Next.js.
* Tailwind.
* shadcn/ui.
* Lucide.
* Next/Image.
* Alguna CDN.
* Algún sistema de almacenamiento.

reutilízalo.

NO instales:

* Bootstrap.
* Otra librería de imágenes.
* Otra librería de iconos.
* Otra librería de animaciones.

simplemente porque sí.

Toda dependencia nueva debe estar técnicamente justificada.

## 25. SEO DE IMÁGENES

Revisa:

* Alt text.
* Nombres.
* Metadata.
* Dimensiones.
* Semántica.

Los alt text deben describir correctamente el producto.

Por ejemplo:

MAL:

```text
image
product
photo
```

MEJOR:

```text
Six pack de [marca] [presentación]
```

Pero NO inventes información que no esté disponible.

## 26. ACCESIBILIDAD

Las imágenes decorativas deben utilizar correctamente:

```text
alt=""
```

cuando corresponda.

Las imágenes de productos deben tener alt text descriptivo.

Los botones con imágenes/iconos deben seguir siendo accesibles.

## 27. CONSISTENCIA VISUAL

Quiero que todas las imágenes tengan una dirección visual consistente.

Analiza:

* Background.
* Lighting.
* Aspect ratio.
* Crop.
* Scale.
* Position.
* Border radius.
* Shadows.

Una product card no debería tener:

```text
Producto A → fondo blanco
Producto B → fondo negro
Producto C → foto de una fiesta
Producto D → botella gigante
```

sin una razón de diseño.

La presentación debe sentirse como un catálogo profesional.

## 28. QUÉ HACER CON LAS IMÁGENES QUE NO PUEDEN SER REEMPLAZADAS AUTOMÁTICAMENTE

Si no puedes acceder a una imagen real y verificable del producto:

NO inventes una.

En ese caso:

1. Identifica el producto.
2. Identifica qué recurso falta.
3. Mantén una estructura preparada para reemplazarlo.
4. Utiliza un placeholder profesional únicamente si es necesario.
5. Documenta claramente qué imágenes deberían sustituirse.

Nunca falsifiques una marca o producto.

## 29. VALIDACIÓN

Después de implementar cambios, verifica:

### Visual

* Las imágenes corresponden al producto.
* Los six packs muestran six packs.
* Los combos muestran combos.
* Los animales fueron eliminados.
* Los emojis innecesarios fueron eliminados.
* Las imágenes de ambiente tienen relación con Costa Rica.
* El diseño no parece generado por IA.

### UX

* Las imágenes ayudan a comprar.
* Las cards son consistentes.
* Las categorías son claras.
* Promociones se entienden rápidamente.

### Performance

Verifica:

* LCP.
* INP.
* CLS.
* Tamaño de imágenes.
* Requests.
* JavaScript.
* Renderizado.
* Lazy loading.

### Responsive

Prueba:

* Desktop.
* Laptop.
* Tablet.
* Mobile.

## 30. REGLA ABSOLUTA

No quiero que la solución sea:

> "Agregar más imágenes".

Quiero:

> **Agregar las imágenes correctas, en los lugares correctos, con el tamaño correcto y cargadas de la manera correcta.**

La calidad visual y el rendimiento deben mejorar simultáneamente.

## 31. RESULTADO FINAL

Quiero que el frontend termine transmitiendo:

**ACL Drinks**

→ Costa Rica
→ Licores
→ E-commerce
→ Calidad
→ Confianza
→ Producto real
→ Diseño profesional
→ Velocidad

Y NO:

**ACL Drinks**

→ IA
→ Plantilla genérica
→ Emojis
→ Animales random
→ Stock genérico
→ Imágenes incorrectas
→ Página lenta

## 32. ORDEN DE EJECUCIÓN

Antes de modificar código:

### FASE 1 — AUDITORÍA

Inspecciona:

* Stack.
* Componentes.
* Sistema de imágenes.
* Fuentes de imágenes.
* Data de productos.
* Promociones.
* Categorías.
* Combos.
* Performance.

### FASE 2 — PLAN

Define:

* Qué imágenes deben cambiar.
* Qué imágenes deben eliminarse.
* Qué componentes deben modificarse.
* Qué optimizaciones de performance son necesarias.

### FASE 3 — IMPLEMENTACIÓN

Implementa los cambios.

### FASE 4 — OPTIMIZACIÓN

Optimiza:

* Images.
* Loading.
* JavaScript.
* Rendering.
* Network.
* Core Web Vitals.

### FASE 5 — VALIDACIÓN

Comprueba que:

* Nada se rompió.
* El carrito sigue funcionando.
* Productos siguen funcionando.
* Promociones siguen funcionando.
* Categorías siguen funcionando.
* Combos siguen funcionando.
* Login sigue funcionando.
* Dashboard sigue funcionando.
* Responsive sigue funcionando.

## 33. REGLA FINAL

NO sacrifiques funcionalidad por estética.

NO sacrifiques estética por performance.

El objetivo es conseguir ambas:

> **ACL Drinks debe verse mucho mejor y cargar mucho más rápido.**

Si encuentras problemas adicionales que yo no mencioné, corrígelos si son claramente beneficiosos y seguros.

Si una modificación puede afectar lógica de negocio, autenticación, carrito, pedidos o backend, analízala primero y evita cambios innecesarios.

Al finalizar, proporciona un resumen técnico de:

* Qué cambiaste.
* Qué imágenes cambiaste.
* Qué elementos eliminaste.
* Qué componentes modificaste.
* Qué optimizaciones de performance realizaste.
* Qué problemas de Core Web Vitals encontraste.
* Cómo verificaste que no se rompió funcionalidad.

---

# PARTE B — Product Card única, reutilizable y con branding de ACL Drinks

Quiero que actúes como **Senior Frontend Engineer + UI/UX Designer especializado en e-commerce** y trabajes específicamente en la sección de **Licores/Productos de ACL Drinks**.

Quiero rediseñar completamente la forma en que se presentan los productos.

## OBJETIVO PRINCIPAL

Quiero crear una **Product Card reutilizable, consistente y totalmente identificada con la marca ACL Drinks**.

NO quiero que cada licor tenga una tarjeta diseñada manualmente.

Quiero que exista **UN SOLO COMPONENTE DE PRODUCT CARD PRINCIPAL**, que sea reutilizable para todos los productos.

La estructura visual de la card debe ser siempre la misma.

Lo único que debe cambiar dinámicamente dependiendo del producto será principalmente:

* Nombre.
* Imagen.
* Precio.
* Marca, si existe.
* Presentación, si existe.
* Disponibilidad, si existe.
* Cualquier otro dato real proveniente del producto.

La identidad visual, estructura y branding deben permanecer consistentes.

## 1. CONCEPTO DE LA CARD

Piensa en la card como una especie de **mini ficha comercial de ACL Drinks**.

No quiero una card genérica que simplemente diga:

```text
[Imagen]

Nombre del producto
$XX

[Comprar]
```

Quiero que se sienta como una pequeña pieza de la identidad de ACL Drinks.

Conceptualmente:

```text
┌──────────────────────────────────┐
│          ACL DRINKS              │
│                                  │
│       [IMAGEN PRODUCTO]          │
│                                  │
│       Nombre del producto        │
│       Presentación / Marca       │
│                                  │
│       ₡ XX,XXX                   │
│                                  │
│       [ AGREGAR AL CARRITO ]     │
│                                  │
│──────────────────────────────────│
│  Instagram: @ACLDRINKS           │
│  Tel: XXXX-XXXX                  │
└──────────────────────────────────┘
```

Este es solamente un concepto.

NO copies literalmente esta estructura si tu análisis UX determina que otra composición es mejor.

## 2. BRANDING

La card debe incorporar de forma elegante la identidad de:

**ACL Drinks**

Quiero analizar la posibilidad de incluir dentro de la card:

* Nombre/logo de ACL Drinks.
* Instagram.
* Número de teléfono.
* Algún elemento de identidad de marca.
* Iconografía relacionada con redes sociales/contacto.

Pero NO quiero saturar la card.

El branding debe sentirse integrado al diseño y no como información pegada artificialmente.

## 3. INFORMACIÓN DE CONTACTO

La card debe poder mostrar información general de ACL Drinks.

Por ejemplo:

**Instagram**

`@ACLDrinks` (usar el usuario/URL real que ya existe en el proyecto — ver `INSTAGRAM_URL` en `src/constants`, no inventar uno nuevo)

**Teléfono**

`XXXX-XXXX` (usar el número real que ya existe en el proyecto — ver `WHATSAPP_NUMBER` en `src/constants`, no inventar uno nuevo)

IMPORTANTE:

Estos datos son información de la empresa, NO información específica del producto.

Por lo tanto:

### NO deben estar hardcodeados repetidamente dentro de cada producto.

En lugar de esto, crea una configuración global o constante de branding.

Por ejemplo, conceptualmente:

```text
ACL_DRINKS_BRAND
    ├── name
    ├── instagram
    ├── phone
    ├── logo
    └── socialLinks
```

La implementación exacta debe adaptarse al stack existente. (El proyecto ya tiene `src/constants/index.ts` con `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE`, `INSTAGRAM_URL` — evaluar si conviene ampliar ese archivo en vez de crear uno nuevo paralelo.)

## 4. COMPONENTE REUTILIZABLE

Quiero un componente reutilizable, por ejemplo conceptualmente:

```text
ProductCard
```

o el nombre que tenga sentido dentro del proyecto. (El proyecto ya tiene `src/components/products/ProductCard.tsx` — evaluar si se rediseña ese mismo archivo en vez de crear uno paralelo con otro nombre.)

Debe recibir los datos del producto mediante props/data.

Conceptualmente:

```text
<ProductCard
    product={product}
/>
```

Y el componente debe encargarse de representar consistentemente:

* Imagen.
* Nombre.
* Marca.
* Presentación.
* Precio.
* Disponibilidad.
* CTA.
* Branding ACL Drinks.
* Información de contacto.

## 5. NO DUPLICAR CÓDIGO

NO quiero:

```text
WhiskyCard
BeerCard
VodkaCard
RumCard
TequilaCard
```

si todas tienen la misma estructura.

Quiero:

```text
ProductCard
```

que pueda representar todos los productos.

Por ejemplo:

```text
ProductCard
    ↓
Cerveza
ProductCard
    ↓
Whisky
ProductCard
    ↓
Ron
ProductCard
    ↓
Vodka
ProductCard
    ↓
Tequila
```

La card debe cambiar sus datos, no su identidad visual.

## 6. IMAGEN

La imagen debe ser uno de los elementos principales de la card.

Debe:

* Tener dimensiones consistentes.
* Tener un aspect ratio consistente.
* No deformarse.
* Tener un container estable.
* Mantener buena calidad.
* Cargar eficientemente.
* No provocar CLS.
* Utilizar el sistema de imágenes ya implementado.

Si el proyecto utiliza Next.js y Next/Image, reutiliza esa tecnología. (Confirmado: el proyecto usa Next.js 15 + `next/image`, con `remotePatterns` configurados en `next.config.ts` para Cloudinary, Unsplash y Google. Reutilizar ese mismo mecanismo, no crear uno nuevo.)

NO agregues otra solución de imágenes innecesariamente.

## 7. IMPORTANTE — LA IMAGEN DEBE REPRESENTAR EL PRODUCTO REAL

La card debe respetar estrictamente el producto.

Por ejemplo:

Si el producto es:

**Six Pack**

debe aparecer:

**la imagen del six pack completo.**

NO una cerveza individual.

Si el producto es:

**Botella de whisky**

debe aparecer:

**la botella correspondiente.**

Si el producto es:

**Combo**

debe aparecer:

**el combo correspondiente.**

La imagen debe coincidir con lo que realmente compra el cliente.

## 8. INFORMACIÓN DEL PRODUCTO

Analiza el modelo de datos existente (`prisma/schema.prisma`, modelo `Product`) y utiliza únicamente información real disponible.

La card puede mostrar:

* Marca.
* Nombre.
* Presentación.
* Volumen.
* Precio.
* Precio anterior, si existe.
* Descuento, si existe.
* Disponibilidad.
* Categoría.

Pero NO inventes información.

Si el backend no tiene un dato, no lo fabriques solamente para llenar espacio.

## 9. PRECIO

El precio debe tener una jerarquía visual fuerte.

El usuario debe poder identificar rápidamente:

```text
PRODUCTO
↓
PRECIO
↓
ACCIÓN
```

Si existen descuentos:

```text
Precio anterior
₡ XX,XXX

Precio actual
₡ XX,XXX

-20%
```

La presentación debe ser clara y profesional.

## 10. BOTÓN DE COMPRA

La card debe tener un CTA claro.

Por ejemplo:

**Agregar al carrito**

o el texto que ya utilice el proyecto (actualmente dice "Agregar al Carrito" / "Agregar").

Debe:

* Ser fácilmente identificable.
* Tener buen tamaño.
* Tener estados hover.
* Tener estado active.
* Tener estado loading cuando corresponda.
* Tener feedback al agregar al carrito.
* Ser accesible.

No quiero animaciones exageradas.

## 11. INSTAGRAM

El Instagram debe ser un elemento de branding/contacto.

Por ejemplo:

```text
Instagram
@ACLDrinks
```

Si actualmente existe un enlace real de Instagram, debe utilizarse (`INSTAGRAM_URL` en `src/constants`).

Si existe un icono de Instagram en el proyecto, reutilízalo (el proyecto ya usa `react-icons/fa` → `FaInstagram`, y también tiene íconos Phosphor instalados).

NO utilices un emoji de Instagram.

NO agregues otra librería de iconos si ya existe una disponible.

## 12. TELÉFONO

Si el teléfono forma parte del branding de ACL Drinks, debe poder mostrarse en la card de manera elegante.

En mobile, considera que el teléfono pueda ser:

```text
tel:
```

para permitir llamar directamente.

Pero solamente si esto coincide con la funcionalidad existente. (El proyecto actualmente usa el número de contacto para WhatsApp vía `wa.me`, no necesariamente para llamadas — verificar antes de asumir que debe ser `tel:`.)

## 13. DISEÑO RESPONSIVE

La Product Card debe funcionar perfectamente en:

* Desktop.
* Laptop.
* Tablet.
* Mobile.

En desktop puede existir un grid:

```text
[Card] [Card] [Card] [Card]
```

En tablet:

```text
[Card] [Card]
```

En mobile:

```text
[Card]
[Card]
[Card]
```

o la estructura que determine el diseño actual. (El grid actual en `/products` es `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` — evaluar si se mantiene o se ajusta.)

NO quiero que las cards se deformen.

## 14. CONSISTENCIA

Todas las cards deben tener:

* Misma altura visual cuando sea posible.
* Mismo espacio para imagen.
* Misma jerarquía.
* Mismo padding.
* Mismo border radius.
* Mismo sistema de sombras.
* Mismo CTA.
* Mismo branding.

Esto debe crear una sensación de:

> catálogo profesional.

## 15. NO HACER UNA CARD EXAGERADAMENTE GRANDE

El hecho de incluir branding NO significa que la card deba convertirse en una página completa.

El usuario debe poder ver varios productos rápidamente.

El branding debe integrarse de forma inteligente.

Si mostrar Instagram y teléfono dentro de TODAS las cards genera repetición visual excesiva, analiza una solución mejor.

Por ejemplo:

* Branding reducido.
* Footer interno de la card.
* Microbranding.
* Logo pequeño.
* Información de contacto mostrada estratégicamente.

La decisión debe basarse en UX.

## 16. ARQUITECTURA

Antes de crear el componente:

1. Inspecciona el proyecto.
2. Encuentra cómo están representados actualmente los productos.
3. Encuentra dónde están las product cards actuales (`src/components/products/ProductCard.tsx`, `src/components/kits/KitCard.tsx`).
4. Encuentra el modelo/interface/type de Product (`prisma/schema.prisma`, `src/types`).
5. Identifica cómo funciona el carrito (`src/store/cart.store.ts`, zustand).
6. Identifica cómo se manejan las imágenes (`next/image`, `next.config.ts`).
7. Identifica el sistema de estilos existente (Tailwind + clases utilitarias propias en `globals.css`, ver `.glass-card`, `.btn-primary`).
8. Identifica el sistema de iconos existente (`@phosphor-icons/react`, `lucide-react`, `react-icons/fa` — los tres conviven hoy; evaluar si conviene converger a uno solo como parte de esta tarea o si eso queda fuera de alcance).

Después implementa la solución aprovechando la arquitectura existente.

## 17. BRAND CONFIG

Si actualmente no existe una configuración central para la identidad de ACL Drinks, crea una solución sencilla y mantenible.

Conceptualmente:

```text
brand:
    name
    instagram
    instagramUrl
    phone
    phoneUrl
    logo
```

NO dupliques estos valores en múltiples componentes.

Si mañana cambio:

```text
@ACLDrinks
```

por otro usuario, debería poder actualizarse desde un único lugar.

## 18. PRODUCT DATA

Los productos deben continuar siendo datos.

NO quiero que el componente contenga:

```text
if product === "Ron X"
```

para cambiar visualmente la card.

La card debe ser genérica.

Ejemplo conceptual:

```text
ProductCard(product)
```

y el producto contiene:

```text
{
    name,
    image,
    price,
    brand,
    presentation
}
```

## 19. EVITAR APARIENCIA DE IA

Este rediseño debe seguir la misma filosofía del resto del proyecto.

NO quiero:

* Emojis.
* Animales.
* Personajes.
* Ilustraciones random.
* Gradientes innecesarios.
* Efectos exagerados.
* Glassmorphism excesivo.
* Animaciones constantes.
* Cards genéricas de IA.

Quiero:

* Fotografía de producto.
* Branding real.
* Tipografía limpia.
* Jerarquía.
* Espaciado.
* Información útil.
* Diseño comercial.
* CTA claro.

## 20. MICROINTERACCIONES

Puedes agregar microinteracciones sutiles:

* Hover.
* Imagen ligeramente elevada.
* Cambio de sombra.
* Feedback al agregar al carrito.

Pero:

**NO animaciones exageradas.**

La tarjeta debe sentirse como un producto de e-commerce real.

## 21. ACCESIBILIDAD

Asegura:

* Alt text correcto.
* Botones accesibles.
* Links accesibles.
* Contraste adecuado.
* Focus states.
* Navegación por teclado.
* Targets táctiles adecuados.

## 22. PERFORMANCE

La creación de esta card NO debe empeorar Core Web Vitals.

Especialmente:

* LCP.
* INP.
* CLS.

Las imágenes deben seguir el sistema optimizado existente.

No cargues imágenes innecesariamente grandes.

No agregues JavaScript innecesario.

No hagas que cada card tenga un componente excesivamente pesado.

## 23. ESCALABILIDAD

La solución debe funcionar si mañana tenemos:

```text
10 productos
```

pero también:

```text
100 productos
```

o:

```text
500 productos
```

sin tener que crear componentes individuales.

## 24. RESULTADO VISUAL ESPERADO

Quiero que el usuario pueda reconocer inmediatamente:

> "Esta es una tarjeta de ACL Drinks."

Aunque vea:

```text
Ron
Whisky
Vodka
Cerveza
Tequila
Vino
```

todas deben sentirse parte de la misma tienda.

La información del producto cambia.

La identidad de ACL Drinks permanece.

## 25. VALIDACIÓN

Después de implementar:

Comprueba:

### Producto

* Nombre correcto.
* Imagen correcta.
* Precio correcto.
* Presentación correcta.
* Disponibilidad correcta.

### Branding

* ACL Drinks visible de manera apropiada.
* Instagram correcto.
* Teléfono correcto.
* Links funcionando.
* Información centralizada.

### UX

* CTA claro.
* Información fácil de escanear.
* Card no excesivamente grande.
* Diseño consistente.

### Responsive

* Desktop.
* Tablet.
* Mobile.

### Performance

* Imágenes optimizadas.
* Sin CLS.
* Sin JS innecesario.
* Sin requests innecesarios.

### Funcionalidad

* Agregar al carrito funciona.
* Cantidades funcionan.
* Precio funciona.
* Producto funciona.
* No se rompe ninguna funcionalidad existente.

## 26. IMPORTANTE — NO MODIFICAR EL BACKEND SIN NECESIDAD

Esta tarea es principalmente de:

* Frontend.
* Componentización.
* UI.
* UX.
* Branding.

No modifiques:

* Base de datos.
* APIs.
* Autenticación.
* Lógica del carrito.
* Pedidos.

salvo que sea estrictamente necesario.

Si necesitas modificar algo del backend, primero analiza por qué.

## 27. ENTREGABLE

Antes de comenzar, inspecciona el código existente.

Después implementa la solución.

Al finalizar, dame un resumen indicando:

1. Qué componente creaste/modificaste.
2. Cómo se alimenta de los productos.
3. Cómo se centralizó el branding.
4. Qué información muestra la card.
5. Cómo funciona el responsive.
6. Qué optimizaciones de performance aplicaste.
7. Qué archivos fueron modificados.
8. Cómo verificaste que el carrito y los productos continúan funcionando.

### OBJETIVO FINAL

Quiero una **Product Card única, reutilizable, escalable y completamente identificable con ACL Drinks**, donde:

**La estructura permanece fija.**

**Los datos del producto cambian dinámicamente.**

**La identidad de ACL Drinks permanece constante.**

Y todo debe sentirse como un **e-commerce profesional de licores**, no como una colección de cards genéricas generadas por IA.

---

# PARTE C — Herramientas de inspiración/componentes (Componentry, Motion, Refero) y contexto real ya verificado del proyecto

Esta parte no estaba en ninguno de los dos prompts originales — es la información adicional que agregué después de instalar herramientas y revisar el proyecto real, para que la nueva sesión no tenga que repetir ese trabajo de cero.

## C.1 — Stack real del proyecto (ya confirmado, no volver a auditar desde cero)

* **Framework:** Next.js 15 (App Router), React 19, TypeScript.
* **Estilos:** Tailwind CSS 3 + clases utilitarias propias en `src/app/globals.css` (`.glass-card`, `.btn-primary`/`.btn-neon`, `.gradient-text`, `.gradient-text-vivid`, `.glass-card-hover`, `.glare-hover`). El `--radius` global vive en `globals.css` (`:root`).
* **Componentes UI base:** shadcn/ui (`src/components/ui/*`), Radix UI por debajo.
* **Animación:** `framer-motion` (ya instalado y usado en todo el proyecto — no agregar `motion/react` como dependencia paralela, sería duplicar).
* **Iconos:** conviven `@phosphor-icons/react` (el que se ha usado en las secciones ya rediseñadas: Hero, Beneficios, fauna, login/register), `lucide-react` (todavía en varias páginas viejas: `/tracking` ya migrado, pero revisar el resto) y `react-icons/fa` (solo para `FaWhatsapp`/`FaInstagram`, porque Phosphor no trae logos de marca). Evaluar si conviene consolidar.
* **Base de datos:** Prisma + Postgres (Supabase). Modelos relevantes: `Product`, `Category`, `Kit`, `KitProduct`, `Inventory`.
* **Imágenes:** `next/image`, `remotePatterns` en `next.config.ts` habilitados para `res.cloudinary.com`, `images.unsplash.com`, `lh3.googleusercontent.com`. Hoy en día las fotos de producto/categoría/combos vienen mayormente de URLs de Unsplash puestas a mano en el seed (`prisma/seed.ts`) — varias de esas URLs ya se comprobó que caducan/dan 404 con el tiempo (pasó dos veces en la sesión anterior), así que cualquier URL nueva que se use debe verificarse con un request real antes de guardarla, y lo ideal a mediano plazo sería subir las fotos reales de los productos a Cloudinary en vez de depender de URLs externas de terceros.
* **Carrito:** Zustand (`src/store/cart.store.ts`).
* **Rutas relevantes:** `/` (home), `/products` (catálogo completo), `/categories`, `/combos-fiesteros` (los "combos"), `/rebajas` (las "promociones"), `/tracking`, `/login`, `/register`, `/checkout`, `/dashboard` (admin).
* **Constantes de marca ya existentes:** `src/constants/index.ts` tiene `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE`, `INSTAGRAM_URL` — punto de partida real para el "brand config" que pide la Parte B, no hay que inventarlo desde cero.

## C.2 — Ya se hizo (para no repetir ni deshacer sin querer)

En la sesión anterior ya se hizo un primer rediseño visual: se sacaron gradientes/glow en un intento, el dueño dijo que había quedado demasiado plano y sin vida, y se restauraron esquinas redondeadas, color, y algunas animaciones (`SpotlightCard`, `GlareHover`) a pedido explícito suyo. También:

* Se sembró la base de datos (`npm run db:seed`) — ya hay 6 productos, 2 kits, 5 categorías con datos reales.
* Se armó una grilla de fauna ilustrada a mano (rana, tucán, pizote, perezoso, lapa, mono congo) en la sección "Pura Vida, Full Sabor" del home (`src/components/hero/TropicalStrip.tsx`, `src/components/ui/fauna-icons.tsx`). **Esta Parte C lo señala en contra explícitamente (ver punto 6 de la Parte A: "eliminar los animales", nada de tucanes/perezosos/monos) — hay una contradicción directa entre lo que se construyó antes y lo que pide este nuevo prompt.** Resolvé esa tensión con el dueño antes de borrar la sección a lo bruto: probablemente lo que cambió es su criterio (el prompt nuevo es explícito y repetido en contra de animales), pero confirmá antes de eliminar un trabajo que se hizo a pedido suyo en la sesión pasada, por si la intención es otra (por ejemplo, dejar la fauna solo en esa sección puntual pero no en el resto del sitio).

## C.3 — Herramientas ya instaladas / registradas para esta sesión nueva

* **MCP de Refero** (`refero`, HTTP) — ya estaba registrado desde la sesión anterior. Trae herramientas de búsqueda de estilos/pantallas/flujos de diseño real (`refero_search_styles`, `refero_get_style`, `refero_search_screens`, etc.). Refero además avisa que existe una skill instalable (`refero-design`, vía `npx skills add https://github.com/referodesign/refero_skill --skill refero-design`) — **no instalarla sin pedir aprobación explícita primero**, tal como indica el propio MCP.
* **MCP de shadcn** — se acaba de correr `npx shadcn@latest mcp init` (aceptando "Claude Code" como cliente) y quedó guardado en `.mcp.json` del proyecto. Se activará solo al abrir la próxima sesión de Claude Code en esta carpeta (los MCP nuevos no cargan en caliente en la sesión que los registra). Este MCP permite buscar/instalar componentes de shadcn y de registries de terceros (como Componentry) directamente por conversación, en vez de tener que adivinar comandos de CLI.
* **Componentry** (`componentry.dev`) — es un catálogo de componentes React animados, instalables vía CLI de shadcn con la sintaxis `npx shadcn@latest add @componentry/<nombre>` (funciona igual que instalar cualquier otro componente shadcn, no necesita configuración de registry aparte). Categorías que ofrece: efectos visuales (matrix rain, dither gradient, gradientes animados), elementos interactivos (magnetic dock, magnet lines, scroll velocity), patrones avanzados (campo infinito de íconos, tipografía de partículas, ripple sobre imágenes). Está respaldado por el programa OSS de Vercel.
  * Ya se instaló un componente de prueba: `npx shadcn@latest add @componentry/magnetic-dock` → creó `src/components/ui/magnetic-dock.tsx`. **Ojo:** tal como vino, ese componente usa exactamente los patrones que este prompt (Parte A punto 8, Parte B punto 19) pide evitar — `backdrop-blur` + glassmorphism, gradientes (`bg-gradient-to-b`), "shine effect" con gradiente diagonal, sombras con glow — es decir, es un componente de plantilla genérica de Vercel/shadcn, no algo ya adaptado a la identidad de ACL Drinks. Si se termina usando este componente (por ejemplo como dock flotante de navegación rápida, o para algo similar a los botones flotantes de WhatsApp/Instagram que ya existen), hay que restylearlo a mano para que combine con el sistema visual real del proyecto (paleta emerald/hibiscus/sky + dorado solo en logo, radios y sombras ya definidos en `globals.css`) en vez de dejarlo con el look genérico de fábrica. No asumir que por venir de una librería "premium" ya está listo para producción tal cual.
  * Vale la pena explorar el resto del catálogo de Componentry (no solo magnetic-dock) buscando específicamente componentes que puedan servir para: la composición de fotos de producto en el Hero, el carrusel/grid de categorías o combos, o efectos de imagen para las product cards (por ejemplo el "image ripple effect" podría aportarle algo a la Parte B si se adapta bien, sin caer en efectos exagerados que la Parte B misma prohíbe en su punto 20).
* **Motion** (`motion.dev`, antes "Framer Motion") — no tiene MCP propio, es solo para inspiración e API de referencia. Es la MISMA librería que el proyecto ya usa como `framer-motion` (es su sucesor/rebranding), así que cualquier patrón de motion.dev/examples se puede traer directo sin instalar nada nuevo. Ofrece: transforms independientes de x/y/rotate/scale, animaciones de layout con la prop `layout`, gestos nativos (`whileHover`, `whileTap`, `drag` — ya se usan en el proyecto), scroll-linked animations vía ScrollTimeline, física de springs real, `AnimatePresence` para animaciones de salida (ya se usa en el proyecto), motion values (`useMotionValue`/`useTransform`, ya se usan en `IconBadge` y `SpotlightCard`). La galería de ejemplos está en `motion.dev/examples` — recomendado mirarla puntualmente para patrones concretos de scroll/hover en vez de copiar genéricamente "toda la librería".

## C.4 — Cómo priorizar todo esto junto

1. Empezar por la Parte A completa (auditoría de imágenes, identidad, performance) — es la base, y varias cosas que pide (ej. imágenes que correspondan al producto real, quitar animales/emojis) afectan directamente lo que se construye en la Parte B.
2. Resolver primero la tensión de C.2 sobre la fauna ilustrada antes de tocarla.
3. Implementar la Parte B (Product Card única) ya con las imágenes correctas resultantes de la Parte A.
4. Usar Componentry/Motion como banco de inspiración puntual para microinteracciones concretas (hover de la card, transición del combo, etc.), nunca como reemplazo de la disciplina visual que pide evitar "apariencia de IA" — cualquier componente que se traiga de afuera se adapta a la paleta y el radius reales del proyecto, no se deja con su estilo de fábrica.
5. Cerrar con la Parte A punto 32-33 (fases de validación) cubriendo también lo que se tocó de la Parte B.

---

# Restricciones finales (recordatorio, aplican a TODO lo anterior)

* Nunca te agregues como colaborador en GitHub/GitKraken.
* Nunca te menciones a vos mismo en un commit, PR, comentario de código, o cualquier archivo del repo — nada de `Co-Authored-By`, nada de "Generated with Claude Code", nunca, bajo ninguna circunstancia, sin excepción.
* Fuera de esa restricción, tenés permiso total: podés reestructurar lo que haga falta, instalar librerías puntuales justificadas, meterte a cualquier sitio de referencia, y no hace falta pedir permiso para cada paso — pero si algo puede romper autenticación, carrito, pedidos o el backend en general, analizalo primero.
