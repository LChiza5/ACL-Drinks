"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash as EyeOff, UserPlus, Gift } from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "@/validations/auth";
import { Logo } from "@/components/layout/Logo";
import { PizoteMascot } from "@/components/ui/pizote-mascot";

export default function RegisterPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });
  const passwordReg = register("password");
  const confirmPasswordReg = register("confirmPassword");
  const passwordValue = watch("password");
  const covering = passwordFocused && !!passwordValue;

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/users/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await res.json();
      if (!result.success) { toast.error(result.error); return; }
      toast.success("¡Cuenta creada! ₡1.000 de bienvenida");
      await signIn("credentials", { email: data.email, password: data.password, redirect: false });
      router.push("/");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "radial-gradient(ellipse at top, #2A1F14 0%, #12110F 70%)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <Logo className="h-14 w-14" />
            <span className="text-3xl font-black gradient-text">ACL Drinks</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4" style={{ color: "#F5F2EC" }}>Crear Cuenta</h1>
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-neon-amber/10 border border-neon-amber/30 text-sm text-neon-amber">
            <Gift className="h-4 w-4" />¡₡1.000 de bienvenida gratis!
          </div>
        </div>
        <PizoteMascot covering={covering} peeking={showPass} className="h-32 w-32 mx-auto mb-3" />
        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2"><Label>Nombre completo</Label><Input placeholder="Tu nombre" {...register("name")} />{errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}</div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="tu@email.com" {...register("email")} />{errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}</div>
            <div className="space-y-2"><Label>Teléfono (opcional)</Label><Input type="tel" placeholder="+506 8888-8888" {...register("phone")} /></div>
            <div className="space-y-2">
              <Label>Contraseña</Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Mín. 8 caracteres"
                  {...passwordReg}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={(e) => { passwordReg.onBlur(e); setPasswordFocused(false); }}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Confirmar contraseña</Label>
              <Input
                type="password"
                placeholder="Repite la contraseña"
                {...confirmPasswordReg}
              />
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full btn-neon gap-2 font-bold" size="lg" disabled={isLoading}>
              <UserPlus className="h-4 w-4" />{isLoading ? "Creando cuenta..." : "Crear Cuenta Gratis"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">¿Ya tienes cuenta? <Link href="/login" className="text-neon-purple hover:underline font-medium">Inicia sesión</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
