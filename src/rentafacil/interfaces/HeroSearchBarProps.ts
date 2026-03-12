export interface HeroSearchBarProps {
  onSearch: (params: {
    location?: string
    checkIn?: string
    checkOut?: string
    guests?: number
  }) => void
}