"use client";

import { useActionState, useEffect, useRef } from "react";
import { createCategory, type CategoryActionState } from "@/actions/categories";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { generateSlug } from "@/lib/format";
import { useState } from "react";

const initialState: CategoryActionState = {};

export default function CreateCategoryForm() {
  const [state, formAction, isPending] = useActionState(
    createCategory,
    initialState
  );
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(generateSlug(value));
  };

  // Reset form on success
  useEffect(() => {
    if (state.success) {
      setName("");
      setSlug("");
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          name="name"
          placeholder="Ej: Totes"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          error={state.fieldErrors?.name}
          required
        />
        <Input
          label="Slug (URL)"
          name="slug"
          placeholder="ej: totes"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          error={state.fieldErrors?.slug}
          helperText="Se usa en las URLs del catálogo"
          required
        />
      </div>

      {state.error && (
        <div className="p-3 rounded-xl bg-error/10 border border-error/20" role="alert">
          <p className="text-sm text-error">{state.error}</p>
        </div>
      )}

      {state.success && (
        <div className="p-3 rounded-xl bg-olive/10 border border-olive/20" role="status">
          <p className="text-sm text-olive">¡Categoría creada con éxito!</p>
        </div>
      )}

      <div>
        <Button type="submit" isLoading={isPending}>
          Crear Categoría
        </Button>
      </div>
    </form>
  );
}
