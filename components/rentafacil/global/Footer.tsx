"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 px-6 py-20">
      <div className="max-w-7xl mx-auto">

        {/* Grid principal */}
        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900">Renta-Fácil</h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Infraestructura digital para alquiler seguro. <br />
              Contrato vinculante, fondos protegidos y distribución automática.
            </p>
          </motion.div>

          {/* Producto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Producto</h4>
            <ul className="mt-6 space-y-4 text-sm text-gray-600">
              <li>
                <Link href="#how-it-works" className="hover:text-indigo-600 transition">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link href="#owners" className="hover:text-indigo-600 transition">
                  Para propietarios
                </Link>
              </li>
              <li>
                <Link href="/buscar" className="hover:text-indigo-600 transition">
                  Buscar alojamiento
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h4>
            <ul className="mt-6 space-y-4 text-sm text-gray-600">
              <li>
                <Link href="/terminos" className="hover:text-indigo-600 transition">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-indigo-600 transition">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/contrato-digital" className="hover:text-indigo-600 transition">
                  Contrato digital
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contacto</h4>
            <ul className="mt-6 space-y-4 text-sm text-gray-600">
              <li>📧 soporte@rentafacil.com</li>
              <li>💻 Atención remota</li>
              <li>🌎 Latinoamérica</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500"
        >
          <p>© {new Date().getFullYear()} Renta-Fácil. Todos los derechos reservados.</p>
          <p className="mt-4 sm:mt-0">Plataforma de intermediación digital.</p>
        </motion.div>

      </div>
    </footer>
  )
}
