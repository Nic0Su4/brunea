import Link from "next/link";

export default function CatalogHeader() {
  return (
    <header className="w-full bg-transparent">
      <div className="max-w-2xl mx-auto px-5 pt-6 pb-6">
        {/* Brand Profile */}
        <div className="flex items-start gap-4 mb-4">
          {/* Custom Avatar matching image: light olive/beige circle with text */}
          <div className="w-16 h-16 rounded-full bg-[#d8dfc9] flex items-center justify-center text-[#4f5d44] font-display font-semibold text-lg tracking-tight select-none shadow-[0_8px_20px_-6px_rgba(79,93,68,0.15)] shrink-0">
            brunēa
          </div>
          <div className="flex flex-col">
            <h1 className="font-display text-xl font-bold text-charcoal leading-tight">
              Brunēa
            </h1>
            <p className="text-xs text-charcoal-light leading-relaxed mt-0.5 max-w-xs">
              Venta de carteras originales importadas de USA.
            </p>

            {/* Social Links matching image: aligned horizontally under description */}
            <div className="flex items-center gap-4 mt-3">
              <Link
                href="https://www.instagram.com/brunea.pe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-olive transition-colors duration-200"
                aria-label="Instagram de Brunēa"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link
                href="https://www.tiktok.com/@brunea.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-olive transition-colors duration-200"
                aria-label="TikTok de Brunēa"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.3 8.3 0 0 0 4.76 1.49V7.09a4.85 4.85 0 0 1-1-.4z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
