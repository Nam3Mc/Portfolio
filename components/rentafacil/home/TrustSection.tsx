"use client"

import { ShieldCheck, Wallet, FileText, Scale } from "lucide-react"
import { motion } from "framer-motion"

export default function TrustSection() {
  const items = [
    {
      icon: Wallet,
      title: "Pagos mensuales automatizados",
      description:
        "El arriendo se procesa automáticamente según el contrato, sin fricción ni retrasos.",
    },
    {
      icon: ShieldCheck,
      title: "Escrow durante el contrato",
      description:
        "Los fondos se mantienen protegidos y se liberan conforme se cumplen las condiciones.",
    },
    {
      icon: FileText,
      title: "Contrato digital verificable",
      description:
        "Términos claros, firmados digitalmente y auditables en cualquier momento.",
    },
    {
      icon: Scale,
      title: "Prorrateo justo automático",
      description:
        "Si el contrato termina antes, los pagos se ajustan proporcionalmente sin disputas.",
    },
  ]

  return (
    <section className="w-full bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Seguridad y <span className="text-indigo-600">confianza</span> en cada contrato
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Una infraestructura diseñada para gestionar <span className="font-semibold text-indigo-600">alquileres mensuales</span> 
          con protección total para <span className="font-semibold">propietarios</span> e <span className="font-semibold">inquilinos</span>.
        </p>

        {/* Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-indigo-50">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>

                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}