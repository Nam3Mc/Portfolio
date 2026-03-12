export interface FilterSidebarProps {
  filters: {
    minPrice?: number
    maxPrice?: number
    type?: string
    guests?: number
    amenities?: string[]
    nftOnly?: boolean
    blockchain?: string
  }

  onFilterChange: (filters: any) => void
}