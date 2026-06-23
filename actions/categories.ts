"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { categorySchema } from "@/schemas/product";

export interface CategoryActionState {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
}

/**
 * Server Action: Create a new category.
 */
export async function createCategory(
  _prevState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado. Inicia sesión." };
  }

  const rawData = {
    name: formData.get("name"),
    slug: formData.get("slug"),
  };

  const parsed = categorySchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (field && typeof field === "string") {
        fieldErrors[field] = err.message;
      }
    });
    return { fieldErrors };
  }

  try {
    const { error } = await supabase.from("categories").insert({
      name: parsed.data.name,
      slug: parsed.data.slug,
    });

    if (error) {
      if (error.code === "23505") {
        return {
          fieldErrors: { slug: "Este slug ya está en uso. Elige otro." },
        };
      }
      return { error: `Error al crear categoría: ${error.message}` };
    }
  } catch {
    return { error: "Error del servidor. Intenta de nuevo." };
  }

  revalidatePath("/admin/categorias");
  revalidatePath("/admin/productos");
  return { success: true };
}

/**
 * Server Action: Update an existing category.
 */
export async function updateCategory(
  categoryId: string,
  _prevState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado. Inicia sesión." };
  }

  const rawData = {
    name: formData.get("name"),
    slug: formData.get("slug"),
  };

  const parsed = categorySchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (field && typeof field === "string") {
        fieldErrors[field] = err.message;
      }
    });
    return { fieldErrors };
  }

  try {
    const { error } = await supabase
      .from("categories")
      .update({
        name: parsed.data.name,
        slug: parsed.data.slug,
      })
      .eq("id", categoryId);

    if (error) {
      if (error.code === "23505") {
        return {
          fieldErrors: { slug: "Este slug ya está en uso. Elige otro." },
        };
      }
      return { error: `Error al actualizar categoría: ${error.message}` };
    }
  } catch {
    return { error: "Error del servidor. Intenta de nuevo." };
  }

  revalidatePath("/admin/categorias");
  revalidatePath("/admin/productos");
  return { success: true };
}

/**
 * Server Action: Delete a category.
 * Will fail if products are still assigned (ON DELETE RESTRICT).
 */
export async function deleteCategory(
  categoryId: string
): Promise<CategoryActionState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  try {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

    if (error) {
      if (error.code === "23503") {
        return {
          error:
            "No se puede eliminar esta categoría porque tiene productos asignados.",
        };
      }
      return { error: `Error al eliminar: ${error.message}` };
    }
  } catch {
    return { error: "Error del servidor." };
  }

  revalidatePath("/admin/categorias");
  return { success: true };
}
