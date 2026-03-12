import { PropertyWeb3 } from "./propertyWeb3"

export interface PropertyDetailModalProps {
  property: PropertyWeb3 | null
  onClose: () => void
}