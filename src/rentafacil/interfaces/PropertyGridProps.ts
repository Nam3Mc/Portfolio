import { Property } from "./Property"

export interface PropertyGridProps {
  properties: Property[]
  onSelectProperty: (property: Property) => void
}