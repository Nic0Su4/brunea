"use client";

import { useActionState } from "react";
import { login, type AuthActionState } from "@/actions/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const initialState: AuthActionState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-5">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-charcoal mb-2">
            Brunēa
          </h1>
          <p className="text-sm text-charcoal-light">Panel de Administración</p>
        </div>

        {/* Login Form */}
        <form action={formAction} className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-dark">
            <div className="flex flex-col gap-4">
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="admin@brunea.com"
                required
                autoComplete="email"
              />
              <Input
                label="Contraseña"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {state.error && (
              <div
                className="mt-4 p-3 rounded-xl bg-error/10 border border-error/20"
                role="alert"
              >
                <p className="text-sm text-error">{state.error}</p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={isPending}
            className="w-full"
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
