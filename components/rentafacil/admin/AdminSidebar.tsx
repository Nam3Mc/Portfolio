'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard, ClipboardCheck, AlertTriangle,
  CreditCard, Package, Menu, X, ChevronRight, Shield
} from "lucide-react"

const NAV = [
  { href: "/rentafacil/admin",            label: "Dashboard",    icon: LayoutDashboard, exact: true },
  { href: "/rentafacil/admin/properties", label: "Propiedades",  icon: ClipboardCheck },
  { href: "/rentafacil/admin/disputes",   label: "Disputas",     icon: AlertTriangle },
  { href: "/rentafacil/admin/plans",      label: "Planes",       icon: Package },
  { href: "/rentafacil/admin/payments",   label: "Pagos",        icon: CreditCard },
]

interface Props {
  pendingCount?: number
  disputeCount?: number
}

export default function AdminSidebar({ pendingCount = 0, disputeCount = 0 }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const badges: Record<string, number> = {
    "/rentafacil/admin/properties": pendingCount,
    "/rentafacil/admin/disputes": disputeCount,
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const NavLinks = () => (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ href, label, icon: Icon, exact }) => {
        const active = isActive(href, exact)
        const badge = badges[href]
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              transition-colors relative
              ${active
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }
            `}
          >
            <Icon size={16} className="shrink-0" />
            {label}
            {badge > 0 && (
              <span className={`
                ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full
                ${active ? "bg-white/20 text-white" : "bg-red-500 text-white"}
              `}>
                {badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 h-full border-r border-gray-100 bg-white px-3 py-4 gap-6">
        {/* LOGO */}
        <div className="flex items-center gap-2 px-3 py-1">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Shield size={14} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">RentaFácil</p>
            <p className="text-[10px] text-gray-400">Super Admin</p>
          </div>
        </div>
        <NavLinks />
      </aside>

      {/* MOBILE TOPBAR */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Shield size={14} className="text-white" />
          </div>
          <p className="text-sm font-bold text-gray-900">Admin</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={18} className="text-gray-600" />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-64 bg-white h-full flex flex-col px-3 py-4 gap-6 shadow-xl">
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Shield size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">RentaFácil</p>
                  <p className="text-[10px] text-gray-400">Super Admin</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <NavLinks />
          </div>
        </div>
      )}
    </>
  )
}