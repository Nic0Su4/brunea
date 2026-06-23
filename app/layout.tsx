import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brunēa — Carteras Originales Importadas de USA",
  description:
    "Descubre carteras originales de marcas como Guess, Tommy Hilfiger y más. Importadas directamente de USA a Trujillo, Perú. Envíos a todo el país.",
  keywords: [
    "carteras originales",
    "carteras importadas",
    "Guess",
    "Tommy Hilfiger",
    "Trujillo",
    "Perú",
    "bolsos originales",
  ],
  openGraph: {
    title: "Brunēa — Carteras Originales Importadas de USA",
    description:
      "Venta de carteras originales importadas de USA. Guess, Tommy Hilfiger y más marcas premium.",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
