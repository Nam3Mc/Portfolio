// "use client"

// import { ShieldCheck, Wallet, FileText, Scale } from "lucide-react"

// export default function TrustSection() {
//   const items = [
//     {
//       icon: Wallet,
//       title: "Pagos en USDC",
//       description:
//         "Transacciones estables y transparentes con moneda digital segura.",
//     },
//     {
//       icon: ShieldCheck,
//       title: "Escrow Digital",
//       description:
//         "El pago se mantiene protegido hasta que ambas partes cumplan.",
//     },
//     {
//       icon: FileText,
//       title: "Contrato Verificable",
//       description:
//         "Acuerdos registrados digitalmente con validez criptográfica.",
//     },
//     {
//       icon: Scale,
//       title: "Prorrateo Automático",
//       description:
//         "Cálculo justo y automático si el contrato termina antes.",
//     },
//   ]

//   return (
//     <section className="w-full bg-gray-50 py-24 px-6">
//       <div className="max-w-7xl mx-auto text-center">
        
//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
//           Seguridad y confianza integradas
//         </h2>

//         <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//           Diseñamos una infraestructura que protege tanto a propietarios como a inquilinos.
//         </p>

//         {/* Grid */}
//         <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//           {items.map((item, index) => {
//             const Icon = item.icon
//             return (
//               <div
//                 key={index}
//                 className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
//               >
//                 <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-indigo-50">
//                   <Icon className="w-6 h-6 text-indigo-600" />
//                 </div>

//                 <h3 className="mt-6 text-lg font-medium text-gray-900">
//                   {item.title}
//                 </h3>

//                 <p className="mt-3 text-sm text-gray-600 leading-relaxed">
//                   {item.description}
//                 </p>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import { ShieldCheck, Wallet, FileText, Scale } from "lucide-react"
import { motion } from "framer-motion"

export default function TrustSection() {
  const items = [
    {
      icon: Wallet,
      title: "Pagos en USDC",
      description: "Tus pagos son rápidos, seguros y transparentes en USDC.",
    },
    {
      icon: ShieldCheck,
      title: "Escrow Digital",
      description: "El pago se mantiene protegido hasta que ambas partes cumplan.",
    },
    {
      icon: FileText,
      title: "Contrato Verificable",
      description: "Acuerdos digitales con validez criptográfica, fáciles de auditar.",
    },
    {
      icon: Scale,
      title: "Prorrateo Automático",
      description: "Nunca pierdas dinero: el prorrateo se calcula automáticamente.",
    },
  ]

  return (
    <section className="w-full bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Seguridad y <span className="text-indigo-600">confianza</span> integradas
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Diseñamos una infraestructura que protege tanto a <span className="font-semibold">propietarios</span> como a <span className="font-semibold">inquilinos</span>.
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
                className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-indigo-50">
                  <Icon className="w-6 h-6 text-indigo-600" aria-hidden="true" />
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
