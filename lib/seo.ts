/**
 * Centralized SEO constants for the Brunēa catalog.
 * Single source of truth for all metadata, structured data, and social sharing.
 *
 * When the production domain changes, update SITE_URL here and
 * everything (sitemap, canonical, OG, JSON-LD) updates automatically.
 */

export const SEO = {
  /** Base URL — update when moving to a custom domain */
  SITE_URL: "https://brunea.vercel.app",

  /** Brand name used in titles and structured data */
  SITE_NAME: "Brunēa",

  /** Primary description — used in meta description and OG */
  SITE_DESCRIPTION:
    "Descubre carteras originales importadas de USA en Trujillo, Perú. Marcas como Guess, Tommy Hilfiger, Michael Kors y más. Envíos a todo el país. 100% originales con garantía de autenticidad.",

  /** Short tagline for OG and social cards */
  TAGLINE: "Carteras Originales Importadas de USA",

  /** Contact WhatsApp (international format, no +) */
  WHATSAPP_NUMBER: "51987089462",

  /** Physical location */
  LOCATION: {
    city: "Trujillo",
    region: "La Libertad",
    country: "PE",
    countryName: "Perú",
  },

  /** Currency for product pricing */
  CURRENCY: "PEN",

  /** Social media URLs */
  SOCIAL: {
    instagram: "https://www.instagram.com/brunea.pe/",
    tiktok: "https://www.tiktok.com/@brunea.pe",
  },

  /**
   * Extended keyword set — long-tail and high-intent.
   * Ordered by estimated search volume and relevance.
   */
  KEYWORDS: [
    // Core brand + product
    "carteras originales",
    "carteras importadas USA",
    "carteras originales importadas",
    "bolsos originales",
    "carteras de marca",
    "carteras de marca originales",
    // Brand-specific (high intent)
    "carteras Guess originales",
    "carteras Tommy Hilfiger",
    "carteras Michael Kors Perú",
    "bolsos Guess Perú",
    "carteras Coach originales",
    // Location-based
    "carteras originales Trujillo",
    "carteras importadas Perú",
    "carteras originales Lima",
    "tienda de carteras Trujillo",
    "venta de carteras originales Perú",
    // Long-tail / high conversion intent
    "comprar carteras originales USA",
    "carteras americanas originales",
    "bolsos importados de Estados Unidos",
    "carteras originales envío a todo el Perú",
    "donde comprar carteras originales en Perú",
    // Category-specific
    "carteras de mano originales",
    "bolsos crossbody originales",
    "carteras tote originales",
    "mochilas de marca originales",
  ],

  /** Brand color palette for structured data and OG image */
  COLORS: {
    olive: "#4A5D3A",
    oliveDark: "#3A4A2D",
    cream: "#FEFCF7",
    beige: "#F5F0E8",
    charcoal: "#2D2D2D",
  },
} as const;

/** Type for the SEO config object */
export type SEOConfig = typeof SEO;
