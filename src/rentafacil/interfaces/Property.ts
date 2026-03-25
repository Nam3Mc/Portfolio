import { Review } from "./Review"
import { Contract } from "./Contract"

export type PropertyType =
  | "apartment"
  | "house"
  | "loft"
  | "penthouse"
  | "studio"

export interface Property {
  id: string
  name: string
  description: string

  address: string
  lat: number
  lng: number

  // 🔥 cambio clave (mensual en vez de por noche)
  pricePerMonth: number

  images: string[]
  ownerId: string
  type: PropertyType

  maxGuests: number
  bedrooms: number
  bathrooms: number
  amenities: string[]

  // 🔥 NUEVO MODELO
  isOccupied: boolean
  availableFrom: Date | null

  // 🔥 contrato actual (si existe)
  currentContract?: Contract

  // ⭐ opcional: contratos futuros (escala después)
  // futureContracts?: Contract[]

  rating?: number
  reviews?: Review[]
}