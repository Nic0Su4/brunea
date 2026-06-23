export default function AdminLoading() {
  return (
    <div className="w-full min-h-[450px] flex flex-col items-center justify-center bg-white/40 rounded-3xl border border-beige-dark/50 backdrop-blur-xs p-8 transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        {/* Animated premium spinner */}
        <div className="relative w-10 h-10">
          {/* Decorative outer ring */}
          <div className="absolute inset-0 rounded-full border-3 border-beige-dark/50" />
          {/* Animated olive green spinner indicator */}
          <div className="absolute inset-0 rounded-full border-3 border-t-[#4f5d44] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#4f5d44]/75 animate-pulse">
          Actualizando panel...
        </span>
      </div>
    </div>
  );
}
