"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido").trim(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export interface AuthActionState {
  error?: string;
  success?: boolean;
}

export async function login(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0].message,
    };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return {
        error: "Credenciales incorrectas. Verifica tu email y contraseña.",
      };
    }
  } catch {
    return {
      error: "Error del servidor. Intenta de nuevo.",
    };
  }

  redirect("/admin");
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
