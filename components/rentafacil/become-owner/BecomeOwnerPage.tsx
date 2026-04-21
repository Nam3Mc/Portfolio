'use client'

import { useState } from "react"
import HeroSection from "@/components/rentafacil/become-owner/HeroSection"
import TermsSection from "@/components/rentafacil/become-owner/TermsSection"
import PlansSection from "@/components/rentafacil/become-owner/PlansSection"
import PaymentSection from "@/components/rentafacil/become-owner/PaymentSection"
import SuccessSection from "@/components/rentafacil/become-owner/SuccessSection"
import {
  PlanId,
  BillingCycle,
  PaymentMethod,
  PurchaseResult,
  processPurchase,
} from "@/src/rentafacil/services/becomeOwnerService"

type Step = "hero" | "terms" | "plans" | "payment" | "success"

const STEP_ORDER: Step[] = ["hero", "terms", "plans", "payment", "success"]

const STEP_LABELS: Record<Step, string> = {
  hero: "Inicio",
  terms: "Términos",
  plans: "Plan",
  payment: "Pago",
  success: "Listo",
}

export default function BecomeOwnerPage() {
  const [step, setStep] = useState<Step>("hero")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null)
  const [billing, setBilling] = useState<BillingCycle>("monthly")
  const [loading, setLoading] = useState(false)
  const [payError, setPayError] = useState("")
  const [result, setResult] = useState<PurchaseResult | null>(null)

  const go = (s: Step) => { setStep(s); window.scrollTo({ top: 0, behavior: "smooth" }) }

  const handlePay = async (method: PaymentMethod, txHash?: string) => {
    if (!selectedPlan) return
    setLoading(true)
    setPayError("")
    try {
      const res = await processPurchase({ planId: selectedPlan, billing, method, txHash })
      setResult(res)
      go("success")
    } catch (e: any) {
      setPayError(e?.message ?? "Error al procesar el pago. Intentá de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const stepIndex = STEP_ORDER.indexOf(step)
  const showProgress = step !== "hero" && step !== "success"

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-10">

      {/* PROGRESS INDICATOR */}
      {showProgress && (
        <div className="flex items-center justify-center gap-2">
          {(["terms", "plans", "payment"] as Step[]).map((s, i) => {
            const idx = STEP_ORDER.indexOf(s)
            const current = STEP_ORDER.indexOf(step)
            const done = current > idx
            const active = step === s
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                  ${active ? "bg-indigo-600 text-white" : done ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-400"}
                `}>
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-white" : done ? "bg-indigo-400" : "bg-gray-300"}`} />
                  {STEP_LABELS[s]}
                </div>
                {i < 2 && <div className={`w-6 h-px ${done ? "bg-indigo-300" : "bg-gray-200"}`} />}
              </div>
            )
          })}
        </div>
      )}

      {/* STEP CONTENT */}
      {step === "hero" && (
        <HeroSection onStart={() => go("terms")} />
      )}

      {step === "terms" && (
        <div className="flex flex-col gap-6">
          <TermsSection accepted={termsAccepted} onAccept={setTermsAccepted} />
          <div className="flex justify-center">
            <button
              onClick={() => go("plans")}
              disabled={!termsAccepted}
              className="
                px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold
                hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed
              "
            >
              Continuar a planes →
            </button>
          </div>
        </div>
      )}

      {step === "plans" && (
        <div className="flex flex-col gap-6">
          <PlansSection
            selected={selectedPlan}
            billing={billing}
            onSelect={setSelectedPlan}
            onBillingChange={setBilling}
          />
          <div className="flex justify-center">
            <button
              onClick={() => go("payment")}
              disabled={!selectedPlan}
              className="
                px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold
                hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed
              "
            >
              Continuar al pago →
            </button>
          </div>
        </div>
      )}

      {step === "payment" && selectedPlan && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => go("plans")}
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors self-start"
          >
            ← Cambiar plan
          </button>
          <PaymentSection
            planId={selectedPlan}
            billing={billing}
            onPay={handlePay}
            loading={loading}
            error={payError}
          />
        </div>
      )}

      {step === "success" && result && (
        <SuccessSection result={result} />
      )}

    </div>
  )
}