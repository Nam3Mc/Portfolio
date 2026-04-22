// src/rentafacil/services/authService.ts

export type UserRole = "guest" | "owner"

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}

export interface AuthResult {
  user: AuthUser
  token: string
}

// ── VALIDADORES ───────────────────────────────────────────────────────────────
export function validateRegister(data: RegisterPayload) {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) errors.name = "El nombre es requerido"
  else if (data.name.trim().length < 2) errors.name = "Mínimo 2 caracteres"

  if (!data.email.trim()) errors.email = "El email es requerido"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Email inválido"

  if (!data.password) errors.password = "La contraseña es requerida"
  else if (data.password.length < 8) errors.password = "Mínimo 8 caracteres"
  else if (!/[A-Z]/.test(data.password)) errors.password = "Debe tener al menos una mayúscula"
  else if (!/[0-9]/.test(data.password)) errors.password = "Debe tener al menos un número"

  if (!data.role) errors.role = "Elegí un rol para continuar"

  return errors
}

// ── MOCK ──────────────────────────────────────────────────────────────────────
export async function registerUser(payload: RegisterPayload): Promise<AuthResult> {
  await new Promise(r => setTimeout(r, 1200))

  // Simula email ya registrado
  if (payload.email === "test@test.com") {
    throw new Error("Este email ya está registrado")
  }

  return {
    user: {
      id: `user_${Date.now()}`,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      createdAt: new Date().toISOString(),
    },
    token: `mock_token_${Math.random().toString(36).slice(2)}`,
  }
}

// ── PARA BACKEND REAL ─────────────────────────────────────────────────────────
// export async function registerUser(payload: RegisterPayload): Promise<AuthResult> {
//   const res = await fetch("/api/auth/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   })
//   if (!res.ok) {
//     const err = await res.json()
//     throw new Error(err.message ?? "Error al registrarse")
//   }
//   return res.json()
// }