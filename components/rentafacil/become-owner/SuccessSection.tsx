'use client'

import { useRouter } from "next/navigation"
import { CheckCircle2, ArrowRight, Clock, FileText, Star } from "lucide-react"
import { PurchaseResult } from "@/src/rentafacil/services/becomeOwnerService"
import { PLANS } from "@/src/rentafacil/services/becomeOwnerService"

interface Props {
  result: PurchaseResult
}

const NEXT_STEPS = [
  {
    icon: FileText,
    title: "Publicá tu primera propiedad",
    desc: "Completá el formulario con la información básica, fotos y documentos.",
  },
  {
    icon: Clock,
    title: "Esperá la verificación",
    desc: "Nuestro equipo revisará tu propiedad en un plazo de 24 a 72 horas hábiles.",
  },
  {
    icon: Star,
    title: "Empezá a alquilar",
    desc: "Una vez aprobada, tu propiedad será visible para miles de inquilinos.",
  },
]

export default function SuccessSection({ result }: Props) {
  const router = useRouter()
  const plan = PLANS.find(p => p.id === result.planId)!

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto w-full text-center">

      {/* SUCCESS ICON */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">¡Bienvenido a RentaFácil!</h2>
          <p className="text-sm text-gray-500 mt-1">
            Tu suscripción al plan <strong>{plan.name}</strong> fue activada exitosamente.
          </p>
        </div>
      </div>

      {/* ORDER DETAILS */}
      <div className="w-full rounded-2xl border border-gray-100 bg-white overflow-hidden text-left">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Detalles de la orden</p>
        </div>
        <div className="flex flex-col divide-y divide-gray-50">
          {[
            { label: "Orden", value: result.orderId },
            { label: "Plan", value: `${plan.name} · ${result.billing === "annual" ? "Anual" : "Mensual"}` },
            { label: "Monto", value: `$${result.amount} USD` },
            { label: "Método", value: result.method === "crypto" ? "Crypto (Web3)" : "Tarjeta" },
            ...(result.txHash ? [{ label: "Tx Hash", value: `${result.txHash.slice(0, 10)}...${result.txHash.slice(-6)}` }] : []),
            { label: "Activado", value: new Date(result.activatedAt).toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" }) },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center px-4 py-3">
              <span className="text-xs text-gray-400">{label}</span>
              <span className="text-xs font-medium text-gray-700 font-mono">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* NEXT STEPS */}
      <div className="w-full flex flex-col gap-3 text-left">
        <p className="text-sm font-semibold text-gray-700">Próximos pasos</p>
        {NEXT_STEPS.map(({ icon: Icon, title, desc }, i) => (
          <div key={title} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 bg-white">
            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-xs font-bold text-indigo-600">
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => router.push("/rentafacil/add-property")}
        className="
          flex items-center gap-2
          px-8 py-3.5 rounded-xl w-full justify-center
          bg-indigo-600 text-white font-semibold text-sm
          hover:bg-indigo-700 transition-colors shadow-sm
        "
      >
        Publicar mi primera propiedad
        <ArrowRight size={16} />
      </button>

    </div>
  )
}