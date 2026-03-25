import { v4 as uuidv4 } from "uuid";
import { User } from "@/src/rentafacil/interfaces/User";

export const users: User[] = [
  {
    id: uuidv4(),
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "owner",
  },
  {
    id: uuidv4(),
    name: "Bob Smith",
    email: "bob@example.com",
    role: "owner",
  },
  {
    id: uuidv4(),
    name: "Carlos Martínez",
    email: "carlos@example.com",
    role: "guest",
  },
  {
    id: uuidv4(),
    name: "Diana Pérez",
    email: "diana@example.com",
    role: "guest",
  },
]

// 🔥 helpers (IMPORTANTES)
export const ownerUsers = users.filter(u => u.role === "owner")
export const guestUsers = users.filter(u => u.role === "guest")