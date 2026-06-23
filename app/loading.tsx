export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream/70 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        {/* Animated premium spinner */}
        <div className="relative w-12 h-12">
          {/* Decorative outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-sand/30" />
          {/* Animated olive green spinner indicator */}
          <div className="absolute inset-0 rounded-full border-4 border-t-olive border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <span className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-widest text-[#4f5d44] animate-pulse">
          Brunēa
        </span>
      </div>
    </div>
  );
}
