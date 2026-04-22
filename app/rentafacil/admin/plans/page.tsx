'use client'

import { useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { AdminPlan, getPlans, updatePlan, PlanId } from "@/src/rentafacil/services/adminService"

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<AdminPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<PlanId | null>(null)
  const [saved, setSaved] = useState<PlanId | null>(null)

  useEffect(() => { getPlans().then(data => { setPlans(data); setLoading(false) }) }, [])

  const update = (id: PlanId, field: keyof AdminPlan, value: any) =>
    setPlans(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))

  const handleSave = async (plan: AdminPlan) => {
    setSaving(plan.id)
    await updatePlan(plan.id, plan)
    setSaving(null)
    setSaved(plan.id)
    setTimeout(() => setSaved(null), 2000)
  }

  return (
    <div className="px-4 sm:px-6 py-6 flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Gestión de planes</h1>
        <p className="text-sm text-gray-500 mt-0.5">Editá precios, límites y comisiones de cada plan.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-72 rounded-2xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map(plan => (
            <div key={plan.id} className="rounded-2xl border border-gray-100 bg-white overflow-hidden flex flex-col">
              <div className={`px-4 py-3 border-b border-gray-100 flex items-center justify-between ${plan.id === "pro" ? "bg-indigo-50" : ""}`}>
                <div>
                  <p className="text-sm font-bold text-gray-900">{plan.name}</p>
                  {plan.id === "pro" && <p className="text-[11px] text-indigo-500">Más popular</p>}
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs text-gray-500">Activo</span>
                  <div
                    onClick={() => update(plan.id, "active", !plan.active)}
                    className={`w-9 h-5 rounded-full transition-colors cursor-pointer ${plan.active ? "bg-indigo-600" : "bg-gray-200"}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform m-0.5 ${plan.active ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </label>
              </div>

              <div className="p-4 flex flex-col gap-3 flex-1">
                {[
                  { label: "Precio mensual (USD)", field: "monthlyPrice" as keyof AdminPlan, prefix: "$" },
                  { label: "Precio anual (USD/mes)", field: "annualPrice" as keyof AdminPlan, prefix: "$" },
                  { label: "Comisión (%)", field: "commission" as keyof AdminPlan, suffix: "%" },
                  { label: "Máx. propiedades (0 = ilimitado)", field: "maxProperties" as keyof AdminPlan },
                  { label: "Máx. fotos (0 = ilimitado)", field: "maxPhotos" as keyof AdminPlan },
                ].map(({ label, field, prefix, suffix }) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label className="text-[11px] text-gray-500">{label}</label>
                    <div className="relative">
                      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{prefix}</span>}
                      <input
                        type="number"
                        value={plan[field] as number ?? 0}
                        onChange={e => update(plan.id, field, Number(e.target.value) || null)}
                        className={`w-full ${prefix ? "pl-6" : "pl-3"} ${suffix ? "pr-8" : "pr-3"} py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{suffix}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 pb-4">
                <button
                  onClick={() => handleSave(plan)}
                  disabled={saving === plan.id}
                  className={`
                    w-full h-10 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all
                    ${saved === plan.id ? "bg-green-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"}
                    disabled:opacity-60
                  `}
                >
                  {saving === plan.id ? <Loader2 size={13} className="animate-spin" /> : saved === plan.id ? <Check size={13} /> : null}
                  {saving === plan.id ? "Guardando..." : saved === plan.id ? "Guardado" : "Guardar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}