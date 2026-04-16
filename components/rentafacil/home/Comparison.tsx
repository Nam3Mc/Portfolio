"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"

const ROWS = [
  {
    id: "payments",
    traditional: "Pagos directos entre partes",
    modern: "Fondos retenidos en escrow hasta cumplimiento",
  },
  {
    id: "contracts",
    traditional: "Acuerdos verbales o informales",
    modern: "Contrato digital firmado por ambas partes",
  },
  {
    id: "deposit",
    traditional: "Depósito retenido sin reglas claras",
    modern: "Condiciones programadas y transparentes",
  },
  {
    id: "conflicts",
    traditional: "Resolución manual de conflictos",
    modern: "Prorrateo automático según reglas definidas",
  },
  {
    id: "risk",
    traditional: "Riesgo de impago o incumplimiento",
    modern: "Liberación condicionada a validación contractual",
  },
]

export default function Comparison() {
  return (
    <section className="w-full bg-white py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900"
          >
            Un modelo más <span className="text-indigo-600">seguro</span> que el alquiler tradicional
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-gray-600"
          >
            Comparación estructural del flujo de pagos y protección contractual.
          </motion.p>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">
                  Modelo tradicional
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-900">
                  Renta Fácil
                </th>
              </tr>
            </thead>

            <tbody>
              {ROWS.map((row, index) => (
                <motion.tr  // ✅ solo anima opacity/y, no afecta layout de tabla
                  key={row.id}
                  initial={{ opacity: 0, y: 8 }}  // ← y en lugar de x, más sutil
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="border-t border-gray-200 hover:bg-indigo-50 transition-colors"
                >
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {row.traditional}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-900 font-medium">
                    {/* ✅ flex en div interno, no en td */}
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" aria-hidden="true" />
                      {row.modern}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  )
}