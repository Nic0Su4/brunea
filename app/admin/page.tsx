import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [productsResult, categoriesResult] = await Promise.all([
    supabase.from("products").select("id, is_active", { count: "exact" }),
    supabase.from("categories").select("id", { count: "exact" }),
  ]);

  const totalProducts = productsResult.count ?? 0;
  const activeProducts =
    productsResult.data?.filter((p) => p.is_active).length ?? 0;
  const totalCategories = categoriesResult.count ?? 0;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal mb-6">
        Panel de Administración
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-beige-dark">
          <p className="text-sm text-charcoal-light mb-1">Productos totales</p>
          <p className="text-3xl font-bold text-charcoal">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-beige-dark">
          <p className="text-sm text-charcoal-light mb-1">Productos activos</p>
          <p className="text-3xl font-bold text-olive">{activeProducts}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-beige-dark">
          <p className="text-sm text-charcoal-light mb-1">Categorías</p>
          <p className="text-3xl font-bold text-charcoal">{totalCategories}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-olive text-white font-medium text-sm hover:bg-olive-dark transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nuevo Producto
        </Link>
        <Link
          href="/admin/categorias"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-charcoal font-medium text-sm border border-sand hover:bg-beige transition-colors"
        >
          Gestionar Categorías
        </Link>
      </div>
    </div>
  );
}
