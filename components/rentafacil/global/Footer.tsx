"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 px-6 py-20">
      <div className="max-w-7xl mx-auto">

        <div className="grid gap-12 md:grid-cols-4">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900">Renta Fácil</h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Plataforma para alquiler de propiedades por meses. <br />
              Transparencia, contratos digitales y pagos seguros.
            </p>
          </motion.div>

          {/* PRODUCTO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Explorar
            </h4>

            <ul className="mt-6 space-y-4 text-sm text-gray-600">

              <li>
                <Link href="/rentafacil/explore" className="hover:text-indigo-600 transition">
                  Buscar propiedades
                </Link>
              </li>

              <li>
                <Link href="/rentafacil/explore?filter=available" className="hover:text-indigo-600 transition">
                  Disponibles ahora
                </Link>
              </li>

              <li>
                <Link href="/rentafacil/explore?filter=occupied" className="hover:text-indigo-600 transition">
                  Próximamente disponibles
                </Link>
              </li>

            </ul>
          </motion.div>

          {/* PROPIETARIOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Propietarios
            </h4>

            <ul className="mt-6 space-y-4 text-sm text-gray-600">

              <li>
                <Link href="/rentafacil/dashboard" className="hover:text-indigo-600 transition">
                  Mis propiedades
                </Link>
              </li>

              <li>
                <Link href="/rentafacil/contracts" className="hover:text-indigo-600 transition">
                  Contratos activos
                </Link>
              </li>

              <li>
                <Link href="/rentafacil/create-property" className="hover:text-indigo-600 transition">
                  Publicar propiedad
                </Link>
              </li>

            </ul>
          </motion.div>

          {/* LEGAL / INFO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Plataforma
            </h4>

            <ul className="mt-6 space-y-4 text-sm text-gray-600">

              <li>
                <Link href="/rentafacil/how-it-works" className="hover:text-indigo-600 transition">
                  Cómo funciona
                </Link>
              </li>

              <li>
                <Link href="/rentafacil/legal/terms" className="hover:text-indigo-600 transition">
                  Términos
                </Link>
              </li>

              <li>
                <Link href="/rentafacil/legal/privacy" className="hover:text-indigo-600 transition">
                  Privacidad
                </Link>
              </li>

            </ul>
          </motion.div>

        </div>

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500"
        >
          <p>© {new Date().getFullYear()} Renta Fácil</p>
          <p className="mt-4 sm:mt-0">Alquiler mensual simplificado</p>
        </motion.div>

      </div>
    </footer>
  )
}