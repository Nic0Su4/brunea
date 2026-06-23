/**
 * Format a price number to Peruvian Soles format.
 * @example formatPrice(319) → "S/. 319"
 * @example formatPrice(260.5) → "S/. 260.50"
 */
export function formatPrice(price: number): string {
  const formatted = price % 1 === 0 ? price.toString() : price.toFixed(2);
  return `S/. ${formatted}`;
}

/**
 * Generate a URL-friendly slug from a string.
 * @example generateSlug("White Tote Guess") → "white-tote-guess"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
