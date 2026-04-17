import { Property, PropertyType } from "../interfaces/Property"
import re
import { RequiredDocument } from "../interfaces/RequiredDocument"

export interface CreatePropertyDto {
  name: string
  description: string
  address: string

  lat: number
  lng: number

  pricePerMonth: number

  images: string[]
  type: PropertyType

  maxGuests: number
  bedrooms: number
  bathrooms: number

  amenities: string[]

  documentsRequired?: RequiredDocument[]

  // opcional
  web3?: {
    tokenized: boolean
  }
}