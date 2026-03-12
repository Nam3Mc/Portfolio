import { Property } from "./Property"
import { User } from "./User"

export interface Owner extends User {
  properties: Property[]
}
