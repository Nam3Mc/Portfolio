// src/rentafacil/services/contractService.ts
// ─────────────────────────────────────────────────────────────────────────────
// Mock service — reemplazar las funciones por fetch() cuando el backend esté
// disponible. La interfaz pública (tipos + firmas) no cambia.
// ─────────────────────────────────────────────────────────────────────────────

export interface ContractDetail {
  id: string
  propertyId: string
  status: string
  propertyName: string
  propertyAddress: string
  images: string[]
  months: number
  startDate: string
  endDate: string
  pricePerMonth: number
  total: number
  description: string
  amenities: string[]
}

// ── Types that mirror your mock shapes (adjust to your real interfaces) ──────
interface RawContract {
  id: string
  propertyId: string
  status: string
  startDate: Date
  endDate: Date
  months: number
  pricePerMonth: number
}

interface RawProperty {
  id: string
  name: string
  address: string
  images: string[]
  amenities: string[]
}

// ── Builder ──────────────────────────────────────────────────────────────────
export function buildContractDetail(
  contract: RawContract | undefined,
  properties: RawProperty[]
): ContractDetail | null {
  if (!contract) return null
  const property = properties.find(p => p.id === contract.propertyId)
  if (!property) return null

  return {
    id: contract.id,
    propertyId: contract.propertyId,
    status: contract.status,
    propertyName: property.name,
    propertyAddress: property.address,
    images: property.images,
    months: contract.months,
    startDate: new Date(contract.startDate).toISOString().slice(0, 10),
    endDate: new Date(contract.endDate).toISOString().slice(0, 10),
    pricePerMonth: contract.pricePerMonth,
    total: contract.months * contract.pricePerMonth,
    description: "Contrato de arrendamiento activo con condiciones estándar.",
    amenities: property.amenities,
  }
}

// ── When you have a real API, replace with: ──────────────────────────────────
// export async function fetchContractDetail(contractId: string): Promise<ContractDetail> {
//   const res = await fetch(`/api/contracts/${contractId}`)
//   if (!res.ok) throw new Error("Failed to fetch contract")
//   return res.json()
// }
//
// export async function updateContract(contractId: string, data: { startDate: string; months: number }) {
//   const res = await fetch(`/api/contracts/${contractId}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//   if (!res.ok) throw new Error("Failed to update contract")
//   return res.json()
// }
//
// export async function cancelContract(contractId: string) {
//   const res = await fetch(`/api/contracts/${contractId}/cancel`, { method: "POST" })
//   if (!res.ok) throw new Error("Failed to cancel contract")
// }