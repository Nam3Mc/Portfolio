'use client'

import { Shield, Zap, TrendingUp, Globe } from "lucide-react"

const BENEFITS = [
  {
    icon: Shield,
    title: "Contratos seguros",
    desc: "Contratos digitales firmados en blockchain. Sin fraudes, sin letra pequeña.",
  },
  {
    icon: Zap,
    title: "Pagos automáticos",
    desc: "Recibí tus pagos mensualmente sin gestión manual. Todo automatizado.",
  },
  {
    icon: TrendingUp,
    title: "Estadísticas en tiempo real",
    desc: "Controlá ocupación, ingresos y contratos desde un solo panel.",
  },
  {
    icon: Globe,
    title: "Alcance nacional",
    desc: "Tu propiedad visible para miles de inquilinos verificados en Colombia.",
  },
]

interface Props {
  onStart: () => void
}

export default function HeroSection({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center gap-12">

      {/* HERO TEXT */}
      <div className="text-center flex flex-col gap-4 max-w-2xl">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold self-center">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Plataforma verificada · Colombia
        </span>

        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight tracking-tight">
          Publicá tu propiedad.<br />
          <span className="text-indigo-600">Alquilá con seguridad.</span>
        </h1>

        <p className="text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
          RentaFácil es la plataforma de arrendamiento mensual con contratos digitales,
          pagos automatizados y verificación blockchain. Sin intermediarios, sin riesgo.
        </p>

        <button
          onClick={onStart}
          className="
            self-center px-8 py-3.5 rounded-xl
            bg-indigo-600 text-white font-semibold text-sm
            hover:bg-indigo-700 active:scale-[0.98]
            shadow-sm hover:shadow-md
            transition-all duration-200
          "
        >
          Comenzar ahora →
        </button>
      </div>

      {/* BENEFITS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        {BENEFITS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-indigo-100 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SOCIAL PROOF */}
      <div className="flex items-center gap-8 py-4 border-t border-b border-gray-100 w-full max-w-2xl justify-center flex-wrap gap-y-4">
        {[
          { value: "+2.400", label: "propiedades activas" },
          { value: "98%", label: "contratos completados" },
          { value: "48h", label: "tiempo de verificación" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span className="text-xl font-semibold text-indigo-600">{value}</span>
            <span className="text-xs text-gray-400">{label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}