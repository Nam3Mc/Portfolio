"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Chrome, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/src/rentafacil/auth/AuthContext"

export default function LoginPage() {

  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [touched, setTouched] = useState({
    email: false,
    password: false
  })

  /* VALIDACIONES */

  const isEmailValid = email.includes("@")
  const isPasswordValid = password.length >= 4

  const isFormValid = isEmailValid && isPasswordValid

  /* SUBMIT */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isFormValid) {
      setError("Revisa los campos")
      return
    }

    try {
      setLoading(true)
      await login(email, password)

      router.push("/rentafacil/explore")

    } catch (err: any) {
      setError(err.message || "Correo o contraseña incorrectos")
    } finally {
      setLoading(false)
    }
  }

  /* DEMO USERS 🔥 */

  const fillDemo = (type: "owner" | "guest") => {
    if (type === "owner") {
      setEmail("alice@example.com")
    } else {
      setEmail("carlos@example.com")
    }
    setPassword("123456")
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google"
  }

  return (

    <div className="min-h-screen grid md:grid-cols-2">
      {/* 🎨 LEFT SIDE PREMIUM */}
      <div className="hidden md:flex relative flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white p-10">

        {/* Glow effect */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>

        {/* HEADER */}
        <div className="relative z-10">
          <h1 className="text-2xl font-semibold tracking-tight">
            Renta Fácil
          </h1>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 space-y-8">

          {/* Title */}
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Alquila sin <span className="text-indigo-200">riesgos</span>
            </h2>

            <p className="mt-4 text-indigo-100 text-sm max-w-sm">
              Contratos digitales, pagos protegidos y automatización total del proceso.
            </p>
          </div>

          {/* FEATURES */}
          <div className="space-y-4 text-sm">

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Escrow automático</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Contrato digital verificable</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Pagos en USDC</span>
            </div>

          </div>

    {/* MOCK CARD UI 🔥 */}
    <div className="relative mt-6">

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl">

        <p className="text-xs text-indigo-200 mb-2">
          Pago protegido
        </p>

        <div className="flex justify-between items-center">
          <span className="text-sm">Contrato activo</span>
          <span className="text-xs bg-green-400/20 text-green-200 px-2 py-1 rounded-full">
            Escrow
          </span>
        </div>

        <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="w-2/3 h-full bg-indigo-300"></div>
        </div>

      </div>

      {/* floating card */}
      <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 p-3 rounded-xl shadow-lg text-xs">
        ✔ Pago asegurado
      </div>

    </div>

  </div>

  {/* FOOTER */}
  <div className="relative z-10 text-xs text-indigo-200">
    © 2026 Renta Fácil
  </div>

</div>

      {/* FORM */}
      <div className="flex items-center justify-center px-4 py-10 bg-gray-50">

        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl">

          <h1 className="text-2xl font-semibold mb-2 text-gray-800">
            Bienvenido 👋
          </h1>

          <p className="text-gray-500 mb-6 text-sm">
            Inicia sesión para continuar
          </p>

          {/* DEMO USERS 🔥 */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => fillDemo("owner")}
              className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200"
            >
              Demo Owner
            </button>
            <button
              onClick={() => fillDemo("guest")}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
            >
              Demo Guest
            </button>
          </div>

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
                onBlur={() => setTouched({ ...touched, email: true })}
                className={`w-full pl-10 pr-3 py-3.5 border rounded-xl focus:outline-none transition
                ${
                  touched.email && !isEmailValid
                    ? "border-red-400 focus:ring-red-400"
                    : "focus:ring-2 focus:ring-indigo-500"
                }`}
              />

              {touched.email && !isEmailValid && (
                <p className="text-xs text-red-500 mt-1">
                  Email inválido
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-4 text-gray-400" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched({ ...touched, password: true })}
                className={`w-full pl-10 pr-10 py-3.5 border rounded-xl focus:outline-none transition
                ${
                  touched.password && !isPasswordValid
                    ? "border-red-400 focus:ring-red-400"
                    : "focus:ring-2 focus:ring-indigo-500"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              {touched.password && !isPasswordValid && (
                <p className="text-xs text-red-500 mt-1">
                  Mínimo 4 caracteres
                </p>
              )}
            </div>

            {/* LOGIN */}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition
              ${
                loading || !isFormValid
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 active:scale-[0.98]"
              }`}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
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
            className="group relative flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-medium border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 active:scale-[0.98] shadow-sm hover:shadow-md"
          >
            {/* Glow hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-indigo-500/5 to-violet-500/5"></div>
                      
            {/* Icon */}
            <div className="relative flex items-center justify-center w-5 h-5">
              <Chrome className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition" />
            </div>
                      
            {/* Text */}
            <span className="relative text-gray-700 group-hover:text-gray-900">
              Continuar con Google
            </span>
                      
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