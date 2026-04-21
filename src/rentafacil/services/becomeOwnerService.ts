// src/rentafacil/services/becomeOwnerService.ts

export type PlanId = "starter" | "pro" | "elite"
export type BillingCycle = "monthly" | "annual"
export type PaymentMethod = "crypto" | "fiat"

export interface Plan {
  id: PlanId
  name: string
  tagline: string
  monthlyPrice: number   // USD
  annualPrice: number    // USD/month billed annually
  annualSaving: number   // % saved vs monthly
  featured: boolean
  features: { label: string; included: boolean }[]
  limits: {
    properties: number | "unlimited"
    photos: number
    contracts: number | "unlimited"
    support: string
  }
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Para comenzar a alquilar",
    monthlyPrice: 9,
    annualPrice: 7,
    annualSaving: 22,
    featured: false,
    features: [
      { label: "1 propiedad activa", included: true },
      { label: "Hasta 5 fotos por propiedad", included: true },
      { label: "Contratos digitales básicos", included: true },
      { label: "Panel de gestión", included: true },
      { label: "Soporte por email", included: true },
      { label: "Estadísticas avanzadas", included: false },
      { label: "Prioridad en búsquedas", included: false },
      { label: "Badge verificado", included: false },
      { label: "Soporte prioritario 24/7", included: false },
      { label: "Gestión multi-propiedad", included: false },
    ],
    limits: { properties: 1, photos: 5, contracts: 3, support: "Email" },
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Para owners en crecimiento",
    monthlyPrice: 29,
    annualPrice: 22,
    annualSaving: 24,
    featured: true,
    features: [
      { label: "Hasta 5 propiedades activas", included: true },
      { label: "Hasta 20 fotos por propiedad", included: true },
      { label: "Contratos digitales avanzados", included: true },
      { label: "Panel de gestión", included: true },
      { label: "Soporte por email", included: true },
      { label: "Estadísticas avanzadas", included: true },
      { label: "Prioridad en búsquedas", included: true },
      { label: "Badge verificado", included: false },
      { label: "Soporte prioritario 24/7", included: false },
      { label: "Gestión multi-propiedad", included: false },
    ],
    limits: { properties: 5, photos: 20, contracts: "unlimited", support: "Email + Chat" },
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "Control total sin límites",
    monthlyPrice: 59,
    annualPrice: 45,
    annualSaving: 24,
    featured: false,
    features: [
      { label: "Propiedades ilimitadas", included: true },
      { label: "Fotos ilimitadas", included: true },
      { label: "Contratos digitales avanzados", included: true },
      { label: "Panel de gestión", included: true },
      { label: "Soporte por email", included: true },
      { label: "Estadísticas avanzadas", included: true },
      { label: "Prioridad en búsquedas", included: true },
      { label: "Badge verificado", included: true },
      { label: "Soporte prioritario 24/7", included: true },
      { label: "Gestión multi-propiedad", included: true },
    ],
    limits: { properties: "unlimited", photos: "unlimited" as any, contracts: "unlimited", support: "24/7 Prioritario" },
  },
]

export interface PurchasePayload {
  planId: PlanId
  billing: BillingCycle
  method: PaymentMethod
  walletAddress?: string
  txHash?: string
}

export interface PurchaseResult {
  orderId: string
  planId: PlanId
  billing: BillingCycle
  method: PaymentMethod
  amount: number
  currency: string
  txHash?: string
  activatedAt: string
}

// ── MOCK PAYMENT ──────────────────────────────────────────────────────────────
export async function processPurchase(payload: PurchasePayload): Promise<PurchaseResult> {
  await new Promise(r => setTimeout(r, 2000))
  const plan = PLANS.find(p => p.id === payload.planId)!
  const amount = payload.billing === "annual" ? plan.annualPrice * 12 : plan.monthlyPrice

  return {
    orderId: `ORD-${Date.now()}`,
    planId: payload.planId,
    billing: payload.billing,
    method: payload.method,
    amount,
    currency: "USD",
    txHash: payload.method === "crypto"
      ? `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`
      : undefined,
    activatedAt: new Date().toISOString(),
  }
}

// ── PARA BACKEND REAL ─────────────────────────────────────────────────────────
// export async function processPurchase(payload: PurchasePayload): Promise<PurchaseResult> {
//   const res = await fetch("/api/owner/subscribe", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   })
//   if (!res.ok) throw new Error("Error al procesar el pago")
//   return res.json()
// }