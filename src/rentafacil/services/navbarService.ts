// src/rentafacil/services/navbarService.ts

export interface NavLink {
  label: string
  href: string
  mobileOnly?: boolean
}

export interface NavbarConfig {
  navLinks: NavLink[]
  dropdownLinks: NavLink[]
  cta?: { label: string; href: string; variant: "filled" | "ghost" }
}

// ─── MOCK — reemplazar con fetch a /api/navbar-config?role=xxx ───────────────
const CONFIGS: Record<string, NavbarConfig> = {
  guest: {
    navLinks: [
      { label: "Explorar", href: "/rentafacil/explore" },
      { label: "Mis contratos", href: "/rentafacil/mis-contratos" },
    ],
    dropdownLinks: [
      { label: "Perfil", href: "/rentafacil/profile" },
      { label: "Mis contratos", href: "/rentafacil/mis-contratos" },
      { label: "Listar propiedad", href: "/rentafacil/become-owner", mobileOnly: true },
    ],
    cta: { label: "Listar propiedad", href: "/rentafacil/become-owner", variant: "ghost" },
  },
  owner: {
    navLinks: [
      { label: "Explorar", href: "/rentafacil/explore" },
      { label: "Propiedades", href: "/rentafacil/owner/properties" },
      { label: "Contratos", href: "/rentafacil/mis-contratos" },
    ],
    dropdownLinks: [
      { label: "Perfil", href: "/rentafacil/profile" },
      { label: "Mis propiedades", href: "/rentafacil/owner/properties" },
      { label: "Contratos", href: "/rentafacil/mis-contratos" },
      { label: "Finanzas", href: "/rentafacil/owner/finance" },
      { label: "+ Nueva propiedad", href: "/rentafacil/list-property", mobileOnly: true },
    ],
    cta: { label: "+ Nueva propiedad", href: "/rentafacil/list-property", variant: "filled" },
  },
}

// Cuando tengas backend real, reemplazás esto por:
// export async function getNavbarConfig(role: string): Promise<NavbarConfig> {
//   const res = await fetch(`/api/navbar-config?role=${role}`)
//   return res.json()
// }

export function getNavbarConfig(role: string): NavbarConfig {
  return CONFIGS[role] ?? { navLinks: [], dropdownLinks: [] }
}