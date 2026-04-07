'use client'

interface Props {
  total: number
  pending: number
  approved: number
  rejected: number
}

export default function HeaderSection({
  total,
  pending,
  approved,
  rejected
}: Props) {

  return (
    <div className="flex flex-col gap-6">

      {/* 🧠 Título */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Mis solicitudes
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Gestiona el estado de tus solicitudes de alquiler
        </p>
      </div>

      {/* 📊 Estadísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Total */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500 uppercase">Total</p>
          <p className="text-lg font-semibold text-gray-900">{total}</p>
        </div>
        
        {/* Pendientes */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center shadow-sm">
          <p className="text-xs text-indigo-700 uppercase">Pendientes</p>
          <p className="text-lg font-semibold text-indigo-900">{pending}</p>
        </div>
        
        {/* Aprobadas */}
        <div className="bg-indigo-100 border border-indigo-200 rounded-xl p-4 text-center shadow-sm">
          <p className="text-xs text-indigo-700 uppercase">Aprobadas</p>
          <p className="text-lg font-semibold text-indigo-900">{approved}</p>
        </div>
        
        {/* Rechazadas */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center shadow-sm">
          <p className="text-xs text-indigo-700 uppercase">Rechazadas</p>
          <p className="text-lg font-semibold text-indigo-900">{rejected}</p>
        </div>
        
      </div>
    </div>
  )
}