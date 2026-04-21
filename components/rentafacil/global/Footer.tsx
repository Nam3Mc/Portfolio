"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const NAV_SECTIONS = [
  {
    title: "Explorar",
    links: [
      { label: "Buscar propiedades", href: "/rentafacil/explore" },
      { label: "Disponibles ahora", href: "/rentafacil/explore?filter=available" },
      { label: "Próximamente disponibles", href: "/rentafacil/explore?filter=occupied" },
    ],
  },
  {
    title: "Propietarios",
    links: [
      { label: "Mis propiedades", href: "/rentafacil/dashboard" },
      { label: "Contratos activos", href: "/rentafacil/contracts" },
      { label: "Publicar propiedad", href: "/rentafacil/add-property" },
    ],
  },
  {
    title: "Plataforma",
    links: [
      { label: "Cómo funciona", href: "/rentafacil/how-it-works" },
      { label: "Términos", href: "/rentafacil/legal/terms" },
      { label: "Privacidad", href: "/rentafacil/legal/privacy" },
    ],
  },
]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut", delay },
})

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 px-6 py-20">
      <div className="max-w-7xl mx-auto">

        <div className="grid gap-12 md:grid-cols-4">

          {/* BRAND */}
          <motion.div {...fadeUp(0)}>
            <h3 className="text-lg font-semibold text-gray-900">Renta Fácil</h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Plataforma para alquiler de propiedades por meses. <br />
              Transparencia, contratos digitales y pagos seguros.
            </p>
          </motion.div>

          {/* COLUMNAS DINÁMICAS */}
          {NAV_SECTIONS.map((section, i) => (
            <motion.div key={section.title} {...fadeUp((i + 1) * 0.1)}>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="mt-6 space-y-4 text-sm text-gray-600">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>

        {/* BOTTOM */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500"
        >
          <p>© {new Date().getFullYear()} Renta Fácil</p>
          <p className="mt-4 sm:mt-0">Alquiler mensual simplificado</p>
        </motion.div>

      </div>
    </footer>
  )
}