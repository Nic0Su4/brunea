/**
 * Reusable JSON-LD structured data component for SEO rich snippets.
 *
 * Renders a <script type="application/ld+json"> tag with the provided
 * structured data. Google uses this to generate rich results (prices,
 * availability, breadcrumbs, business info) directly in search results.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
