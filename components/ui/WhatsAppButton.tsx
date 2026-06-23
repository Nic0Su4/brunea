import { generateWhatsAppLink } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  productName: string;
  formattedPrice: string;
}

export default function WhatsAppButton({
  productName,
  formattedPrice,
}: WhatsAppButtonProps) {
  const href = generateWhatsAppLink(productName, formattedPrice);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center justify-center gap-2
        px-6 py-2.5 rounded-full
        bg-cream text-charcoal text-sm font-semibold
        border border-sand
        transition-all duration-300 ease-out
        hover:bg-white hover:shadow-md hover:scale-105
        active:scale-95
      "
      aria-label={`Comprar ${productName} por WhatsApp`}
    >
      ¡La quiero!
    </a>
  );
}
