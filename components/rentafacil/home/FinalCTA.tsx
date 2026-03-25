"use client"

import { motion } from "framer-motion"
import Link from "next/link"

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
          Encuentra tu próximo hogar <span className="text-indigo-500">sin incertidumbre</span>.
          <br className="hidden md:block" />
          Alquila con <span className="text-indigo-500">fechas claras</span>.
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-gray-300 max-w-2xl mx-auto"
        >
          Visualiza cuándo una propiedad estará disponible, elige cuántos meses deseas alquilar
          y firma un contrato claro desde el inicio.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/rentafacil/list-property"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all duration-300 text-center"
          >
            Publicar mi propiedad
          </Link>

          <Link
            href="/rentafacil/explore"
            className="px-6 py-3 rounded-xl bg-white text-gray-900 font-medium shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 text-center"
          >
            Buscar propiedades
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-xs text-gray-400"
        >
          Sin confusión. Sin fechas inciertas. Todo definido desde el inicio.
        </motion.p>

      </div>
    </section>
  )
}