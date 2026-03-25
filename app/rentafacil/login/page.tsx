"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Chrome, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/src/rentafacil/auth/AuthContext"

export default function LoginPage() {

  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Completa todos los campos")
      return
    }

    try {
      setLoading(true)
      await login(email, password)
      router.push("/")
    } catch {
      setError("Correo o contraseña incorrectos")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google"
  }

  return (

    <div className="min-h-screen grid md:grid-cols-2">

      {/* 🎨 LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-10">

        <h1 className="text-2xl font-semibold">Renta Fácil</h1>

        <div>
          <h2 className="text-3xl font-bold leading-tight">
            Encuentra tu próximo hogar sin complicaciones
          </h2>
          <p className="text-indigo-100 mt-3 text-sm">
            Reserva propiedades de forma rápida, segura y con tecnología Web3
          </p>
        </div>

        <p className="text-xs text-indigo-200">
          © 2026 Renta Fácil
        </p>

      </div>

      {/* 🔐 FORM */}
      <div className="flex items-center justify-center px-4 py-10 bg-gray-50">

        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl">

          <h1 className="text-2xl font-semibold mb-2 text-gray-800">
            Bienvenido 👋
          </h1>

          <p className="text-gray-500 mb-6 text-sm">
            Inicia sesión para continuar
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-3 top-4 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-4 text-gray-400" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* FORGOT */}
            <div className="text-right text-sm">
              <button className="text-gray-500 hover:text-indigo-600">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className={`py-3.5 rounded-xl font-semibold transition ${
                loading
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 active:scale-[0.98]"
              }`}
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-2 my-6">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-xs text-gray-400">o continúa con</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          {/* GOOGLE */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 border py-3.5 rounded-xl font-medium hover:bg-gray-50 transition active:scale-[0.98]"
          >
            <Chrome size={18} />
            Continuar con Google
          </button>

          {/* FOOTER */}
          <p className="text-sm text-center text-gray-500 mt-6">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Crear cuenta
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}