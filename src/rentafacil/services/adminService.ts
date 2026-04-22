// src/rentafacil/services/adminService.ts

// ── TYPES ─────────────────────────────────────────────────────────────────────

export type AdminPropertyStatus = "pending_verification" | "approved" | "rejected" | "active" | "paused"
export type DisputeStatus = "open" | "in_review" | "resolved" | "closed"
export type DisputeResolution = "owner_favor" | "guest_favor" | "split" | null
export type PlanId = "starter" | "pro" | "elite"
export type PaymentStatus = "completed" | "pending" | "failed" | "refunded"

export interface AdminProperty {
  id: string
  name: string
  address: string
  ownerName: string
  ownerEmail: string
  images: string[]
  status: AdminPropertyStatus
  submittedAt: string
  documents: {
    propertyDoc: boolean
    serviceReceipt: boolean
    ownerIdDoc: boolean
  }
  price: number
  rejectionReason?: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: "owner" | "guest"
  plan?: PlanId
  joinedAt: string
  activeContracts: number
  totalSpent: number
}

export interface AdminDispute {
  id: string
  propertyName: string
  ownerName: string
  guestName: string
  amount: number
  reason: string
  description: string
  status: DisputeStatus
  resolution: DisputeResolution
  createdAt: string
  updatedAt: string
}

export interface AdminPlan {
  id: PlanId
  name: string
  monthlyPrice: number
  annualPrice: number
  maxProperties: number | null
  maxPhotos: number | null
  commission: number
  active: boolean
}

export interface AdminPayment {
  id: string
  ownerName: string
  planName: string
  amount: number
  commission: number
  method: "crypto" | "fiat"
  status: PaymentStatus
  date: string
  txHash?: string
}

export interface DashboardMetrics {
  pendingProperties: number
  activeProperties: number
  totalContracts: number
  activeContracts: number
  openDisputes: number
  monthlyRevenue: number
  monthlyCommissions: number
  totalUsers: number
  occupancyRate: number
  pendingOlderThan48h: number
}

// ── MOCK DATA ──────────────────────────────────────────────────────────────────

export const mockMetrics: DashboardMetrics = {
  pendingProperties: 8,
  activeProperties: 124,
  totalContracts: 312,
  activeContracts: 89,
  openDisputes: 3,
  monthlyRevenue: 4820,
  monthlyCommissions: 241,
  totalUsers: 847,
  occupancyRate: 78,
  pendingOlderThan48h: 3,
}

export const mockPendingProperties: AdminProperty[] = [
  {
    id: "prop_p001",
    name: "Apartamento Chapinero Alto",
    address: "Calle 63 #8-12, Bogotá",
    ownerName: "Carlos Mendoza",
    ownerEmail: "carlos@email.com",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600"],
    status: "pending_verification",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(), // 52h ago
    documents: { propertyDoc: true, serviceReceipt: true, ownerIdDoc: true },
    price: 2800000,
  },
  {
    id: "prop_p002",
    name: "Casa Usaquén con Jardín",
    address: "Carrera 7 #119-45, Bogotá",
    ownerName: "Ana Rodríguez",
    ownerEmail: "ana@email.com",
    images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600"],
    status: "pending_verification",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), // 30h ago
    documents: { propertyDoc: true, serviceReceipt: false, ownerIdDoc: true },
    price: 4500000,
  },
  {
    id: "prop_p003",
    name: "Estudio Moderno Zona Rosa",
    address: "Calle 85 #15-23, Bogotá",
    ownerName: "Miguel Torres",
    ownerEmail: "miguel@email.com",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600"],
    status: "pending_verification",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(), // 10h ago
    documents: { propertyDoc: true, serviceReceipt: true, ownerIdDoc: true },
    price: 1900000,
  },
]

export const mockDisputes: AdminDispute[] = [
  {
    id: "disp_001",
    propertyName: "Apartamento Rosales Piso 8",
    ownerName: "Luis Pérez",
    guestName: "María García",
    amount: 3200000,
    reason: "Depósito no devuelto",
    description: "El inquilino reclama la devolución del depósito de garantía. El propietario alega daños en la propiedad no documentados al momento de la entrega.",
    status: "open",
    resolution: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "disp_002",
    propertyName: "Casa Chicó Norte",
    ownerName: "Sandra López",
    guestName: "Andrés Mora",
    amount: 5400000,
    reason: "Cancelación anticipada",
    description: "El propietario canceló el contrato con menos de 3 meses de preaviso sin justa causa, violando el artículo 22 de la Ley 820 de 2003.",
    status: "in_review",
    resolution: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "disp_003",
    propertyName: "Estudio Chapinero",
    ownerName: "Roberto Silva",
    guestName: "Camila Ruiz",
    amount: 1800000,
    reason: "Condiciones no cumplidas",
    description: "El inmueble no contaba con las amenidades descritas en el anuncio. El inquilino solicita compensación por 2 meses.",
    status: "resolved",
    resolution: "guest_favor",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
]

export const mockPlans: AdminPlan[] = [
  { id: "starter", name: "Starter", monthlyPrice: 9, annualPrice: 7, maxProperties: 1, maxPhotos: 5, commission: 5, active: true },
  { id: "pro", name: "Pro", monthlyPrice: 29, annualPrice: 22, maxProperties: 5, maxPhotos: 20, commission: 4, active: true },
  { id: "elite", name: "Elite", monthlyPrice: 59, annualPrice: 45, maxProperties: null, maxPhotos: null, commission: 3, active: true },
]

export const mockPayments: AdminPayment[] = [
  { id: "pay_001", ownerName: "Carlos Mendoza", planName: "Pro", amount: 29, commission: 29 * 0.04, method: "crypto", status: "completed", date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), txHash: "0xabc123def456" },
  { id: "pay_002", ownerName: "Ana Rodríguez", planName: "Elite", amount: 59, commission: 59 * 0.03, method: "fiat", status: "completed", date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: "pay_003", ownerName: "Miguel Torres", planName: "Starter", amount: 9, commission: 9 * 0.05, method: "fiat", status: "pending", date: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: "pay_004", ownerName: "Sandra López", planName: "Pro", amount: 29, commission: 29 * 0.04, method: "crypto", status: "failed", date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: "pay_005", ownerName: "Roberto Silva", planName: "Pro", amount: 29, commission: 29 * 0.04, method: "fiat", status: "refunded", date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
]

// ── SERVICE FUNCTIONS ──────────────────────────────────────────────────────────

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  await new Promise(r => setTimeout(r, 500))
  return mockMetrics
}

export async function getPendingProperties(): Promise<AdminProperty[]> {
  await new Promise(r => setTimeout(r, 400))
  return mockPendingProperties
}

export async function approveProperty(id: string): Promise<void> {
  await new Promise(r => setTimeout(r, 800))
}

export async function rejectProperty(id: string, reason: string): Promise<void> {
  await new Promise(r => setTimeout(r, 800))
}

export async function getDisputes(): Promise<AdminDispute[]> {
  await new Promise(r => setTimeout(r, 400))
  return mockDisputes
}

export async function resolveDispute(
  id: string,
  resolution: DisputeResolution,
  notes: string
): Promise<void> {
  await new Promise(r => setTimeout(r, 800))
}

export async function getPlans(): Promise<AdminPlan[]> {
  await new Promise(r => setTimeout(r, 300))
  return mockPlans
}

export async function updatePlan(id: PlanId, data: Partial<AdminPlan>): Promise<void> {
  await new Promise(r => setTimeout(r, 700))
}

export async function getPayments(): Promise<AdminPayment[]> {
  await new Promise(r => setTimeout(r, 400))
  return mockPayments
}

// ── HELPERS ────────────────────────────────────────────────────────────────────

export function hoursAgo(isoDate: string): number {
  return Math.floor((Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60))
}

export function isUrgent(isoDate: string): boolean {
  return hoursAgo(isoDate) >= 48
}