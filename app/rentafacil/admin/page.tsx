'use client'

import { useEffect, useState } from "react"
import MetricsGrid from "@/components/rentafacil/admin/dashboard/MetricsGrid"
import RecentActivity from "@/components/rentafacil/admin/dashboard/RecentActivity"
import { DashboardMetrics, getDashboardMetrics } from "@/src/rentafacil/services/adminService"

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)

  useEffect(() => {
    getDashboardMetrics().then(setMetrics)
  }, [])

  return (
    <div className="px-4 sm:px-6 py-6 flex flex-col gap-6 max-w-5xl mx-auto w-full">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {new Date().toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* METRICS */}
      {metrics ? (
        <MetricsGrid metrics={metrics} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      {/* ACTIVITY */}
      <RecentActivity />

    </div>
  )
}