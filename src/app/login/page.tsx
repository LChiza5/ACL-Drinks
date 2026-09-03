"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/validations/auth";
import { Logo } from "@/components/layout/Logo";
import { PizoteMascot } from "@/components/ui/pizote-mascot";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
  const passwordReg = register("password");
  const passwordValue = watch("password");
  const covering = passwordFocused && !!passwordValue;

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", { ...data, redirect: false });
      if (result?.error) {
        toast.error("Email o contraseña incorrectos");
      } else {
        toast.success("¡Bienvenido de vuelta! 🎉");
        router.push(from === "dashboard" ? "/dashboard" : "/");
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "radial-gradient(ellipse at top, #2A1F14 0%, #12110F 70%)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <Logo className="h-10 w-10" />
            <span className="text-3xl font-black gradient-text">ACL Drinks</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4" style={{ color: "#F5F2EC" }}>Iniciar Sesión</h1>
          <p className="mt-1" style={{ color: "#B8B1A7" }}>¡Bienvenido de vuelta!</p>
        </div>
        <PizoteMascot covering={covering} peeking={showPass} className="h-20 w-20 mx-auto mb-2" />
        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="tu@email.com" {...register("email")} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Contraseña</Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
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
            <Button type="submit" className="w-full btn-neon gap-2 font-bold" size="lg" disabled={isLoading}>
              <LogIn className="h-4 w-4" />{isLoading ? "Ingresando..." : "Iniciar Sesión"}
            </Button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              ¿No tienes cuenta? <Link href="/register" className="text-neon-purple hover:underline font-medium">Regístrate gratis</Link>
            </p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" />Debes ser mayor de 18 años.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
