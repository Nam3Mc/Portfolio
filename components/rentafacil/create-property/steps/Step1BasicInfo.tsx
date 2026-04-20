'use client'

import { validateStep1 } from "@/src/rentafacil/services/propertyService"

interface Props {
  data: { name: string; description: string; address: string }
  onChange: (field: string, value: string) => void
  errors: Record<string, string>
}

export default function Step1BasicInfo({ data, onChange, errors }: Props) {
  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-gray-900">Información básica</h2>
        <p className="text-sm text-gray-500">
          Contanos sobre la propiedad. Esta información será visible para los inquilinos.
        </p>
      </div>

      {/* NOMBRE */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Nombre de la propiedad
        </label>
        <input
          type="text"
          value={data.name}
          onChange={e => onChange("name", e.target.value)}
          placeholder="Ej: Apartamento en Rosales, Piso 8"
          className={`
            w-full px-4 py-3 rounded-xl border text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-shadow
            ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}
          `}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* DESCRIPCIÓN */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          value={data.description}
          onChange={e => onChange("description", e.target.value)}
          placeholder="Describí la propiedad: características, entorno, ventajas..."
          rows={4}
          className={`
            w-full px-4 py-3 rounded-xl border text-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-shadow
            ${errors.description ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}
          `}
        />
        <div className="flex justify-between">
          {errors.description
            ? <p className="text-xs text-red-500">{errors.description}</p>
            : <span />
          }
          <p className="text-xs text-gray-400 ml-auto">{data.description.length} caracteres</p>
        </div>
      </div>

      {/* DIRECCIÓN */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Dirección completa
        </label>
        <input
          type="text"
          value={data.address}
          onChange={e => onChange("address", e.target.value)}
          placeholder="Ej: Calle 85 #15-23, Bogotá, Colombia"
          className={`
            w-full px-4 py-3 rounded-xl border text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-shadow
            ${errors.address ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}
          `}
        />
        {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
      </div>

    </div>
  )
}