// app/admin/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Layout RAÍZ del panel de administración.
// Vive en app/admin/ — FUERA de app/rentafacil/
// No hereda nada de app/rentafacil/layout.tsx
// Sin Navbar, sin Footer, sin Providers de RentaFácil.
// Tiene su propio <html> y <body>.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import AdminSidebar from "@/components/rentafacil/admin/AdminSidebar"

export const metadata: Metadata = {
  title: { default: "Admin — RentaFácil", template: "%s · Admin" },
  description: "Panel de administración RentaFácil",
  robots: { index: false, follow: false }, // no indexar en buscadores
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 antialiased overflow-hidden">
        <div className="flex h-screen overflow-hidden">

          {/* SIDEBAR — fijo en desktop, drawer en mobile */}
          <AdminSidebar pendingCount={8} disputeCount={3} />

          {/* MAIN */}
          <main className="flex-1 flex flex-col overflow-hidden min-w-0">
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  )
}