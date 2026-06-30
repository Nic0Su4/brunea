import { ImageResponse } from "next/og";

/**
 * Auto-generated Open Graph image for the home page.
 * Shows when the URL is shared on WhatsApp, Facebook, Twitter, etc.
 *
 * Uses the Brunēa brand palette with a premium, clean design.
 */

export const alt =
  "Brunēa — Carteras Originales Importadas de USA | Trujillo, Perú";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #4A5D3A 0%, #3A4A2D 50%, #2D3B22 100%)",
          position: "relative",
        }}
      >
        {/* Decorative top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #D4C9B8, #F5F0E8, #D4C9B8)",
            display: "flex",
          }}
        />

        {/* Subtle pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            background:
              "radial-gradient(circle at 20% 50%, #F5F0E8 1px, transparent 1px), radial-gradient(circle at 80% 20%, #F5F0E8 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Brand Name */}
        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 700,
            color: "#FEFCF7",
            letterSpacing: "8px",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Brunēa
        </div>

        {/* Decorative divider */}
        <div
          style={{
            width: "120px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #D4C9B8, transparent)",
            marginBottom: "24px",
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 400,
            color: "#E8DFD1",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "40px",
          }}
        >
          Carteras Originales Importadas de USA
        </div>

        {/* Location badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 32px",
            borderRadius: "50px",
            border: "1px solid rgba(254, 252, 247, 0.2)",
            background: "rgba(254, 252, 247, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 16,
              color: "#D4C9B8",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Trujillo, Perú · Envíos a todo el país
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #D4C9B8, #F5F0E8, #D4C9B8)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
