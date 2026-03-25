"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"

export default function Comparison() {
  const rows = [
    {
      traditional: "Pagos directos entre partes",
      modern: "Fondos retenidos en escrow hasta cumplimiento",
    },
    {
      traditional: "Acuerdos verbales o informales",
      modern: "Contrato digital firmado por ambas partes",
    },
    {
      traditional: "Depósito retenido sin reglas claras",
      modern: "Condiciones programadas y transparentes",
    },
    {
      traditional: "Resolución manual de conflictos",
      modern: "Prorrateo automático según reglas definidas",
    },
    {
      traditional: "Riesgo de impago o incumplimiento",
      modern: "Liberación condicionada a validación contractual",
    },
  ]

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
                <th className="px-6 py-4 text-sm font-medium text-gray-600">Modelo tradicional</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-900">Renta-Fácil</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-t border-gray-200 hover:bg-indigo-50 transition-all"
                >
                  <td className="px-6 py-5 text-sm text-gray-600">{row.traditional}</td>
                  <td className="px-6 py-5 text-sm text-gray-900 font-medium flex items-start gap-3">
                    <Check className="w-4 h-4 text-indigo-600 mt-1" aria-hidden="true" />
                    {row.modern}
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
