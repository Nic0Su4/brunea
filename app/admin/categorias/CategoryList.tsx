"use client";

import { useState } from "react";
import { deleteCategory } from "@/actions/categories";
import type { Tables } from "@/types/supabase";

interface CategoryListProps {
  categories: Tables<"categories">[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;

    setDeletingId(id);
    setError(null);

    const result = await deleteCategory(id);

    if (result.error) {
      setError(result.error);
    }

    setDeletingId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-beige-dark overflow-hidden">
      {error && (
        <div className="p-4 border-b border-beige-dark bg-error/5">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-beige-dark bg-beige/50">
            <th className="text-left py-3 px-4 font-medium text-charcoal-light">
              Nombre
            </th>
            <th className="text-left py-3 px-4 font-medium text-charcoal-light">
              Slug
            </th>
            <th className="text-right py-3 px-4 font-medium text-charcoal-light">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b border-beige last:border-0 hover:bg-beige/30 transition-colors"
            >
              <td className="py-3 px-4 font-medium text-charcoal">
                {category.name}
              </td>
              <td className="py-3 px-4 text-charcoal-light font-mono text-xs">
                {category.slug}
              </td>
              <td className="py-3 px-4 text-right">
                <button
                  onClick={() => handleDelete(category.id)}
                  disabled={deletingId === category.id}
                  className={`text-error/70 hover:text-error font-medium transition-colors cursor-pointer ${
                    deletingId === category.id ? "opacity-50" : ""
                  }`}
                >
                  {deletingId === category.id ? "Eliminando..." : "Eliminar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
