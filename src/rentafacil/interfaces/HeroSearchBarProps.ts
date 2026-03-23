export interface HeroSearchBarProps {
  onSearch: (params: {
    address?: string
    checkIn?: string
    checkOut?: string
    guests?: number
  }) => void
}