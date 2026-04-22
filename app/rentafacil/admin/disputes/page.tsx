'use client'

import { useEffect, useState } from "react"
import { Loader2, Scale, ChevronDown, ChevronUp } from "lucide-react"
import {
  AdminDispute, DisputeResolution,
  getDisputes, resolveDispute
} from "@/src/rentafacil/services/adminService"

const STATUS_CFG = {
  open:      { label: "Abierta",     classes: "bg-red-50 text-red-700 border-red-200" },
  in_review: { label: "En revisión", classes: "bg-amber-50 text-amber-700 border-amber-200" },
  resolved:  { label: "Resuelta",    classes: "bg-green-50 text-green-700 border-green-200" },
  closed:    { label: "Cerrada",     classes: "bg-gray-50 text-gray-600 border-gray-200" },
}

const RESOLUTION_CFG: Record<NonNullable<DisputeResolution>, { label: string; classes: string }> = {
  owner_favor: { label: "A favor del owner",     classes: "bg-blue-50 text-blue-700" },
  guest_favor: { label: "A favor del inquilino", classes: "bg-purple-50 text-purple-700" },
  split:       { label: "Prorrateo 50/50",       classes: "bg-gray-50 text-gray-700" },
}

const RESOLUTION_OPTIONS: { value: DisputeResolution; label: string }[] = [
  { value: "owner_favor", label: "A favor del owner" },
  { value: "guest_favor", label: "A favor del inquilino" },
  { value: "split",       label: "Prorrateo 50/50" },
]

const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })

function timeAgo(iso: string) {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000)
  if (h < 24) return `Hace ${h}h`
  return `Hace ${Math.floor(h / 24)} días`
}

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<AdminDispute[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [resolving, setResolving] = useState<string | null>(null)
  const [form, setForm] = useState<{ resolution: DisputeResolution; notes: string }>({ resolution: null, notes: "" })

  useEffect(() => {
    getDisputes().then(data => { setDisputes(data); setLoading(false) })
  }, [])

  const handleResolve = async (id: string) => {
    if (!form.resolution) return
    setResolving(id)
    await resolveDispute(id, form.resolution, form.notes)
    setDisputes(prev => prev.map(d =>
      d.id === id ? { ...d, status: "resolved", resolution: form.resolution } : d
    ))
    setExpanded(null)
    setForm({ resolution: null, notes: "" })
    setResolving(null)
  }

  const open = disputes.filter(d => d.status === "open" || d.status === "in_review")
  const closed = disputes.filter(d => d.status === "resolved" || d.status === "closed")

  return (
    <div className="px-4 sm:px-6 py-6 flex flex-col gap-6 max-w-5xl mx-auto w-full">

      <div>
        <h1 className="text-xl font-semibold text-gray-900">Disputas</h1>
        <p className="text-sm text-gray-500 mt-0.5">{open.length} activa{open.length !== 1 ? "s" : ""} · {closed.length} resueltas</p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">{[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-gray-100 animate-pulse" />)}</div>
      ) : (
        <div className="flex flex-col gap-6">

          {/* OPEN */}
          {open.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">Requieren atención</p>
              {open.map(d => <DisputeCard key={d.id} dispute={d} expanded={expanded === d.id} form={form} resolving={resolving === d.id} onToggle={() => setExpanded(e => e === d.id ? null : d.id)} onFormChange={setForm} onResolve={() => handleResolve(d.id)} />)}
            </div>
          )}

          {/* CLOSED */}
          {closed.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">Historial</p>
              {closed.map(d => <DisputeCard key={d.id} dispute={d} expanded={expanded === d.id} form={form} resolving={false} onToggle={() => setExpanded(e => e === d.id ? null : d.id)} onFormChange={setForm} onResolve={() => {}} />)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function DisputeCard({ dispute, expanded, form, resolving, onToggle, onFormChange, onResolve }: {
  dispute: AdminDispute
  expanded: boolean
  form: { resolution: DisputeResolution; notes: string }
  resolving: boolean
  onToggle: () => void
  onFormChange: (f: { resolution: DisputeResolution; notes: string }) => void
  onResolve: () => void
}) {
  const cfg = STATUS_CFG[dispute.status]
  const canResolve = dispute.status === "open" || dispute.status === "in_review"

  return (
    <div className={`rounded-2xl border bg-white overflow-hidden transition-all ${expanded ? "border-indigo-200 shadow-sm" : "border-gray-100"}`}>
      <button onClick={onToggle} className="w-full text-left flex items-start gap-4 p-4">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
          <Scale size={16} className="text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-gray-900">{dispute.reason}</p>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${cfg.classes}`}>{cfg.label}</span>
            {dispute.resolution && (
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${RESOLUTION_CFG[dispute.resolution].classes}`}>
                {RESOLUTION_CFG[dispute.resolution].label}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{dispute.propertyName} · {timeAgo(dispute.createdAt)}</p>
          <p className="text-xs text-indigo-600 font-medium mt-1">{(dispute.amount / 1000000).toFixed(1)}M COP en disputa</p>
        </div>
        {expanded ? <ChevronUp size={16} className="text-gray-400 shrink-0 mt-1" /> : <ChevronDown size={16} className="text-gray-400 shrink-0 mt-1" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-4 border-t border-gray-100 pt-4">
          {/* PARTIES */}
          <div className="grid grid-cols-2 gap-3">
            {[{ label: "Owner", name: dispute.ownerName }, { label: "Inquilino", name: dispute.guestName }].map(({ label, name }) => (
              <div key={label} className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</span>
                <p className="text-xs font-medium text-gray-900 mt-0.5">{name}</p>
              </div>
            ))}
          </div>

          {/* DESCRIPTION */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-3">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Descripción</span>
            <p className="text-xs text-gray-700 mt-1 leading-relaxed">{dispute.description}</p>
          </div>

          {/* RESOLVE FORM */}
          {canResolve && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-gray-700">Resolución</p>
              <div className="grid grid-cols-3 gap-2">
                {RESOLUTION_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value!}
                    onClick={() => onFormChange({ ...form, resolution: value })}
                    className={`px-2 py-2 rounded-xl border text-xs font-medium transition-colors text-center ${
                      form.resolution === value ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <textarea
                value={form.notes}
                onChange={e => onFormChange({ ...form, notes: e.target.value })}
                placeholder="Notas internas sobre la resolución..."
                rows={2}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={onResolve}
                disabled={!form.resolution || resolving}
                className="self-end flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {resolving && <Loader2 size={13} className="animate-spin" />}
                Resolver disputa
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}