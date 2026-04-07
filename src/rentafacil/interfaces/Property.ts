import { Review } from "./Review"
import { Contract } from "./Contract"
import { RequiredDocument } from "./RequiredDocument"

export type PropertyType =
  | "apartment"
  | "house"
  | "loft"
  | "penthouse"
  | "studio"

export type DocumentType = "pdf" | "image" | "any"

export interface Property {
  id: string
  name: string
  description: string

  address: string
  lat: number
  lng: number

  pricePerMonth: number

  images: string[]
  ownerId: string
  type: PropertyType

  maxGuests: number
  bedrooms: number
  bathrooms: number
  amenities: string[]

  isOccupied: boolean
  availableFrom: Date | null

  currentContract?: Contract

  rating?: number
  reviews?: Review[]

  // 🔥 NUEVO
  documentsRequired?: RequiredDocument[]
}