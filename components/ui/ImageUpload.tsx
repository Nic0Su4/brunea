"use client";

import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

interface ImageUploadProps {
  currentImageUrl?: string;
  onUploadComplete: (url: string) => void;
  error?: string;
}

export default function ImageUpload({
  currentImageUrl,
  onUploadComplete,
  error,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    currentImageUrl || null,
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Solo se permiten archivos JPG, PNG o WebP");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("La imagen no puede superar 5MB");
      return;
    }

    setUploadError(null);
    setUploading(true);

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const supabase = createClient();

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadErr } = await supabase.storage
        .from("products")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadErr) {
        throw uploadErr;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("products").getPublicUrl(filePath);

      onUploadComplete(publicUrl);
      setPreview(publicUrl);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Error al subir la imagen",
      );
      setPreview(currentImageUrl || null);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localPreview);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-charcoal">
        Imagen del producto
      </label>
      <div
        className={`
          relative w-full aspect-square max-w-70 rounded-2xl border-2 border-dashed
          transition-colors duration-200 overflow-hidden cursor-pointer
          hover:border-olive hover:bg-beige/50
          ${error || uploadError ? "border-error" : "border-sand"}
          ${uploading ? "opacity-60 pointer-events-none" : ""}
        `}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label="Subir imagen del producto"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Vista previa del producto"
            fill
            className="object-contain p-4 bg-sand/10"
            sizes="280px"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 px-4 text-center">
            <svg
              className="w-10 h-10 text-sage"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs text-charcoal-light">
              Haz clic para subir una imagen
            </span>
            <span className="text-[10px] text-sand">
              JPG, PNG o WebP · Máx 5MB
            </span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/80">
            <svg
              className="animate-spin h-8 w-8 text-olive"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Subiendo imagen"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {(error || uploadError) && (
        <p className="text-xs text-error" role="alert">
          {error || uploadError}
        </p>
      )}
    </div>
  );
}
