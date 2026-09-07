# Imágenes del catálogo

Cómo funciona el sistema de imágenes de ACL Drinks, de dónde salió cada foto que
está hoy en producción, y qué fotos falta tomar.

## Regla de oro

**Una imagen nunca puede mostrar un producto distinto al que se está vendiendo.**

Si no hay foto verificable del producto real, el slot se deja vacío (`images: []`
en `Product`, `image: null` en `Kit`) y la tarjeta muestra un placeholder
tipográfico con la marca y la presentación. Es preferible a mostrar otra botella.

## Dónde viven las imágenes

| Tipo | Ubicación | Por qué |
| --- | --- | --- |
| Fotos de producto | `public/catalog/products/*.webp` | Self-hosted. No caducan, `next/image` las optimiza y no hacen falta `remotePatterns` ni excepciones de CSP. |
| Fotos de ambiente | `public/catalog/scenes/*.webp` | Igual que arriba. |
| Subidas desde el dashboard | Cloudinary | Ya soportado por `src/lib/cloudinary.ts` y `/api/upload`. Requiere credenciales reales en `.env` (hoy están los valores de ejemplo). |

Las URLs externas de Unsplash que había antes **caducaron dos veces**. Dos de
ellas ya devolvían 404 al momento de esta auditoría, así que las categorías de
Vodka y Tequila estaban mostrando imágenes rotas en producción. Por eso todo lo
del catálogo pasó a ser self-hosted.

## Fotos que se corrigieron

Cada una fue abierta y verificada leyendo la etiqueta antes de asignarla.

| Producto | Mostraba antes | Muestra ahora |
| --- | --- | --- |
| Johnnie Walker Red Label | Una botella de **Black Label** | Botella + estuche de Red Label |
| Johnnie Walker Black Label | Una botella de **Jack Daniel's Tennessee Honey** | Botella + estuche de Black Label 12 años |
| Absolut Vodka Original | Una botella de **Hendrick's Gin** | Botella de Absolut Vodka, 40% |
| Cacique Ron Extra Añejo | Un cóctel con un hongo shiitake | Botella de Ron Añejo Cacique |
| Jose Cuervo Tequila Especial | Imagen rota (404) | Botella de Jose Cuervo Especial |
| Imperial 6-Pack | Un tarro de cerveza servida | Placeholder tipográfico |
| Kit Fiesta | Foto de gente brindando en un bar | Composición de sus productos reales |
| Kit Whisky Lover | La botella de Jack Daniel's | Composición de sus productos reales |

## Fotos que faltan

Estas son las que conviene tomar y subir por el dashboard. Ninguna existe en
bancos de imágenes libres con la marca y la presentación correctas.

| SKU | Producto | Qué foto hace falta | Prioridad |
| --- | --- | --- | --- |
| `IMP-6PK-350` | Imperial 6-Pack | El **six pack completo** de Imperial de Costa Rica, no una botella suelta ni un vaso servido. La Imperial que aparece en bancos libres es la argentina, que es otra marca con el mismo nombre. | Alta |
| `CAC-EXTRA-750` | Cacique Ron Extra Añejo | La foto actual es de **Cacique Añejo**, no de **Extra Añejo**. Marca correcta, expresión distinta. Además es de baja resolución (250×580 de origen). | Media |
| `JC-ESP-750` | Jose Cuervo Tequila Especial | La foto actual es de **Especial Silver**, y la descripción del producto dice "tequila dorado reposado". Hay que decidir cuál de los dos se vende y alinear foto y texto. | Media |
| — | Categoría Cervezas | Es la única categoría que todavía apunta a una URL externa de Unsplash. Conviene reemplazarla por una foto propia. | Baja |

## Cómo tomar las fotos

Para que el catálogo se vea parejo:

- Fondo liso y claro, o liso y oscuro. Siempre el mismo para todos los productos.
- Botella completa en el encuadre, vertical, sin cortar el cuello ni la base.
- Etiqueta legible y de frente.
- Formato vertical 4:5, que es el que usa la tarjeta.
- Sin manos, sin gente, sin vasos servidos al lado.

Subirlas por el dashboard (`/dashboard/products`) una vez que Cloudinary tenga
credenciales reales, o dejarlas en `public/catalog/products/` con el slug del
producto como nombre.

## Créditos

Las fotos de producto vienen de Wikimedia Commons bajo licencias libres que
permiten uso comercial con atribución.

| Archivo | Autor | Licencia |
| --- | --- | --- |
| `johnnie-walker-red-label.webp` | kallerna | CC BY-SA 3.0 |
| `johnnie-walker-black-label.webp` | Iceman7840 | CC BY-SA 3.0 |
| `absolut-vodka-original.webp` | Indrajit Das | CC BY-SA 4.0 |
| `cacique-ron-anejo.webp` | Der Kreole | CC BY-SA 4.0 |
| `jose-cuervo-especial.webp` | Unsplash | Unsplash License |
| `guanacaste-atardecer.webp` | Dominio público (Openverse) | CC0 |

Al reemplazarlas por fotos propias, esta tabla se puede borrar.
