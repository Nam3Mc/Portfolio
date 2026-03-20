import { Property } from "./Property"
import { User } from "./User"

export interface Owner extends User {
  role: "owner"
  properties: Property[]
}