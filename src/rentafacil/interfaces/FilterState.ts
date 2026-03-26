export interface FilterState {
  minPrice?: number
  maxPrice?: number
  type?: string
  guests?: number
  amenities?: string[]
  nftOnly?: boolean
  blockchain?: string
}