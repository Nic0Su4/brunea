const WHATSAPP_NUMBER = "51987089462";

/**
 * Generate a WhatsApp deep link with a predefined message.
 * Uses the WhatsApp API URL format for universal compatibility.
 */
export function generateWhatsAppLink(
  productName: string,
  price: string
): string {
  const message = `¡Hola! 👋 Me interesa la cartera *${productName}* a *${price}*. ¿Está disponible?`;
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
}
