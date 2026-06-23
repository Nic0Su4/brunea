import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import ToggleActiveButton from "./ToggleActiveButton";

export default async function ProductosPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-charcoal">
          Productos
        </h1>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-olive text-white text-sm font-medium hover:bg-olive-dark transition-colors"
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
          Nuevo
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-error/10 border border-error/20 mb-4">
          <p className="text-sm text-error">Error al cargar productos.</p>
        </div>
      )}

      {products && products.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-beige-dark">
          <p className="text-charcoal-light mb-4">
            Aún no hay productos. ¡Crea el primero!
          </p>
          <Link
            href="/admin/productos/nuevo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-olive text-white text-sm font-medium hover:bg-olive-dark transition-colors"
          >
            Crear Producto
          </Link>
        </div>
      )}

      {products && products.length > 0 && (
        <div className="bg-white rounded-2xl border border-beige-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-beige-dark bg-beige/50">
                  <th className="text-left py-3 px-4 font-medium text-charcoal-light">
                    Producto
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-charcoal-light hidden sm:table-cell">
                    Categoría
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-charcoal-light">
                    Precio
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-charcoal-light">
                    Estado
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-charcoal-light">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-beige last:border-0 hover:bg-beige/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-beige shrink-0">
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <span className="font-medium text-charcoal truncate max-w-50">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-charcoal-light hidden sm:table-cell">
                      {product.categories?.name || "—"}
                    </td>
                    <td className="py-3 px-4 font-medium text-charcoal">
                      {formatPrice(product.price)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <ToggleActiveButton
                        productId={product.id}
                        isActive={product.is_active ?? true}
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/productos/${product.id}/editar`}
                        className="text-olive hover:text-olive-dark font-medium transition-colors"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
