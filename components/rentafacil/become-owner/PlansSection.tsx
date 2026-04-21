'use client'

import { useState } from "react"
import { Check, X, Zap } from "lucide-react"
import { PLANS, Plan, BillingCycle, PlanId } from "@/src/rentafacil/services/becomeOwnerService"

interface Props {
  selected: PlanId | null
  billing: BillingCycle
  onSelect: (id: PlanId) => void
  onBillingChange: (b: BillingCycle) => void
}

export default function PlansSection({ selected, billing, onSelect, onBillingChange }: Props) {
  return (
    <div className="flex flex-col items-center gap-8 w-full">

      <div className="text-center flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-900">Elegí tu plan</h2>
        <p className="text-sm text-gray-500">Podés cambiar o cancelar en cualquier momento.</p>
      </div>

      {/* BILLING TOGGLE */}
      <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
        {(["monthly", "annual"] as BillingCycle[]).map(cycle => (
          <button
            key={cycle}
            onClick={() => onBillingChange(cycle)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${billing === cycle ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}
            `}
          >
            {cycle === "monthly" ? "Mensual" : "Anual"}
            {cycle === "annual" && (
              <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                -22%
              </span>
            )}
          </button>
        ))}
      </div>

      {/* PLAN CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
        {PLANS.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billing={billing}
            selected={selected === plan.id}
            onSelect={() => onSelect(plan.id)}
          />
        ))}
      </div>

    </div>
  )
}

function PlanCard({
  plan,
  billing,
  selected,
  onSelect,
}: {
  plan: Plan
  billing: BillingCycle
  selected: boolean
  onSelect: () => void
}) {
  const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice

  return (
    <button
      onClick={onSelect}
      className={`
        relative flex flex-col text-left rounded-2xl border overflow-hidden
        transition-all duration-200
        ${plan.featured
          ? selected
            ? "border-indigo-600 shadow-lg shadow-indigo-100 scale-[1.02]"
            : "border-indigo-300 shadow-md shadow-indigo-50 scale-[1.01]"
          : selected
          ? "border-indigo-400 shadow-md"
          : "border-gray-200 hover:border-indigo-200"
        }
        ${selected ? "bg-white" : "bg-white hover:bg-gray-50"}
      `}
    >
      {/* FEATURED BADGE */}
      {plan.featured && (
        <div className="bg-indigo-600 text-white text-[11px] font-semibold text-center py-1.5 flex items-center justify-center gap-1">
          <Zap size={11} />
          Más popular
        </div>
      )}

      {/* SELECTED INDICATOR */}
      {selected && (
        <div className={`absolute top-3 right-3 ${plan.featured ? "top-9" : "top-3"}`}>
          <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
            <Check size={12} className="text-white" />
          </div>
        </div>
      )}

      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* PLAN NAME */}
        <div>
          <p className="text-base font-semibold text-gray-900">{plan.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{plan.tagline}</p>
        </div>

        {/* PRICE */}
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold text-gray-900">${price}</span>
          <span className="text-sm text-gray-400 mb-1">USD/mes</span>
        </div>
        {billing === "annual" && (
          <p className="text-xs text-green-600 font-medium -mt-2">
            ${plan.annualPrice * 12} USD facturado anualmente
          </p>
        )}

        {/* DIVIDER */}
        <div className="h-px bg-gray-100" />

        {/* FEATURES */}
        <ul className="flex flex-col gap-2">
          {plan.features.map(({ label, included }) => (
            <li key={label} className="flex items-start gap-2">
              {included
                ? <Check size={13} className="text-indigo-600 shrink-0 mt-0.5" />
                : <X size={13} className="text-gray-300 shrink-0 mt-0.5" />
              }
              <span className={`text-xs leading-snug ${included ? "text-gray-700" : "text-gray-300"}`}>
                {label}
              </span>
            </li>
          ))}
        </ul>

      </div>

      {/* SELECT BUTTON */}
      <div className={`px-5 pb-5`}>
        <div className={`
          w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-colors
          ${selected
            ? "bg-indigo-600 text-white"
            : plan.featured
            ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
            : "bg-gray-100 text-gray-700"
          }
        `}>
          {selected ? "Plan seleccionado" : "Seleccionar"}
        </div>
      </div>

    </button>
  )
}