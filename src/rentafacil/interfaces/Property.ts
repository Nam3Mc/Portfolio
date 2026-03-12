import { Review } from "./Review"

export interface Property {
  id: string
  name: string
  description: string
  location: string
  pricePerNight: number
  images: string[]
  ownerId: string

  type: "apartment" | "house" | "loft" | "penthouse"

  maxGuests: number
  bedrooms: number
  bathrooms: number

  amenities: string[]
  available: boolean

  reviews?: Review[]
}