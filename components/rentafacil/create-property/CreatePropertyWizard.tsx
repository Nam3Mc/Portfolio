'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAccount, useSignMessage } from "wagmi"
import { CheckCircle2 } from "lucide-react"

import StepIndicator from "./StepIndicator"
import WizardNavButtons from "./ui/WizardNavButtons"
import Step1BasicInfo from "./steps/Step1BasicInfo"
import Step2Documents from "./steps/Step2Documents"
import Step3Photos from "./steps/Step3Photos"
import Step4Confirm from "./steps/Step4Confirm"

import {
  PropertyDocument,
  createProperty,
  validateStep1,
  validateStep2,
  validateStep3,
} from "@/src/rentafacil/services/propertyService"

// ── STEPS CONFIG ──────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Información", description: "Nombre y ubicación" },
  { label: "Documentos",  description: "Verificación legal" },
  { label: "Fotos",       description: "Mínimo 3 imágenes" },
  { label: "Publicar",    description: "Firma y confirmación" },
]

// ── FORM STATE ────────────────────────────────────────────────────────────────
interface FormState {
  name: string
  description: string
  address: string
  propertyDoc: PropertyDocument | null
  serviceReceipt: PropertyDocument | null
  ownerIdDoc: PropertyDocument | null
  photos: PropertyDocument[]
}

const INITIAL: FormState = {
  name: "",
  description: "",
  address: "",
  propertyDoc: null,
  serviceReceipt: null,
  ownerIdDoc: null,
  photos: [],
}

export default function CreatePropertyWizard() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [txHash, setTxHash] = useState<string>("")

  // ── Field updater ────────────────────────────────────────────────────────
  const set = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => { const e = { ...prev }; delete e[field]; return e })
  }

  // ── Validation per step ──────────────────────────────────────────────────
  const validate = (): boolean => {
    let errs: Record<string, string> = {}

    if (step === 0) errs = validateStep1(form)
    if (step === 1) errs = validateStep2(form)
    if (step === 2) errs = validateStep3({ photos: form.photos })
    if (step === 3 && !isConnected) errs.wallet = "Conectá tu wallet para continuar"

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // ── Navigation ───────────────────────────────────────────────────────────
  const handleNext = async () => {
    if (!validate()) return

    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
      return
    }

    // ── SUBMIT — último paso ─────────────────────────────────────────────
    setLoading(true)
    try {
      // 1. Firma con wallet
      const signature = await signMessageAsync({
        message: `Publicar propiedad: ${form.name}\nDirección: ${form.address}\nTimestamp: ${Date.now()}`,
      })

      // 2. Crea la propiedad (mock → reemplazar con API real)
      const result = await createProperty({
        ...form,
        ownerAddress: address ?? "",
      })

      setTxHash(result.txHash ?? "")
      setDone(true)
    } catch (err: any) {
      // Usuario rechazó la firma o error de red
      setErrors({ submit: err?.message ?? "Error al publicar. Intentá de nuevo." })
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setErrors({})
    setStep(s => Math.max(0, s - 1))
  }

  // ── SUCCESS STATE ────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-gray-900">¡Propiedad enviada!</h2>
          <p className="text-sm text-gray-500 max-w-sm">
            Tu propiedad está <strong>pendiente de verificación</strong>. El equipo revisará
            tus documentos y te notificará cuando sea aprobada.
          </p>
        </div>

        {txHash && (
          <div className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 flex flex-col gap-1 w-full max-w-sm">
            <span className="text-[11px] uppercase tracking-wide text-gray-400">Transacción blockchain</span>
            <span className="text-xs font-mono text-gray-700 break-all">{txHash}</span>
          </div>
        )}

        <button
          onClick={() => router.push("/rentafacil/owner-panel")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Ver mis propiedades
        </button>
      </div>
    )
  }

  // ── WIZARD ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-8">

      {/* STEP INDICATOR */}
      <StepIndicator steps={STEPS} current={step} />

      {/* STEP CONTENT */}
      <div className="min-h-[400px]">
        {step === 0 && (
          <Step1BasicInfo
            data={{ name: form.name, description: form.description, address: form.address }}
            onChange={set}
            errors={errors}
          />
        )}
        {step === 1 && (
          <Step2Documents
            data={{ propertyDoc: form.propertyDoc, serviceReceipt: form.serviceReceipt, ownerIdDoc: form.ownerIdDoc }}
            onChange={set}
            errors={errors}
          />
        )}
        {step === 2 && (
          <Step3Photos
            photos={form.photos}
            onChange={photos => set("photos", photos)}
            error={errors.photos}
          />
        )}
        {step === 3 && (
          <Step4Confirm data={form} />
        )}
      </div>

      {/* ERROR GLOBAL */}
      {errors.submit && (
        <p className="text-sm text-red-500 text-center">{errors.submit}</p>
      )}

      {/* NAV BUTTONS */}
      <WizardNavButtons
        step={step}
        totalSteps={STEPS.length}
        onBack={handleBack}
        onNext={handleNext}
        loading={loading}
      />

    </div>
  )
}