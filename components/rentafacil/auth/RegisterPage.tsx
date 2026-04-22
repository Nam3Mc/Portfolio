

'use client'


import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, Home, Users, CheckCircle2, Shield } from "lucide-react"
import {
  RegisterPayload, UserRole,
  validateRegister, registerUser,
} from "@/src/rentafacil/services/authService"
import { useAuth } from "@/src/rentafacil/auth/AuthContext"


const ROLES: { id: UserRole; label: string; sub: string; icon: typeof Home }[] = [
  {
    id: "guest",
    label: "Soy inquilino",
    sub: "Quiero encontrar y arrendar propiedades",
    icon: Users,
  },
  {
    id: "owner",
    label: "Soy propietario",
    sub: "Quiero publicar y gestionar mis propiedades",
    icon: Home,
  },
]


const STRENGTHS = [
  { label: "8 caracteres mínimo", test: (p: string) => p.length >= 8 },
  { label: "Una mayúscula",        test: (p: string) => /[A-Z]/.test(p) },
  { label: "Un número",            test: (p: string) => /[0-9]/.test(p) },
]


export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()


  const [form, setForm] = useState<RegisterPayload>({
    name: "", email: "", password: "", role: "guest",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [globalError, setGlobalError] = useState("")


  const set = (field: keyof RegisterPayload, value: string) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => { const n = { ...e }; delete n[field]; return n })
    setGlobalError("")
  }


  const handleSubmit = async () => {
    const errs = validateRegister(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }


    setLoading(true)
    setGlobalError("")
    try {
      const { user, token } = await registerUser(form)
      login(user, token)
      // Redirect según rol
      router.push(user.role === "owner" ? "/rentafacil/become-owner" : "/rentafacil/explore")
    } catch (e: any) {
      setGlobalError(e?.message ?? "Error al registrarse. Intentá de nuevo.")
    } finally {
      setLoading(false)
    }
  }


  const passStrength = STRENGTHS.filter(s => s.test(form.password)).length


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col gap-6">


        {/* LOGO */}
        <div className="flex flex-col items-center gap-2">
          <Link href="/rentafacil" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">RentaFácil</span>
          </Link>
          <p className="text-sm text-gray-500 text-center">
            Creá tu cuenta y comenzá a alquilar de forma segura
          </p>
        </div>


        {/* CARD */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col gap-5">


          {/* ROLE SELECTOR */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">¿Cómo vas a usar RentaFácil?</label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map(({ id, label, sub, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => set("role", id)}
                  className={`
                    flex flex-col items-start gap-2 p-3 rounded-xl border text-left
                    transition-all
                    ${form.role === id
                      ? "border-indigo-400 bg-indigo-50 shadow-sm"
                      : "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
                    }
                  `}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${form.role === id ? "bg-indigo-100" : "bg-gray-100"}`}>
                    <Icon size={15} className={form.role === id ? "text-indigo-600" : "text-gray-400"} />
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${form.role === id ? "text-indigo-700" : "text-gray-700"}`}>
                      {label}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{sub}</p>
                  </div>
                </button>
              ))}
            </div>
            {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
          </div>


          {/* DIVIDER */}
          <div className="h-px bg-gray-100" />


          {/* NAME */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              type="text"
              value={form.name}
              onChange={e => set("name", e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="Juan Pérez"
              autoComplete="name"
              className={`
                w-full px-4 py-3 rounded-xl border text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow
                ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}
              `}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>


          {/* EMAIL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => set("email", e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="juan@email.com"
              autoComplete="email"
              className={`
                w-full px-4 py-3 rounded-xl border text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow
                ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}
              `}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>


          {/* PASSWORD */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={e => set("password", e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
                className={`
                  w-full px-4 py-3 pr-12 rounded-xl border text-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow
                  ${errors.password ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>


            {/* PASSWORD STRENGTH */}
            {form.password.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i < passStrength
                          ? passStrength === 1 ? "bg-red-400"
                          : passStrength === 2 ? "bg-amber-400"
                          : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-0.5">
                  {STRENGTHS.map(({ label, test }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <CheckCircle2
                        size={11}
                        className={test(form.password) ? "text-green-500" : "text-gray-300"}
                      />
                      <span className={`text-[11px] ${test(form.password) ? "text-green-600" : "text-gray-400"}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>


          {/* GLOBAL ERROR */}
          {globalError && (
            <div className="px-3 py-2.5 rounded-xl bg-red-50 border border-red-200">
              <p className="text-xs text-red-600">{globalError}</p>
            </div>
          )}


          {/* SUBMIT */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full h-12 rounded-xl
              bg-indigo-600 text-white text-sm font-semibold
              hover:bg-indigo-700 active:scale-[0.98]
              transition-all shadow-sm
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            {loading
              ? <><Loader2 size={16} className="animate-spin" /> Creando cuenta...</>
              : "Crear cuenta"
            }
          </button>


          {/* TERMS NOTE */}
          <p className="text-[11px] text-gray-400 text-center leading-relaxed">
            Al registrarte aceptás los{" "}
            <Link href="/rentafacil/legal/terms" className="text-indigo-500 hover:underline">
              términos de uso
            </Link>{" "}
            y la{" "}
            <Link href="/rentafacil/legal/privacy" className="text-indigo-500 hover:underline">
              política de privacidad
            </Link>{" "}
            de RentaFácil.
          </p>


        </div>


        {/* LOGIN LINK */}
        <p className="text-sm text-gray-500 text-center">
          ¿Ya tenés cuenta?{" "}
          <Link href="/rentafacil/login" className="text-indigo-600 font-medium hover:underline">
            Iniciá sesión
          </Link>
        </p>


      </div>
    </div>
  )
}