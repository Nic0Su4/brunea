import { createClient } from "@/utils/supabase/server";
import ProductForm from "@/components/catalog/ProductForm";
import { createProduct } from "@/actions/products";
import Link from "next/link";

export default async function NuevoProductoPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/productos"
          className="p-2 rounded-lg hover:bg-beige-dark transition-colors text-charcoal-light"
          aria-label="Volver a productos"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <h1 className="font-display text-2xl font-bold text-charcoal">
          Nuevo Producto
        </h1>
      </div>

      <ProductForm
        categories={categories || []}
        action={createProduct}
        submitLabel="Crear Producto"
      />
    </div>
  );
}
