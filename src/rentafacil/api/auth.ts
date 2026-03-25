import { users } from "../mocks/users"

export const loginRequest = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const user = users.find(u => u.email === email)

      // 🔐 simulación simple
      if (!user || password !== "123456") {
        reject(new Error("Invalid credentials"))
        return
      }

      resolve({
        user,
        token: "fake-jwt-token"
      })

    }, 800) // ⏱️ simula latencia real
  })
}