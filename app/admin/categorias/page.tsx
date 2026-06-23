import { createClient } from "@/utils/supabase/server";
import CategoryList from "./CategoryList";
import CreateCategoryForm from "./CreateCategoryForm";

export default async function CategoriasPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal mb-6">
        Categorías
      </h1>

      {/* Create Category */}
      <div className="bg-white rounded-2xl p-5 border border-beige-dark mb-6">
        <h2 className="text-sm font-semibold text-charcoal mb-4">
          Nueva Categoría
        </h2>
        <CreateCategoryForm />
      </div>

      {/* Categories List */}
      {error && (
        <div className="p-4 rounded-xl bg-error/10 border border-error/20">
          <p className="text-sm text-error">Error al cargar categorías.</p>
        </div>
      )}

      {categories && categories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-beige-dark">
          <p className="text-charcoal-light text-sm">
            Aún no hay categorías. Crea la primera arriba.
          </p>
        </div>
      )}

      {categories && categories.length > 0 && (
        <CategoryList categories={categories} />
      )}
    </div>
  );
}
