export interface User {
  id: string
  name: string
  email: string
  password?: string // solo para mocks, en real backend no guardamos plaintext
  walletAddress?: string
  role: "guest" | "owner"
}
