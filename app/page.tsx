import { createClient } from "@/utils/supabase/server";
import CatalogHeader from "@/components/catalog/CatalogHeader";
import ProductCard from "@/components/catalog/ProductCard";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { SEO } from "@/lib/seo";
import { formatPrice } from "@/lib/format";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = resolvedSearchParams.category;

  const supabase = await createClient();

  // 1. Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  // 2. If category is selected, find its ID
  let activeCategoryId: string | null = null;
  let activeCategoryName: string | null = null;
  if (categorySlug) {
    const { data: categoryData } = await supabase
      .from("categories")
      .select("id, name")
      .eq("slug", categorySlug)
      .single();

    if (categoryData) {
      activeCategoryId = categoryData.id;
      activeCategoryName = categoryData.name;
    }
  }

  // 3. Fetch active products (filtered by category if necessary)
  let productsQuery = supabase
    .from("products")
    .select("*")
    .eq("is_active", true);

  if (activeCategoryId) {
    productsQuery = productsQuery.eq("category_id", activeCategoryId);
  }

  const { data: products, error } = await productsQuery.order("created_at", {
    ascending: false,
  });

  /**
   * ItemList JSON-LD — tells Google this is a catalog/product listing.
   * Enables rich results with product carousels in search.
   */
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: activeCategoryName
      ? `${activeCategoryName} — ${SEO.SITE_NAME}`
      : `Catálogo de Carteras Originales — ${SEO.SITE_NAME}`,
    description: activeCategoryName
      ? `${activeCategoryName} originales importadas de USA en ${SEO.SITE_NAME}`
      : SEO.SITE_DESCRIPTION,
    url: categorySlug
      ? `${SEO.SITE_URL}/?category=${categorySlug}`
      : SEO.SITE_URL,
    numberOfItems: products?.length ?? 0,
    itemListElement:
      products?.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SEO.SITE_URL}/productos/${product.id}`,
        name: product.name,
        image: product.image_url,
      })) ?? [],
  };

  /**
   * CollectionPage JSON-LD — signals that this is a curated collection.
   */
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SEO.SITE_NAME} — ${SEO.TAGLINE}`,
    description: SEO.SITE_DESCRIPTION,
    url: SEO.SITE_URL,
    isPartOf: {
      "@type": "WebSite",
      name: SEO.SITE_NAME,
      url: SEO.SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Carteras originales importadas de USA",
    },
    inLanguage: "es",
  };

  /**
   * BreadcrumbList JSON-LD — clear navigation structure for Google.
   */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SEO.SITE_URL,
      },
      ...(activeCategoryName
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: activeCategoryName,
              item: `${SEO.SITE_URL}/?category=${categorySlug}`,
            },
          ]
        : []),
    ],
  };

  return (
    <div className="flex flex-col flex-1 bg-linear-to-b from-white via-[#fcfbf9] to-[#eae8df] min-h-screen">
      {/* Structured Data */}
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={collectionPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <CatalogHeader />

      <main
        className="flex-1 w-full max-w-2xl mx-auto px-5 pb-12"
        aria-label="Catálogo de carteras originales"
      >
        {/* Categories Navigation */}
        {categories && categories.length > 0 && (
          <nav
            aria-label="Filtrar por categoría"
            className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-5 px-5 scrollbar-none select-none"
          >
            <Link
              href="/"
              className={`
                px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-300
                ${
                  !categorySlug
                    ? "bg-olive border-olive text-white shadow-sm"
                    : "bg-white border-beige-dark text-charcoal hover:bg-beige-light/50"
                }
              `}
            >
              Todos
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/?category=${cat.slug}`}
                className={`
                  px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-300
                  ${
                    categorySlug === cat.slug
                      ? "bg-olive border-olive text-white shadow-sm"
                      : "bg-white border-beige-dark text-charcoal hover:bg-beige-light/50"
                  }
                `}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        )}

        {error && (
          <div className="text-center py-12" role="alert">
            <p className="text-charcoal-light">
              No se pudieron cargar los productos. Intenta de nuevo más tarde.
            </p>
          </div>
        )}

        {products && products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-beige flex items-center justify-center">
              <svg
                className="w-8 h-8 text-sage"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <p className="text-charcoal-light text-sm">
              Pronto tendremos nuevos productos en esta categoría. ¡Vuelve
              pronto!
            </p>
          </div>
        )}

        {/* Product Catalog Grid */}
        {products && products.length > 0 && (
          <section aria-label="Productos disponibles">
            <h2 className="sr-only">
              {activeCategoryName
                ? `${activeCategoryName} — Carteras originales`
                : "Catálogo completo de carteras originales importadas de USA"}
            </h2>
            <div className="flex flex-col gap-5">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 2}
                />
              ))}
            </div>
          </section>
        )}

        {/* SEO-rich text block — visible to users and crawlers */}
        <section
          className="mt-12 pt-8 border-t border-beige-dark"
          aria-label="Información sobre Brunēa"
        >
          <h2 className="font-display text-lg font-bold text-charcoal mb-3">
            Carteras Originales Importadas de USA
          </h2>
          <p className="text-sm text-charcoal-light leading-relaxed mb-4">
            En <strong>Brunēa</strong> ofrecemos carteras y bolsos 100%
            originales importados directamente desde Estados Unidos. Trabajamos
            con las mejores marcas como{" "}
            <strong>Guess, Tommy Hilfiger, Michael Kors, Coach</strong> y más.
            Cada pieza viene con garantía de autenticidad.
          </p>
          <p className="text-sm text-charcoal-light leading-relaxed">
            Con sede en <strong>Trujillo, Perú</strong>, realizamos envíos a
            todo el país. Compra tu cartera original de forma segura a través de
            nuestro catálogo digital y contáctanos por WhatsApp para una atención
            personalizada.
          </p>
        </section>

        {/* Social Buttons Section */}
        <nav
          aria-label="Redes sociales de Brunēa"
          className="flex flex-col gap-3 mt-8"
        >
          <Link
            href="https://www.instagram.com/brunea.pe/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-[#4f5d44] text-white font-semibold text-sm hover:bg-[#3d4934] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Síguenos en Instagram
          </Link>
          <Link
            href="https://www.tiktok.com/@brunea.pe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-[#4f5d44] text-white font-semibold text-sm hover:bg-[#3d4934] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-sm"
          >
            <svg
              className="w-4.5 h-4.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.3 8.3 0 0 0 4.76 1.49V7.09a4.85 4.85 0 0 1-1-.4z" />
            </svg>
            Síguenos en TikTok
          </Link>
        </nav>
      </main>

      {/* Footer with semantic markup */}
      <footer className="py-6 text-center border-t border-beige-dark mt-8">
        <p className="text-xs text-charcoal-light">
          © {new Date().getFullYear()} {SEO.SITE_NAME} · {SEO.LOCATION.city},{" "}
          {SEO.LOCATION.countryName}
        </p>
      </footer>
    </div>
  );
}
