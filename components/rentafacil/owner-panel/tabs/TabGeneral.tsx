'use client'

import { useState } from "react"
import { Check, Loader2, Plus, X } from "lucide-react"
import { OwnerProperty, updateProperty } from "@/src/rentafacil/services/ownerPropertyService"

interface Props {
  property: OwnerProperty
  onUpdate: (data: Partial<OwnerProperty>) => void
}

const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })

export default function TabGeneral({ property, onUpdate }: Props) {
  const [form, setForm] = useState({
    name: property.name,
    description: property.description,
    price: property.price,
    amenities: [...property.amenities],
  })
  const [newAmenity, setNewAmenity] = useState("")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const set = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }))

  const addAmenity = () => {
    const v = newAmenity.trim()
    if (!v || form.amenities.includes(v)) return
    set("amenities", [...form.amenities, v])
    setNewAmenity("")
  }

  const removeAmenity = (item: string) =>
    set("amenities", form.amenities.filter(a => a !== item))

  const handleSave = async () => {
    setLoading(true)
    await updateProperty(property.id, form)
    onUpdate(form)
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

      {/* NOMBRE */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Nombre</label>
        <input
          value={form.name}
          onChange={e => set("name", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
        />
      </div>

      {/* DESCRIPCIÓN */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          value={form.description}
          onChange={e => set("description", e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
        />
        <p className="text-xs text-gray-400 text-right">{form.description.length} caracteres</p>
      </div>

      {/* PRECIO */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Precio mensual (COP)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
          <input
            type="number"
            value={form.price}
            onChange={e => set("price", Number(e.target.value))}
            className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
          />
        </div>
        <p className="text-xs text-indigo-600 font-medium">{formatCOP(form.price)} / mes</p>
      </div>

      {/* AMENIDADES */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Amenidades</label>
        <div className="flex flex-wrap gap-2">
          {form.amenities.map(item => (
            <span key={item} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
              {item}
              <button onClick={() => removeAmenity(item)} className="hover:text-red-500 transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newAmenity}
            onChange={e => setNewAmenity(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addAmenity()}
            placeholder="Agregar amenidad..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
          />
          <button
            onClick={addAmenity}
            className="px-4 py-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        disabled={loading}
        className={`
          flex items-center justify-center gap-2 self-start
          px-6 py-2.5 rounded-xl text-sm font-semibold text-white
          transition-all
          ${saved ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"}
          disabled:opacity-60 disabled:cursor-not-allowed
        `}
      >
        {loading ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : null}
        {loading ? "Guardando..." : saved ? "Guardado" : "Guardar cambios"}
      </button>

    </div>
  )
}