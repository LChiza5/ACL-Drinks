# Rediseño visual/UX — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dar identidad propia al sitio (mascota Pisote animada en login/register, profundidad de movimiento en Hero/Beneficios, limpieza de tokens muertos) conservando la paleta ámbar existente.

**Architecture:** Componentes nuevos autocontenidos (SVG + framer-motion, sin deps nuevas) que se enganchan a patrones ya existentes en el código (react-hook-form `watch`, `whileInView`, `glass-card`).

**Tech Stack:** Next.js 15 (App Router), React 19, framer-motion 11, Tailwind, react-hook-form + Zod.

**Nota sobre verificación:** este repo no tiene ningún framework de tests configurado (confirmado: cero `jest`/`vitest`/`@testing-library`/`playwright` en `package.json`, cero carpeta `__tests__`). Introducir uno desde cero solo para este trabajo visual sería alcance no pedido y, para animación/motion, no aporta mucho sobre verificación visual real. Cada tarea se verifica con: (a) `npx tsc --noEmit` (el proyecto es TS estricto), y (b) interacción real en el navegador vía el preview ya corriendo en `localhost:3000` (screenshot / read_console_messages / click real en los campos). Esto reemplaza los pasos "escribir test que falla / verificar que pasa" del formato estándar de esta skill.

**Spec:** `docs/superpowers/specs/2026-08-30-visual-redesign-design.md`

---

### Task 1: Mascota Pisote — componente

**Files:**
- Create: `src/components/ui/pisote-mascot.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
"use client";

import { motion } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 320, damping: 22 };

const INK = {
  bodyLight: "#D4A855",
  body: "#C9984A",
  bodyDark: "#A67C52",
  snout: "#B8916A",
  nose: "#3A2A1C",
  eye: "#20160D",
  tail: "#8B6239",
};

interface PisoteMascotProps {
  /** true = cubrirse los ojos con las patas (campo de contraseña enfocado y con contenido) */
  covering: boolean;
  /** true = entreabrir un ojo (el usuario activó "mostrar contraseña") */
  peeking?: boolean;
  className?: string;
}

export function PisoteMascot({ covering, peeking = false, className = "" }: PisoteMascotProps) {
  const leftPaw = covering ? { x: 0, y: 0, rotate: -14 } : { x: -6, y: 32, rotate: -10 };
  const rightPaw = covering ? { x: 0, y: 0, rotate: 14 } : { x: 6, y: 32, rotate: 10 };

  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      {/* cola anillada */}
      <path d="M116 130 Q 152 122 148 82 Q 146 48 118 36" stroke={INK.tail} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M116 130 Q 152 122 148 82 Q 146 48 118 36" stroke={INK.bodyLight} strokeWidth="18" strokeDasharray="10 14" fill="none" strokeLinecap="round" opacity="0.55" />

      {/* cuerpo */}
      <ellipse cx="80" cy="118" rx="40" ry="32" fill={INK.body} />

      {/* orejas */}
      <circle cx="55" cy="33" r="10" fill={INK.bodyDark} />
      <circle cx="105" cy="33" r="10" fill={INK.bodyDark} />

      {/* cabeza (respiración sutil) */}
      <motion.circle
        cx="80" cy="62" r="36"
        fill={INK.bodyLight}
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "80px 62px" }}
      />

      {/* hocico */}
      <ellipse cx="80" cy="82" rx="14" ry="11" fill={INK.snout} />
      <circle cx="80" cy="89" r="5" fill={INK.nose} />

      {/* ojos (las patas se posan encima al cubrir) */}
      <circle cx="66" cy="55" r="5" fill={INK.eye} />
      <circle cx="94" cy="55" r="5" fill={INK.eye} />

      {/* patas */}
      <motion.ellipse
        cx="66" cy="55" rx="13" ry="16"
        fill={INK.bodyLight}
        stroke={INK.bodyDark}
        strokeWidth="1.5"
        animate={{ x: leftPaw.x, y: leftPaw.y, rotate: leftPaw.rotate, opacity: covering && peeking ? 0.35 : 1 }}
        transition={spring}
        style={{ transformOrigin: "66px 55px" }}
      />
      <motion.ellipse
        cx="94" cy="55" rx="13" ry="16"
        fill={INK.bodyLight}
        stroke={INK.bodyDark}
        strokeWidth="1.5"
        animate={{ x: rightPaw.x, y: rightPaw.y, rotate: rightPaw.rotate }}
        transition={spring}
        style={{ transformOrigin: "94px 55px" }}
      />
    </svg>
  );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores nuevos relacionados a `pisote-mascot.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/pisote-mascot.tsx
git commit -m "Componente mascota Pisote (SVG + framer-motion, autocontenido)"
```

---

### Task 2: Pisote en Login

**Files:**
- Modify: `src/app/login/page.tsx`

- [ ] **Step 1: Import + estado de foco + cálculo de `covering`**

En `LoginForm`, reemplazar:

```tsx
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
```

por:

```tsx
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
  const [passwordFocused, setPasswordFocused] = useState(false);
  const passwordValue = watch("password");
  const covering = passwordFocused && !!passwordValue;
  const passwordReg = register("password");
```

Y agregar el import al inicio del archivo:

```tsx
import { PisoteMascot } from "@/components/ui/pisote-mascot";
```

- [ ] **Step 2: Renderizar la mascota y enganchar el campo**

Reemplazar el bloque del título:

```tsx
          <h1 className="text-2xl font-bold mt-4" style={{ color: "#F5F2EC" }}>Iniciar Sesión</h1>
          <p className="mt-1" style={{ color: "#B8B1A7" }}>¡Bienvenido de vuelta!</p>
        </div>
```

por:

```tsx
          <h1 className="text-2xl font-bold mt-4" style={{ color: "#F5F2EC" }}>Iniciar Sesión</h1>
          <p className="mt-1" style={{ color: "#B8B1A7" }}>¡Bienvenido de vuelta!</p>
        </div>
        <PisoteMascot covering={covering} peeking={showPass} className="h-20 w-20 mx-auto mb-2" />
```

Reemplazar el campo de contraseña:

```tsx
                <Input type={showPass ? "text" : "password"} placeholder="••••••••" {...register("password")} className="pr-10" />
```

por:

```tsx
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  {...passwordReg}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={(e) => { passwordReg.onBlur(e); setPasswordFocused(false); }}
                  className="pr-10"
                />
```

Y agregar el import de `useState` (ya existe `useState` importado desde `"react"` junto con `Suspense` — solo hay que confirmar que siga ahí, no duplicar el import).

- [ ] **Step 3: Verificar en navegador**

1. `navigate` a `http://localhost:3000/login`.
2. `read_page` para confirmar que el SVG de la mascota está en el DOM.
3. `computer` click en el input de contraseña, `type` un carácter → `screenshot` y confirmar que las patas suben.
4. `computer` click fuera del input (blur) → `screenshot` y confirmar que las patas bajan.
5. `computer` click en el ícono del ojo (mostrar contraseña) mientras el campo tiene foco y contenido → confirmar que la pata izquierda baja opacidad (efecto "entreabrir").
6. `read_console_messages` con `onlyErrors: true` → confirmar que no hay errores nuevos.

- [ ] **Step 4: Commit**

```bash
git add src/app/login/page.tsx
git commit -m "Mascota Pisote en el login: tapa los ojos al escribir la contraseña"
```

---

### Task 3: Pisote en Registro

**Files:**
- Modify: `src/app/register/page.tsx`

- [ ] **Step 1: Import + estado de foco (password y confirmPassword) + `covering`**

Reemplazar:

```tsx
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });
```

por:

```tsx
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });
  const [pwFocused, setPwFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const pwValue = watch("password");
  const confirmValue = watch("confirmPassword");
  const covering = (pwFocused && !!pwValue) || (confirmFocused && !!confirmValue);
  const passwordReg = register("password");
  const confirmPasswordReg = register("confirmPassword");
```

Agregar import:

```tsx
import { PisoteMascot } from "@/components/ui/pisote-mascot";
```

- [ ] **Step 2: Renderizar la mascota**

Reemplazar:

```tsx
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-neon-amber/10 border border-neon-amber/30 text-sm text-neon-amber">
            <Gift className="h-4 w-4" />¡₡1.000 de bienvenida gratis!
          </div>
        </div>
```

por:

```tsx
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-neon-amber/10 border border-neon-amber/30 text-sm text-neon-amber">
            <Gift className="h-4 w-4" />¡₡1.000 de bienvenida gratis!
          </div>
        </div>
        <PisoteMascot covering={covering} peeking={showPass} className="h-20 w-20 mx-auto mb-2" />
```

- [ ] **Step 3: Enganchar ambos campos**

Reemplazar:

```tsx
                <Input type={showPass ? "text" : "password"} placeholder="Mín. 8 caracteres" {...register("password")} className="pr-10" />
```

por:

```tsx
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Mín. 8 caracteres"
                  {...passwordReg}
                  onFocus={() => setPwFocused(true)}
                  onBlur={(e) => { passwordReg.onBlur(e); setPwFocused(false); }}
                  className="pr-10"
                />
```

Reemplazar:

```tsx
            <div className="space-y-2"><Label>Confirmar contraseña</Label><Input type="password" placeholder="Repite la contraseña" {...register("confirmPassword")} />{errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}</div>
```

por:

```tsx
            <div className="space-y-2">
              <Label>Confirmar contraseña</Label>
              <Input
                type="password"
                placeholder="Repite la contraseña"
                {...confirmPasswordReg}
                onFocus={() => setConfirmFocused(true)}
                onBlur={(e) => { confirmPasswordReg.onBlur(e); setConfirmFocused(false); }}
              />
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
            </div>
```

- [ ] **Step 4: Verificar en navegador**

Mismo flujo que Task 2 pero en `/register`, probando también el campo "Confirmar contraseña" (sin el toggle de mostrar, ya que ese campo nunca tuvo uno).

- [ ] **Step 5: Commit + push**

```bash
git add src/app/register/page.tsx
git commit -m "Mascota Pisote en registro: cubre ojos en password y confirmar password"
git push origin main
```

---

### Task 4: Profundidad en Hero + ritmo en Beneficios

**Files:**
- Create: `src/components/hero/HeroDepthLayer.tsx`
- Modify: `src/components/hero/Hero.tsx`
- Modify: `src/components/hero/BenefitsSection.tsx`

- [ ] **Step 1: Crear la capa de profundidad**

```tsx
"use client";

import { motion } from "framer-motion";

const dots = [
  { top: "18%", left: "12%", size: 10, delay: 0 },
  { top: "30%", left: "82%", size: 14, delay: 0.6 },
  { top: "62%", left: "8%", size: 8, delay: 1.1 },
  { top: "72%", left: "88%", size: 12, delay: 0.3 },
  { top: "12%", left: "48%", size: 6, delay: 1.6 },
  { top: "85%", left: "45%", size: 9, delay: 0.9 },
];

export function HeroDepthLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-[2px]"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            background: "radial-gradient(circle, rgba(201,152,74,0.5) 0%, rgba(201,152,74,0) 70%)",
          }}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Engancharla en el Hero + convertir transitions a spring**

Agregar import en `Hero.tsx`:

```tsx
import { HeroDepthLayer } from "@/components/hero/HeroDepthLayer";
```

Reemplazar:

```tsx
      <Aurora colorStops={["#8B6239", "#C9984A", "#A67C52"]} amplitude={0.8} blend={0.45} className="opacity-60" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
```

por:

```tsx
      <Aurora colorStops={["#8B6239", "#C9984A", "#A67C52"]} amplitude={0.8} blend={0.45} className="opacity-60" />
      <HeroDepthLayer />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
```

Y reemplazar los 5 `transition={{ duration: ..., delay: ... }}` de los `motion.div`/`motion.h1`/`motion.p` (líneas del eyebrow pill, h1, p, CTA row y stats grid) por su equivalente spring, por ejemplo:

```tsx
            transition={{ duration: 0.5 }}
```
→
```tsx
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
```

```tsx
            transition={{ duration: 0.6, delay: 0.1 }}
```
→
```tsx
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.1 }}
```

(mismo patrón para `delay: 0.2`, `delay: 0.3`, `delay: 0.4`; y para el stats grid, que usa `transition={{ delay: 0.5 + i * 0.1 }}` → `transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.5 + i * 0.1 }}`).

- [ ] **Step 3: Fondo distinto + spring en Beneficios**

Reemplazar la apertura de la sección:

```tsx
    <section className="section-padding" style={{ background: "#12110F" }}>
      <div className="container-max">
```

por:

```tsx
    <section className="section-padding relative overflow-hidden" style={{ background: "#12110F" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(166,124,82,0.06)" }} />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(201,152,74,0.05)" }} />
      </div>
      <div className="container-max relative z-10">
```

Y cambiar `transition={{ delay: i * 0.08 }}` (en el `.map` de benefits) por `transition={{ type: "spring", stiffness: 140, damping: 15, delay: i * 0.08 }}`.

- [ ] **Step 4: Verificar en navegador**

1. `navigate` a `http://localhost:3000/`.
2. `screenshot` del Hero → confirmar que los puntitos ámbar flotantes se ven (sutiles, sin competir con Aurora).
3. `scroll_to`/scroll hasta Beneficios → `screenshot` → confirmar los dos blobs difuminados en las esquinas.
4. `read_console_messages` con `onlyErrors: true`.
5. `preview_logs` → confirmar `Compiled` sin errores.

- [ ] **Step 5: Commit + push**

```bash
git add src/components/hero/HeroDepthLayer.tsx src/components/hero/Hero.tsx src/components/hero/BenefitsSection.tsx
git commit -m "Profundidad en Hero (capa de puntos) + ritmo visual en Beneficios + reveals con spring"
git push origin main
```

---

### Task 5: Limpieza de tokens muertos

**Files:**
- Modify: `tailwind.config.ts`

Confirmado por grep en `src/` (2026-08-30): `shadow-neon-purple`, `shadow-neon-pink` y los colores `neon.*` SÍ están en uso activo (ya con valores ámbar correctos) — no tocar. `boxShadow.neon-blue`, el `keyframes`/`animation` de `neon-pulse`, y todo el bloque `backgroundImage` (`neon-gradient`, `dark-gradient`, `card-gradient`, `hero-gradient`, `amber-gradient`, `pink-gradient`, `purple-gradient`) no tienen ni un solo uso — son restos de un tema morado/rosa/azul pre-rebrand con hex sin recolorear.

- [ ] **Step 1: Eliminar el keyframe/animation `neon-pulse`**

En `keyframes`, eliminar:

```tsx
        "neon-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 5px #a855f7, 0 0 20px #a855f7, 0 0 40px #a855f7",
          },
          "50%": {
            boxShadow:
              "0 0 10px #ec4899, 0 0 30px #ec4899, 0 0 60px #ec4899",
          },
        },
```

En `animation`, eliminar:

```tsx
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
```

- [ ] **Step 2: Eliminar el bloque `backgroundImage`**

Eliminar completo (7 entradas, ninguna en uso):

```tsx
      backgroundImage: {
        "neon-gradient":
          "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)",
        "dark-gradient":
          "linear-gradient(135deg, #08060f 0%, #1a0a2e 50%, #08060f 100%)",
        "card-gradient": "linear-gradient(145deg, #1a0a2e 0%, #0f0a1e 100%)",
        "hero-gradient":
          "radial-gradient(ellipse at top, #1a0a2e 0%, #08060f 70%)",
        "amber-gradient": "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        "pink-gradient": "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
        "purple-gradient":
          "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
      },
```

- [ ] **Step 3: Eliminar solo `neon-blue` de `boxShadow`**

Dejar `neon-purple`, `neon-pink`, `neon-amber`, `card-hover`, `card-glow` intactos (en uso o al menos ya en valores de marca). Eliminar únicamente:

```tsx
        "neon-blue":
          "0 0 20px rgba(212, 161, 57, 0.4), 0 0 40px rgba(212, 161, 57, 0.2)",
```

- [ ] **Step 4: Verificar**

Run: `npx tsc --noEmit` (el archivo es `.ts`, confirma que sigue siendo un `Config` válido).
Luego recargar `http://localhost:3000` en el navegador y `read_console_messages` con `onlyErrors: true` — confirmar que ninguna clase Tailwind quedó rota (no debería, ya que se confirmó por grep que nada las usaba).

- [ ] **Step 5: Commit + push**

```bash
git add tailwind.config.ts
git commit -m "Limpiar tokens neon sin uso (pre-rebrand) en tailwind.config"
git push origin main
```

---

## Self-Review

**Cobertura del spec:** Identidad de marca → ya implementado antes de este plan (commits `56cc1e6`/`a408d75`). Mascota Pisote → Tasks 1-3. Profundidad/ritmo Hero+Beneficios → Task 4. Limpieza → Task 5. Auditoría de TiltCard/SpotlightCard/GlareHover del spec original: se verificó por lectura directa de `BenefitsSection.tsx` (ya usa `TiltCard`+`SpotlightCard` correctamente) y por el reporte de exploración previo (ProductCard/KitCard ya las usan) — no generó una tarea propia porque no hay nada que corregir.

**Placeholders:** ninguno — cada step tiene el código completo a aplicar.

**Consistencia de tipos:** `PisoteMascotProps` (`covering`, `peeking?`, `className?`) se usa idéntico en Tasks 2 y 3. `HeroDepthLayer` no recibe props, coincide entre Step 1 y Step 2 de Task 4.
