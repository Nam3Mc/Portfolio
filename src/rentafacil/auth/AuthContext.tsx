"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User } from "@/src/rentafacil/interfaces/User"
import { loginRequest } from "@/src/rentafacil/api/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 Cargar usuario desde localStorage (persistencia)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  // 🔐 LOGIN (simula backend)
  const login = async (email: string, password: string) => {
    const response = await loginRequest(email, password)

    const { user, token } = response as any

    setUser(user)

    // 💾 persistencia
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
  }

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// 🧠 Hook personalizado
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}