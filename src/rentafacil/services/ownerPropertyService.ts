// src/rentafacil/services/ownerPropertyService.ts

export type PropertyStatus = "pending_verification" | "approved" | "active" | "paused" | "rejected"

export interface BlockedDate {
  date: string        // YYYY-MM-DD
  reason?: string     // "remodelacion" | "personal" | etc
}

export interface OwnerProperty {
  id: string
  name: string
  description: string
  address: string
  price: number
  images: string[]
  status: PropertyStatus
  amenities: string[]
  blockedDates: BlockedDate[]
  createdAt: string
  // Stats
  activeContracts: number
  totalIncome: number
  occupancyRate: number   // 0-100
  totalContracts: number
}

export interface OwnerContract {
  id: string
  propertyId: string
  guestName: string
  guestAddress: string  // wallet
  startDate: string
  endDate: string
  months: number
  pricePerMonth: number
  status: "active" | "pending" | "completed" | "cancelled"
}

export interface OwnerDocument {
  id: string
  label: string
  description: string
  required: boolean
  file?: { name: string; url: string; uploadedAt: string } | null
}

// ── MOCK DATA ──────────────────────────────────────────────────────────────
export const mockOwnerProperties: OwnerProperty[] = [
  {
    id: "prop_001",
    name: "Apartamento Rosales Piso 8",
    description: "Apartamento moderno con vista panorámica en el corazón de Rosales. Completamente amoblado, cocina integral, zona de lavandería.",
    address: "Calle 85 #15-23, Bogotá",
    price: 3200000,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    status: "active",
    amenities: ["WiFi", "Parqueadero", "Gimnasio", "Seguridad 24h", "Terraza"],
    blockedDates: [
      { date: "2025-08-15", reason: "Remodelación" },
      { date: "2025-08-16", reason: "Remodelación" },
    ],
    createdAt: "2024-12-01T00:00:00Z",
    activeContracts: 1,
    totalIncome: 9600000,
    occupancyRate: 85,
    totalContracts: 3,
  },
  {
    id: "prop_002",
    name: "Casa Usaquén con Jardín",
    description: "Casa de dos pisos con jardín privado en zona residencial tranquila. Ideal para familias.",
    address: "Carrera 7 #119-45, Bogotá",
    price: 4500000,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    ],
    status: "pending_verification",
    amenities: ["Jardín", "Parqueadero", "BBQ", "WiFi"],
    blockedDates: [],
    createdAt: "2025-01-15T00:00:00Z",
    activeContracts: 0,
    totalIncome: 0,
    occupancyRate: 0,
    totalContracts: 0,
  },
  {
    id: "prop_003",
    name: "Estudio Chapinero Alto",
    description: "Estudio compacto y funcional, perfecto para profesionales. Excelente ubicación con transporte cercano.",
    address: "Calle 63 #8-12, Bogotá",
    price: 1800000,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    ],
    status: "paused",
    amenities: ["WiFi", "Lavandería", "Seguridad"],
    blockedDates: [],
    createdAt: "2024-10-20T00:00:00Z",
    activeContracts: 0,
    totalIncome: 5400000,
    occupancyRate: 60,
    totalContracts: 3,
  },
]

export const mockOwnerContracts: OwnerContract[] = [
  {
    id: "contract_001",
    propertyId: "prop_001",
    guestName: "Carlos Mendoza",
    guestAddress: "0xabc...def",
    startDate: "2025-01-01",
    endDate: "2025-04-01",
    months: 3,
    pricePerMonth: 3200000,
    status: "active",
  },
  {
    id: "contract_002",
    propertyId: "prop_001",
    guestName: "Ana Rodríguez",
    guestAddress: "0x123...456",
    startDate: "2024-07-01",
    endDate: "2024-10-01",
    months: 3,
    pricePerMonth: 3200000,
    status: "completed",
  },
]

export const mockPropertyDocuments: OwnerDocument[] = [
  {
    id: "doc_reglamento",
    label: "Reglamento de arrendamiento",
    description: "Normas de convivencia y uso del inmueble que el inquilino debe aceptar.",
    required: true,
    file: null,
  },
  {
    id: "doc_inventario",
    label: "Inventario del inmueble",
    description: "Lista detallada de muebles y electrodomésticos incluidos.",
    required: true,
    file: null,
  },
  {
    id: "doc_seguro",
    label: "Póliza de seguro",
    description: "Seguro de arrendamiento o póliza de cumplimiento (opcional pero recomendado).",
    required: false,
    file: null,
  },
]

// ── SERVICE FUNCTIONS ────────────────────────────────────────────────────────

export async function getOwnerProperties(): Promise<OwnerProperty[]> {
  await new Promise(r => setTimeout(r, 600))
  return mockOwnerProperties
}

export async function getOwnerProperty(id: string): Promise<OwnerProperty | null> {
  await new Promise(r => setTimeout(r, 400))
  return mockOwnerProperties.find(p => p.id === id) ?? null
}

export async function updateProperty(
  id: string,
  data: Partial<Pick<OwnerProperty, "name" | "description" | "price" | "amenities" | "images">>
): Promise<OwnerProperty> {
  await new Promise(r => setTimeout(r, 800))
  const prop = mockOwnerProperties.find(p => p.id === id)!
  return { ...prop, ...data }
}

export async function togglePropertyStatus(
  id: string,
  status: "active" | "paused"
): Promise<void> {
  await new Promise(r => setTimeout(r, 500))
}

export async function deleteProperty(id: string): Promise<void> {
  await new Promise(r => setTimeout(r, 600))
}

export async function updateBlockedDates(
  id: string,
  dates: BlockedDate[]
): Promise<void> {
  await new Promise(r => setTimeout(r, 500))
}

export async function getPropertyContracts(propertyId: string): Promise<OwnerContract[]> {
  await new Promise(r => setTimeout(r, 400))
  return mockOwnerContracts.filter(c => c.propertyId === propertyId)
}

// ── PARA BACKEND REAL ────────────────────────────────────────────────────────
// export async function getOwnerProperties(): Promise<OwnerProperty[]> {
//   const res = await fetch("/api/owner/properties")
//   if (!res.ok) throw new Error("Error al obtener propiedades")
//   return res.json()
// }