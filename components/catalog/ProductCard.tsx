import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { formatPrice } from "@/lib/format";
import type { Tables } from "@/types/supabase";

interface ProductCardProps {
  product: Tables<"products">;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = formatPrice(product.price);

  return (
    <article className="group relative flex rounded-4xl overflow-hidden bg-[#4f5d44] shadow-[0_12px_30px_-10px_rgba(79,93,68,0.12)] hover:shadow-[0_16px_35px_-8px_rgba(79,93,68,0.18)] transition-all duration-500 ease-out border border-[#4f5d44]/5">
      {/* Absolute overlay link for the whole card */}
      <Link
        href={`/productos/${product.id}`}
        className="absolute inset-0 z-0"
        aria-label={`Ver detalles de ${product.name}`}
      />

      {/* Image Side */}
      <div className="relative w-[45%] shrink-0 bg-[#e9e8e0]">
        <div className="relative aspect-3/4 w-full flex items-center justify-center">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 45vw, 220px"
          />
          {/* Brand watermark on image */}
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] tracking-widest text-charcoal/30 font-display select-none">
            brunēa
          </span>
          {/* Shopping bag icon */}
          <div className="absolute bottom-2.5 right-2.5 w-6 h-6 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full p-1 border border-white/25">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Info Side */}
      <div className="relative z-10 flex flex-col justify-center items-center gap-3 p-5 text-center flex-1 min-w-0 pointer-events-none">
        <h2 className="font-display text-base md:text-lg font-bold text-white leading-tight">
          {product.name}
        </h2>
        <p className="text-xs md:text-sm font-light text-white/90">
          {formattedPrice}
        </p>
        <div className="pointer-events-auto">
          {/* Plain white button as in reference mockup (no WhatsApp logo, oval, olive text) */}
          <span
            className="
              inline-block
              px-6 py-1.5 rounded-full
              bg-white text-[#4f5d44] text-xs font-semibold
              shadow-sm hover:shadow-md hover:scale-105 active:scale-95
              transition-all duration-300 cursor-pointer
            "
          >
            ¡La quiero!
          </span>
        </div>
      </div>
    </article>
  );
}
