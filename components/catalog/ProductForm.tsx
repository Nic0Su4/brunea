"use client";

import { useActionState, useState } from "react";
import Input from "@/components/ui/Input";
import { Textarea, Select } from "@/components/ui/Input";
import ImageUpload from "@/components/ui/ImageUpload";
import Button from "@/components/ui/Button";
import type { Tables } from "@/types/supabase";
import type { ProductActionState } from "@/actions/products";

interface ProductFormProps {
  categories: Tables<"categories">[];
  product?: Tables<"products">;
  action: (
    prevState: ProductActionState,
    formData: FormData
  ) => Promise<ProductActionState>;
  submitLabel: string;
}

export default function ProductForm({
  categories,
  product,
  action,
  submitLabel,
}: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [imageUrl, setImageUrl] = useState(product?.image_url || "");

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-6 border border-beige-dark">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Form Fields */}
          <div className="flex flex-col gap-4">
            <Input
              label="Nombre del producto"
              name="name"
              placeholder="Ej: White Tote Guess"
              defaultValue={product?.name}
              error={state.fieldErrors?.name}
              required
            />

            <Textarea
              label="Descripción (opcional)"
              name="description"
              placeholder="Describe el producto..."
              defaultValue={product?.description || ""}
              error={state.fieldErrors?.description}
            />

            <Input
              label="Precio (S/.)"
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="319"
              defaultValue={product?.price?.toString()}
              error={state.fieldErrors?.price}
              required
            />

            <Select
              label="Categoría"
              name="category_id"
              options={categoryOptions}
              placeholder="Selecciona una categoría"
              defaultValue={product?.category_id || ""}
              error={state.fieldErrors?.category_id}
              required
            />

            {/* Hidden field for is_active */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-charcoal">
                Estado
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_active_checkbox"
                  defaultChecked={product?.is_active ?? true}
                  className="sr-only peer"
                  onChange={(e) => {
                    const hidden = e.target.form?.querySelector(
                      'input[name="is_active"]'
                    ) as HTMLInputElement;
                    if (hidden) hidden.value = e.target.checked.toString();
                  }}
                />
                <div className="relative w-9 h-5 rounded-full bg-sand peer-checked:bg-olive transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-olive/30 peer-checked:[&>div]:translate-x-4">
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform" />
                </div>
                <span className="text-sm text-charcoal-light">
                  Visible en catálogo
                </span>
              </label>
            </div>
            <input
              type="hidden"
              name="is_active"
              defaultValue={(product?.is_active ?? true).toString()}
            />
          </div>

          {/* Right: Image Upload */}
          <div>
            <ImageUpload
              currentImageUrl={product?.image_url}
              onUploadComplete={(url) => setImageUrl(url)}
              error={state.fieldErrors?.image_url}
            />
            <input type="hidden" name="image_url" value={imageUrl} />
          </div>
        </div>
      </div>

      {/* Global Error */}
      {state.error && (
        <div
          className="p-4 rounded-xl bg-error/10 border border-error/20"
          role="alert"
        >
          <p className="text-sm text-error">{state.error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" isLoading={isPending}>
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => window.history.back()}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
