import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // This should be handled by middleware, but double-check
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Admin Nav */}
      <nav className="bg-white border-b border-beige-dark sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 flex items-center justify-between h-14">
          {/* Left: Brand + Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-display text-lg font-bold text-charcoal"
            >
              Brunēa
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              <Link
                href="/admin/productos"
                className="px-3 py-1.5 text-sm text-charcoal-light hover:text-charcoal hover:bg-beige rounded-lg transition-colors"
              >
                Productos
              </Link>
              <Link
                href="/admin/categorias"
                className="px-3 py-1.5 text-sm text-charcoal-light hover:text-charcoal hover:bg-beige rounded-lg transition-colors"
              >
                Categorías
              </Link>
            </div>
          </div>

          {/* Right: User + Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-charcoal-light hover:text-charcoal transition-colors"
              title="Ver catálogo público"
            >
              Ver tienda ↗
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="px-3 py-1.5 text-sm text-charcoal-light hover:text-error rounded-lg transition-colors cursor-pointer"
              >
                Salir
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="sm:hidden flex items-center gap-1 px-5 pb-2">
          <Link
            href="/admin/productos"
            className="px-3 py-1.5 text-sm text-charcoal-light hover:text-charcoal hover:bg-beige rounded-lg transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/admin/categorias"
            className="px-3 py-1.5 text-sm text-charcoal-light hover:text-charcoal hover:bg-beige rounded-lg transition-colors"
          >
            Categorías
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-5 py-8">{children}</main>
    </div>
  );
}
