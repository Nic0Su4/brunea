import { z } from "zod";

/* ============================================
   Category Schemas
   ============================================ */

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar 100 caracteres")
    .trim(),
  slug: z
    .string()
    .min(2, "El slug debe tener al menos 2 caracteres")
    .max(100, "El slug no puede superar 100 caracteres")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "El slug solo puede contener letras minúsculas, números y guiones"
    )
    .trim(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

/* ============================================
   Product Schemas
   ============================================ */

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(200, "El nombre no puede superar 200 caracteres")
    .trim(),
  description: z
    .string()
    .max(1000, "La descripción no puede superar 1000 caracteres")
    .trim()
    .optional()
    .or(z.literal("")),
  price: z
    .number()
    .positive("El precio debe ser mayor a 0")
    .max(99999999.99, "El precio es demasiado alto"),
  category_id: z.string().uuid("Selecciona una categoría válida"),
  image_url: z
    .string()
    .url("La URL de imagen no es válida")
    .min(1, "La imagen es obligatoria"),
  is_active: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchema>;

/**
 * Schema for parsing price from form input (string → number conversion).
 */
export const priceFromStringSchema = z
  .string()
  .min(1, "El precio es obligatorio")
  .transform((val) => parseFloat(val))
  .refine((val) => !isNaN(val) && val > 0, "El precio debe ser mayor a 0");
