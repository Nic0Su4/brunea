import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-charcoal">
        {label}
      </label>
      <input
        id={inputId}
        className={`
          w-full px-4 py-2.5 rounded-xl border text-sm
          bg-white text-charcoal placeholder:text-sand
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive
          ${error ? "border-error" : "border-sand"}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs text-charcoal-light">{helperText}</p>
      )}
    </div>
  );
}

/* ============================================
   Textarea Variant
   ============================================ */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  id,
  className = "",
  ...props
}: TextareaProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-charcoal">
        {label}
      </label>
      <textarea
        id={inputId}
        className={`
          w-full px-4 py-2.5 rounded-xl border text-sm
          bg-white text-charcoal placeholder:text-sand
          transition-colors duration-200 resize-y min-h-20
          focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive
          ${error ? "border-error" : "border-sand"}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ============================================
   Select Variant
   ============================================ */

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder = "Seleccionar...",
  id,
  className = "",
  ...props
}: SelectProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-charcoal">
        {label}
      </label>
      <select
        id={inputId}
        className={`
          w-full px-4 py-2.5 rounded-xl border text-sm
          bg-white text-charcoal
          transition-colors duration-200 appearance-none
          focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive
          ${error ? "border-error" : "border-sand"}
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
