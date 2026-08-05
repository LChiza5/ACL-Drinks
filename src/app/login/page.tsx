"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/validations/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "radial-gradient(ellipse at top, #1a0a2e 0%, #08060f 70%)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-black gradient-text">🍾 BrandName</Link>
          <h1 className="text-2xl font-bold text-white mt-4">Iniciar Sesión</h1>
          <p className="text-muted-foreground mt-1">¡Bienvenido de vuelta!</p>
        </div>
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
                <Input type={showPass ? "text" : "password"} placeholder="••••••••" {...register("password")} className="pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors">
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
            <p className="text-xs text-muted-foreground">Debes ser mayor de 18 años. 🔞</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
