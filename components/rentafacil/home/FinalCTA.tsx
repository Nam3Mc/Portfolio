// "use client"

// export default function FinalCTA() {
//   return (
//     <section className="w-full bg-gray-900 py-28 px-6">
//       <div className="max-w-4xl mx-auto text-center">

//         <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
//           Alquila con reglas claras.
//           <br className="hidden md:block" />
//           Cobra con protección automática.
//         </h2>

//         <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
//           Renta-Fácil combina contrato digital, escrow y prorrateo automático
//           para proteger a propietarios e inquilinos.
//         </p>

//         <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

//           <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
//             Publicar mi propiedad
//           </button>

//           <button className="px-6 py-3 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-200 transition">
//             Buscar alojamiento
//           </button>

//         </div>

//         <p className="mt-8 text-xs text-gray-400">
//           Sin pagos directos. Sin acuerdos informales. Todo bajo contrato digital.
//         </p>

//       </div>
//     </section>
//   )
// }


"use client"

import { motion } from "framer-motion"

export default function FinalCTA() {
  return (
    <section className="w-full bg-gray-900 py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-white"
        >
          Alquila con <span className="text-indigo-500">reglas claras</span>.
          <br className="hidden md:block" />
          Cobra con <span className="text-indigo-500">protección automática</span>.
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-gray-300 max-w-2xl mx-auto"
        >
          Renta-Fácil combina contrato digital, escrow y prorrateo automático
          para proteger a <span className="font-semibold text-white">propietarios</span> e <span className="font-semibold text-white">inquilinos</span>.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all duration-300">
            Publicar mi propiedad
          </button>

          <button className="px-6 py-3 rounded-xl bg-white text-gray-900 font-medium shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300">
            Buscar alojamiento
          </button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-xs text-gray-400"
        >
          Sin pagos directos. Sin acuerdos informales. Todo bajo contrato digital.
        </motion.p>
      </div>
    </section>
  )
}
