import { SEO } from "@/lib/seo";
import type { MetadataRoute } from "next";

/**
 * Dynamic robots.txt — tells crawlers what to index.
 * Blocks admin/login/API routes from being indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/login/", "/api/"],
      },
    ],
    sitemap: `${SEO.SITE_URL}/sitemap.xml`,
    host: SEO.SITE_URL,
  };
}
