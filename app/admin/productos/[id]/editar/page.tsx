import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProductForm from "@/components/catalog/ProductForm";
import { updateProduct } from "@/actions/products";
import Link from "next/link";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarProductoPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [productResult, categoriesResult] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("categories").select("*").order("name"),
  ]);

  if (productResult.error || !productResult.data) {
    notFound();
  }

  // Bind the productId to the updateProduct action
  const updateAction = updateProduct.bind(null, id);

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
          Editar Producto
        </h1>
      </div>

      <ProductForm
        categories={categoriesResult.data || []}
        product={productResult.data}
        action={updateAction}
        submitLabel="Guardar Cambios"
      />
    </div>
  );
}
