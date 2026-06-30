import type { MetadataRoute } from "next";
import { createClient } from "@/utils/supabase/server";
import { SEO } from "@/lib/seo";

/**
 * Dynamic sitemap that fetches all active products from Supabase.
 *
 * Generates:
 * - Home page (priority 1.0)
 * - Each product page with its image (Image Sitemap for Google Images)
 *
 * Revalidates on every request to stay in sync with the catalog.
 */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // Fetch all active products for the sitemap
  const { data: products } = await supabase
    .from("products")
    .select("id, image_url, updated_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  // Home page entry
  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: SEO.SITE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  };

  // Product page entries with Image Sitemap support
  const productEntries: MetadataRoute.Sitemap =
    products?.map((product) => ({
      url: `${SEO.SITE_URL}/productos/${product.id}`,
      lastModified: product.updated_at
        ? new Date(product.updated_at)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: product.image_url ? [product.image_url] : [],
    })) ?? [];

  return [homeEntry, ...productEntries];
}
