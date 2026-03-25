"use client"

import { Home, PenTool, Shield, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function HowItWorks() {
  const steps = [
    {
      icon: Home,
      title: "El propietario publica",
      description:
        "Define precio mensual, duración mínima del contrato y condiciones claras de alquiler.",
    },
    {
      icon: PenTool,
      title: "El inquilino solicita",
      description:
        "Consulta disponibilidad real y acepta las condiciones para iniciar el contrato.",
    },
    {
      icon: Shield,
      title: "Contrato + escrow",
      description:
        "El contrato digital bloquea los fondos y asegura el cumplimiento de ambas partes.",
    },
    {
      icon: CheckCircle,
      title: "Ejecución automática",
      description:
        "Los pagos se liberan según el contrato o se ajustan automáticamente en caso de incumplimiento.",
    },
  ]

  return (
    <section id="how-it-works" className="w-full bg-white py-28 px-6">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Cómo <span className="text-indigo-600">funciona</span> Renta-Fácil
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Un sistema basado en <span className="font-semibold text-indigo-600">contratos</span>,
          <span className="font-semibold text-indigo-600"> disponibilidad real</span> y
          <span className="font-semibold text-indigo-600"> protección de pagos</span>.
        </p>

        {/* Steps */}
        <div className="relative mt-20">

          {/* Línea */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gray-200"></div>

          <div className="grid gap-16 lg:grid-cols-4 relative">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 md:p-8 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 border border-indigo-100">
                    <Icon className="w-8 h-8 text-indigo-600" />
                  </div>

                  {/* Step */}
                  <span className="mt-6 text-sm font-medium text-indigo-600">
                    Paso {index + 1}
                  </span>

                  {/* Title */}
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}