"use client"

import { Home, Calendar, FileText } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ForOwners() {

  const benefits = [
    {
      icon: Home,
      title: "Control del estado de tu propiedad",
      description:
        "Define si tu propiedad está ocupada o disponible y muestra cuándo estará libre.",
    },
    {
      icon: Calendar,
      title: "Disponibilidad clara para inquilinos",
      description:
        "Los usuarios pueden ver la fecha exacta en la que podrán mudarse.",
    },
    {
      icon: FileText,
      title: "Contratos por meses",
      description:
        "Establece duración mínima y condiciones desde el inicio del alquiler.",
    },
  ]

  const flowSteps = [
    { label: "Propiedad publicada", status: "✔", highlight: false },
    { label: "Estado: ocupada o disponible", status: "✔", highlight: false },
    { label: "Contrato activo", status: "En curso", highlight: true },
    { label: "Disponible nuevamente", status: "Automático", highlight: false },
  ]

  return (
    <section id="owners" className="w-full bg-gray-50 py-28 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>

          <span className="text-sm font-medium text-indigo-600">
            Para propietarios
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Administra tu propiedad con claridad total
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
            Publica tu propiedad, define su disponibilidad y controla los contratos
            sin procesos manuales ni incertidumbre.
          </p>

          {/* BENEFITS */}
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
                  className="flex gap-4 hover:bg-white/60 p-3 rounded-xl transition"
                >
                  <Icon className="w-6 h-6 text-indigo-600 mt-1" />

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.title}
                    </h4>

                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Link
              href="/rentafacil/list-property"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md transition-all duration-300"
            >
              Publicar mi propiedad
            </Link>
          </div>

        </div>

        {/* RIGHT VISUAL */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 md:p-10">

          <h3 className="text-lg font-semibold text-gray-900">
            Ciclo de la propiedad
          </h3>

          <div className="mt-8 space-y-4 text-sm text-gray-600">

            {flowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-between items-center p-2 rounded-md hover:bg-indigo-50 transition"
              >
                <span>{step.label}</span>

                <span
                  className={`font-medium ${
                    step.highlight ? "text-indigo-600" : "text-gray-900"
                  }`}
                >
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