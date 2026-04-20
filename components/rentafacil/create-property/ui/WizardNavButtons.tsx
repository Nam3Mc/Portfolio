'use client'

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

interface Props {
  step: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  loading?: boolean
  nextLabel?: string
}

export default function WizardNavButtons({
  step,
  totalSteps,
  onBack,
  onNext,
  loading = false,
  nextLabel,
}: Props) {
  const isLast = step === totalSteps - 1
  const label = nextLabel ?? (isLast ? "Publicar propiedad" : "Siguiente")

  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-100">

      {/* BACK */}
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl
          text-sm font-medium transition-colors
          ${step === 0
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
          }
        `}
      >
        <ChevronLeft size={16} />
        Anterior
      </button>

      {/* NEXT / SUBMIT */}
      <button
        type="button"
        onClick={onNext}
        disabled={loading}
        className={`
          flex items-center gap-2
          px-6 py-2.5 rounded-xl
          text-sm font-semibold text-white
          transition-all
          ${isLast
            ? "bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-md"
            : "bg-indigo-600 hover:bg-indigo-700"
          }
          disabled:opacity-60 disabled:cursor-not-allowed
        `}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Publicando...
          </>
        ) : (
          <>
            {label}
            {!isLast && <ChevronRight size={16} />}
          </>
        )}
      </button>

    </div>
  )
}