// src/rentafacil/services/propertyService.ts
// ─────────────────────────────────────────────────────────────────────────────
// Tipos + mock service para creación de propiedades.
// Para conectar al backend real, reemplazá createProperty() con fetch().
// ─────────────────────────────────────────────────────────────────────────────

export type PropertyStatus =
  | "pending_verification"
  | "approved"
  | "rejected"
  | "active"

export interface PropertyDocument {
  file: File
  preview: string   // object URL para preview
  name: string
}

export interface CreatePropertyPayload {
  // Step 1 — Info básica
  name: string
  description: string
  address: string

  // Step 2 — Documentos de verificación
  propertyDoc: PropertyDocument | null      // escritura / paz y salvo
  serviceReceipt: PropertyDocument | null   // recibo de luz/agua
  ownerIdDoc: PropertyDocument | null       // cédula del publicador

  // Step 3 — Fotos
  photos: PropertyDocument[]   // mínimo 3

  // Meta
  ownerAddress: string         // wallet address del owner
  status: PropertyStatus
  createdAt: string
}

export interface CreatedProperty extends CreatePropertyPayload {
  id: string
  txHash?: string              // hash de la transacción blockchain
}

// ── MOCK ─────────────────────────────────────────────────────────────────────
// Simula latencia de red y devuelve una propiedad creada con id y txHash mock.
export async function createProperty(
  payload: Omit<CreatePropertyPayload, "status" | "createdAt">
): Promise<CreatedProperty> {
  await new Promise(r => setTimeout(r, 1500)) // simula latencia

  return {
    ...payload,
    id: `prop_${Date.now()}`,
    status: "pending_verification",
    createdAt: new Date().toISOString(),
    txHash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
  }
}

// ── VALIDADORES ───────────────────────────────────────────────────────────────
export function validateStep1(data: Pick<CreatePropertyPayload, "name" | "description" | "address">) {
  const errors: Record<string, string> = {}
  if (!data.name.trim()) errors.name = "El nombre es requerido"
  if (data.name.trim().length < 5) errors.name = "Mínimo 5 caracteres"
  if (!data.description.trim()) errors.description = "La descripción es requerida"
  if (data.description.trim().length < 20) errors.description = "Mínimo 20 caracteres"
  if (!data.address.trim()) errors.address = "La dirección es requerida"
  return errors
}

export function validateStep2(data: Pick<CreatePropertyPayload, "propertyDoc" | "serviceReceipt" | "ownerIdDoc">) {
  const errors: Record<string, string> = {}
  if (!data.propertyDoc) errors.propertyDoc = "El documento de propiedad es requerido"
  if (!data.serviceReceipt) errors.serviceReceipt = "El recibo de servicio es requerido"
  if (!data.ownerIdDoc) errors.ownerIdDoc = "La cédula es requerida"
  return errors
}

export function validateStep3(data: Pick<CreatePropertyPayload, "photos">) {
  const errors: Record<string, string> = {}
  if (data.photos.length < 3) errors.photos = "Se requieren mínimo 3 fotos"
  return errors
}

// ── PARA BACKEND REAL ─────────────────────────────────────────────────────────
// export async function createProperty(payload: FormData): Promise<CreatedProperty> {
//   const res = await fetch("/api/properties", {
//     method: "POST",
//     body: payload,   // FormData para enviar archivos
//   })
//   if (!res.ok) throw new Error("Error al crear la propiedad")
//   return res.json()
// }