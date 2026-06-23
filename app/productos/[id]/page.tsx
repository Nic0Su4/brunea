import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { formatPrice } from "@/lib/format";
import { generateWhatsAppLink } from "@/lib/whatsapp";

interface RouteProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata for SEO dynamically.
 */
export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("id", resolvedParams.id)
    .single();

  if (!product) {
    return {
      title: "Producto no encontrado | Brunēa",
    };
  }

  return {
    title: `${product.name} | Brunēa Trujillo`,
    description:
      product.description ||
      `Adquiere ${product.name} en el catálogo digital de Brunēa Trujillo.`,
  };
}

/**
 * Product detail page layout.
 * Renders instantly to avoid client-side navigation delay.
 */
export default async function ProductDetailPage({ params }: RouteProps) {
  const resolvedParams = await params;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Detail Header - Renders immediately */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-beige-dark px-5 py-4">
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-beige-dark text-charcoal hover:bg-beige-light/50 transition-all duration-300"
          >
            <svg
              className="w-4 h-4 text-sage"
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
            Volver al catálogo
          </Link>

          <span className="font-display text-sm tracking-widest font-semibold uppercase text-charcoal">
            Brunēa
          </span>
        </div>
      </header>

      {/* Detail Main Content - Dynamic streaming content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-5 py-8 md:py-16">
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailContent id={resolvedParams.id} />
        </Suspense>
      </main>

      {/* Detail Footer */}
      <footer className="py-6 text-center border-t border-beige-dark bg-cream/30">
        <p className="text-xs text-charcoal-light">
          © {new Date().getFullYear()} Brunēa · Trujillo, Perú
        </p>
      </footer>
    </div>
  );
}

/**
 * Skeleton Loader matching the detail layout precisely.
 * Animated pulse to provide immediate visual feedback.
 */
function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start animate-pulse">
      {/* Image Container Skeleton */}
      <div className="w-full aspect-4/5 bg-white rounded-3xl border border-beige-dark flex items-center justify-center p-4">
        <div className="w-full h-full bg-sand/20 rounded-2xl" />
      </div>

      {/* Info Section Skeleton */}
      <div className="flex flex-col gap-6 md:py-4 w-full">
        {/* Category badge */}
        <div className="h-6 w-24 bg-sand/30 rounded-full" />

        {/* Title */}
        <div className="h-10 w-3/4 bg-sand/30 rounded-lg" />

        {/* Price */}
        <div className="h-8 w-1/3 bg-sand/30 rounded-lg" />

        {/* Divider */}
        <div className="h-px w-full bg-beige-dark" />

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-sand/20 rounded" />
          <div className="h-4 w-full bg-sand/20 rounded" />
          <div className="h-4 w-5/6 bg-sand/20 rounded" />
        </div>

        {/* Button */}
        <div className="h-14 w-full md:w-48 bg-sand/30 rounded-full mt-4" />
      </div>
    </div>
  );
}

/**
 * Component that fetches data asynchronously on the server and streams HTML.
 */
async function ProductDetailContent({ id }: { id: string }) {
  const supabase = await createClient();

  // 1. Fetch the product
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    return notFound();
  }

  // 2. Fetch the category name
  let categoryName = "";
  if (product.category_id) {
    const { data: category } = await supabase
      .from("categories")
      .select("name")
      .eq("id", product.category_id)
      .single();
    if (category) {
      categoryName = category.name;
    }
  }

  const formattedPrice = formatPrice(product.price);
  const whatsappLink = generateWhatsAppLink(product.name, formattedPrice);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
      {/* Image Showcase Container */}
      <div className="relative w-full aspect-4/5 bg-white rounded-3xl overflow-hidden border border-beige-dark shadow-sm flex items-center justify-center p-4">
        <div className="relative w-full h-full">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority
            className="object-contain transition-all duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 450px"
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col gap-6 md:py-4">
        {/* Category Badge & Status */}
        <div className="flex flex-wrap gap-2 items-center">
          {categoryName && (
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-olive/10 text-olive">
              {categoryName}
            </span>
          )}
          {!product.is_active && (
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-error/10 text-error">
              Agotado
            </span>
          )}
        </div>

        {/* Product Title */}
        <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight">
          {product.name}
        </h1>

        {/* Product Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl md:text-3xl font-bold text-olive">
            {formattedPrice}
          </span>
          <span className="text-xs text-charcoal-light">Soles (S/.)</span>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-beige-dark" />

        {/* Product Description */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-charcoal-light">
            Descripción
          </h2>
          {product.description ? (
            <p className="text-sm text-charcoal-light leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          ) : (
            <p className="text-sm text-charcoal-light/60 italic leading-relaxed">
              No hay una descripción disponible para este producto.
            </p>
          )}
        </div>

        {/* CTA Buy Button */}
        <div className="mt-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              w-full md:w-auto inline-flex items-center justify-center gap-3
              px-8 py-3.5 rounded-full
              bg-[#4f5d44] text-white text-base font-semibold shadow-sm
              transition-all duration-300 ease-out
              hover:bg-[#3d4934] hover:shadow-md hover:scale-[1.02]
              active:scale-[0.98]
              ${!product.is_active ? "pointer-events-none opacity-55" : ""}
            `}
            aria-label={`Adquirir ${product.name} mediante WhatsApp`}
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            {product.is_active ? "¡La quiero!" : "No disponible"}
          </a>
          <p className="text-[10px] text-charcoal-light/75 text-center md:text-left mt-2 italic">
            * Serás redirigido a WhatsApp para confirmar la compra.
          </p>
        </div>
      </div>
    </div>
  );
}
