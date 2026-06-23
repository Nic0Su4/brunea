"use client";

import { toggleProductActive } from "@/actions/products";
import { useState } from "react";

interface ToggleActiveButtonProps {
  productId: string;
  isActive: boolean;
}

export default function ToggleActiveButton({
  productId,
  isActive: initialActive,
}: ToggleActiveButtonProps) {
  const [isActive, setIsActive] = useState(initialActive);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const newState = !isActive;

    const result = await toggleProductActive(productId, newState);

    if (result.success) {
      setIsActive(newState);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
        transition-all duration-200 cursor-pointer
        ${
          isActive
            ? "bg-olive/10 text-olive"
            : "bg-charcoal/5 text-charcoal-light"
        }
        ${loading ? "opacity-50 cursor-wait" : "hover:opacity-80"}
      `}
      title={isActive ? "Desactivar producto" : "Activar producto"}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-olive" : "bg-charcoal-light"
        }`}
      />
      {isActive ? "Activo" : "Oculto"}
    </button>
  );
}
