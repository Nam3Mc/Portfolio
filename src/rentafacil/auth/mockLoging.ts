import { users } from "@/src/rentafacil/mocks/users"

export function mockLoginAsGuest() {
  return users.find(user => user.role === "guest")
}

export function mockLoginAsOwner() {
  return users.find(user => user.role === "owner")
}