"use client"

import { ShieldCheck, FileText, Wallet } from "lucide-react"
import { motion } from "framer-motion"

export default function ForOwners() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Pagos protegidos con escrow",
      description:
        "El dinero se retiene de forma segura hasta que se cumplan las condiciones del contrato.",
    },
    {
      icon: FileText,
      title: "Contrato digital vinculante",
      description:
        "Términos claros aceptados y firmados digitalmente por ambas partes.",
    },
    {
      icon: Wallet,
      title: "Prorrateo automático",
      description:
        "Si el inquilino incumple, los fondos se distribuyen proporcionalmente según reglas definidas.",
    },
  ]

  const flowSteps = [
    { label: "Reserva confirmada", status: "✔", highlight: false },
    { label: "Fondos en escrow", status: "✔", highlight: false },
    { label: "Contrato firmado", status: "✔", highlight: false },
    { label: "Liberación automática", status: "Programada", highlight: true },
  ]

  return (
    <section id="owners" className="w-full bg-gray-50 py-28 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div>
          <span className="text-sm font-medium text-indigo-600">
            Para propietarios
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Control total sobre tu propiedad
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
            Publica tu inmueble con reglas claras, pagos protegidos y
            distribución automática de fondos. Renta-Fácil elimina el riesgo
            de impagos y conflictos manuales.
          </p>

          {/* Benefits */}
          <div className="mt-10 space-y-6">
            {benefits.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 hover:bg-white/50 p-2 rounded-lg transition-all duration-300"
                >
                  <Icon className="w-6 h-6 text-indigo-600 mt-1" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md transition-all duration-300">
              Publicar mi propiedad
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 md:p-10">
          <h3 className="text-lg font-semibold text-gray-900">Flujo protegido</h3>

          <div className="mt-8 space-y-4 text-sm text-gray-600">
            {flowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-between items-center p-2 rounded-md hover:bg-indigo-50 transition-all"
              >
                <span>{step.label}</span>
                <span className={`font-medium ${step.highlight ? "text-indigo-600" : "text-gray-900"}`}>
                  {step.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}