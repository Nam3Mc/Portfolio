import { Property } from "./Property"

export interface PropertyCardProps {
  property: Property
  onSelect: (property: Property) => void
}