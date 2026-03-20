import { Reservation } from "./Reservation"
import { Review } from "./Review"

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
  location: string

  pricePerNight: number

  images: string[]

  ownerId: string

  type: PropertyType

  maxGuests: number
  bedrooms: number
  bathrooms: number

  amenities: string[]

  available: boolean

  rating?: number

  reviews?: Review[]

  reservations?: Reservation[]
}