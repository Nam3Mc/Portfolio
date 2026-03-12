// "use client"

// import { Home, PenTool, Shield, CheckCircle } from "lucide-react"

// export default function HowItWorks() {
//   const steps = [
//     {
//       icon: Home,
//       title: "El propietario publica",
//       description:
//         "Define si alquila completo o por habitaciones, establece reglas, depósito y condiciones.",
//     },
//     {
//       icon: PenTool,
//       title: "El huésped reserva",
//       description:
//         "Acepta los términos del arrendamiento y firma digitalmente el contrato.",
//     },
//     {
//       icon: Shield,
//       title: "Pago en escrow",
//       description:
//         "El monto del arriendo y el depósito se retienen de forma segura en el contrato digital.",
//     },
//     {
//       icon: CheckCircle,
//       title: "Liberación automática",
//       description:
//         "Los fondos se distribuyen según cumplimiento o prorrateo automático.",
//     },
//   ]

//   return (
//     <section id="how-it-works" className="w-full bg-white py-28 px-6">
//       <div className="max-w-7xl mx-auto text-center">
        
//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
//           Cómo funciona Renta-Fácil
//         </h2>

//         <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//           Un proceso simple, transparente y diseñado para proteger a ambas partes.
//         </p>

//         {/* Steps */}
//         <div className="relative mt-20">
          
//           {/* Connector line (desktop only) */}
//           <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gray-200"></div>

//           <div className="grid gap-16 lg:grid-cols-4 relative">
//             {steps.map((step, index) => {
//               const Icon = step.icon

//               return (
//                 <div key={index} className="relative flex flex-col items-center text-center">
                  
//                   {/* Circle */}
//                   <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 border border-indigo-100">
//                     <Icon className="w-8 h-8 text-indigo-600" />
//                   </div>

//                   {/* Step number */}
//                   <span className="mt-6 text-sm font-medium text-indigo-600">
//                     Paso {index + 1}
//                   </span>

//                   {/* Title */}
//                   <h3 className="mt-2 text-lg font-semibold text-gray-900">
//                     {step.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-xs">
//                     {step.description}
//                   </p>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import { Home, PenTool, Shield, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function HowItWorks() {
  const steps = [
    {
      icon: Home,
      title: "El propietario publica",
      description:
        "Define reglas claras, depósito seguro y condiciones transparentes para tu propiedad.",
    },
    {
      icon: PenTool,
      title: "El huésped reserva",
      description:
        "Acepta los términos y firma digitalmente de forma segura el contrato.",
    },
    {
      icon: Shield,
      title: "Pago en escrow",
      description:
        "El arriendo y el depósito se mantienen protegidos en el contrato digital.",
    },
    {
      icon: CheckCircle,
      title: "Liberación automática",
      description:
        "Los fondos se liberan automáticamente según cumplimiento o prorrateo justo.",
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
          Un proceso <span className="font-semibold text-indigo-600">simple</span>, <span className="font-semibold text-indigo-600">transparente</span> y diseñado para <span className="font-semibold text-indigo-600">proteger</span> a ambas partes.
        </p>

        {/* Steps */}
        <div className="relative mt-20">

          {/* Connector line (desktop only) */}
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
                  className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 md:p-8 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  {/* Circle + Icon */}
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 border border-indigo-100">
                    <Icon className="w-8 h-8 text-indigo-600" aria-hidden="true" />
                  </div>

                  {/* Step number */}
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
