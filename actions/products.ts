"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { productSchema, priceFromStringSchema } from "@/schemas/product";
import { z } from "zod";

export interface ProductActionState {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
}

/**
 * Server Action: Create a new product.
 * Validates session, sanitizes input with Zod, inserts into DB.
 */
export async function createProduct(
  _prevState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const supabase = await createClient();

  // Verify authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado. Inicia sesión." };
  }

  // Parse and validate
  const priceResult = priceFromStringSchema.safeParse(
    formData.get("price")
  );

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description") || "",
    price: priceResult.success ? priceResult.data : -1,
    category_id: formData.get("category_id"),
    image_url: formData.get("image_url"),
    is_active: formData.get("is_active") === "true",
  };

  const parsed = productSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (field && typeof field === "string") {
        fieldErrors[field] = err.message;
      }
    });

    // Add price error from separate validation
    if (!priceResult.success) {
      fieldErrors["price"] = priceResult.error.issues[0].message;
    }

    return { fieldErrors };
  }

  try {
    const { error } = await supabase.from("products").insert({
      name: parsed.data.name,
      description: parsed.data.description || null,
      price: parsed.data.price,
      category_id: parsed.data.category_id,
      image_url: parsed.data.image_url,
      is_active: parsed.data.is_active,
    });

    if (error) {
      return { error: `Error al crear producto: ${error.message}` };
    }
  } catch {
    return { error: "Error del servidor. Intenta de nuevo." };
  }

  revalidatePath("/");
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

/**
 * Server Action: Update an existing product.
 */
export async function updateProduct(
  productId: string,
  _prevState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado. Inicia sesión." };
  }

  // Validate UUID
  const idResult = z.string().uuid().safeParse(productId);
  if (!idResult.success) {
    return { error: "ID de producto inválido." };
  }

  const priceResult = priceFromStringSchema.safeParse(
    formData.get("price")
  );

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description") || "",
    price: priceResult.success ? priceResult.data : -1,
    category_id: formData.get("category_id"),
    image_url: formData.get("image_url"),
    is_active: formData.get("is_active") === "true",
  };

  const parsed = productSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (field && typeof field === "string") {
        fieldErrors[field] = err.message;
      }
    });
    if (!priceResult.success) {
      fieldErrors["price"] = priceResult.error.issues[0].message;
    }
    return { fieldErrors };
  }

  try {
    const { error } = await supabase
      .from("products")
      .update({
        name: parsed.data.name,
        description: parsed.data.description || null,
        price: parsed.data.price,
        category_id: parsed.data.category_id,
        image_url: parsed.data.image_url,
        is_active: parsed.data.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", productId);

    if (error) {
      return { error: `Error al actualizar producto: ${error.message}` };
    }
  } catch {
    return { error: "Error del servidor. Intenta de nuevo." };
  }

  revalidatePath("/");
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

/**
 * Server Action: Toggle product active status.
 */
export async function toggleProductActive(
  productId: string,
  isActive: boolean
): Promise<ProductActionState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  try {
    const { error } = await supabase
      .from("products")
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", productId);

    if (error) {
      return { error: error.message };
    }
  } catch {
    return { error: "Error del servidor." };
  }

  revalidatePath("/");
  revalidatePath("/admin/productos");
  return { success: true };
}
