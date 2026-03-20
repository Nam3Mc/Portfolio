export type UserRole = "guest" | "owner"

export interface User {
  id: string
  name: string
  email: string
  walletAddress?: string
  role: UserRole
}