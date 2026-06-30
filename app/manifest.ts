import type { MetadataRoute } from "next";
import { SEO } from "@/lib/seo";

/**
 * Web App Manifest — improves PWA support and signals to Google
 * that this is a well-structured web application.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SEO.SITE_NAME} — ${SEO.TAGLINE}`,
    short_name: SEO.SITE_NAME,
    description: SEO.SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: SEO.COLORS.cream,
    theme_color: SEO.COLORS.olive,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
