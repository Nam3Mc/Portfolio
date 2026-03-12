"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import LoginModal from "../auth/LoginModal"

export default function Hero() {

  const router = useRouter()

  const [mode, setMode] = useState<"owners" | "guests">("owners")
  const [openLogin, setOpenLogin] = useState(false)

  // ⚠️ luego esto vendrá de tu auth context
  const user = null

  const navModes = {
    owners: {
      title: <>Alquila <span className="text-indigo-600">sin riesgos</span>.</>,
      subtitle: "Contrato digital, fondos en custodia y liberación automática según cumplimiento.",
      microcopy: "Recibe pagos seguros automáticamente."
    },
    guests: {
      title: <>Reserva <span className="text-indigo-600">sin incertidumbre</span>.</>,
      subtitle: "Encuentra alojamiento confiable y reserva sin complicaciones.",
      microcopy: "Encuentra alojamiento rápido y seguro."
    }
  }

  const handlePublish = () => {

    if(!user){
      setOpenLogin(true)
      return
    }

    router.push("/rentafacil/owner/publish")

  }

  const handleSearch = () => {
    router.push("/rentafacil/explore")
  }

  return (
    <section className="w-full bg-white pt-24 sm:pt-20 pb-20 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
            {navModes[mode].title}
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            {navModes[mode].subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            {/* PUBLICAR */}
            <button
              onMouseEnter={() => setMode("owners")}
              onClick={handlePublish}
              className={`px-6 py-3 rounded-xl font-medium transition duration-300 ease-in-out cursor-pointer ${
                mode === "owners"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
            >
              Publicar mi propiedad
            </button>

            {/* BUSCAR */}
            <button
              onMouseEnter={() => setMode("guests")}
              onClick={handleSearch}
              className={`px-6 py-3 rounded-xl font-medium transition duration-300 ease-in-out cursor-pointer ${
                mode === "guests"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
            >
              Buscar alojamiento
            </button>

          </div>

          <p className="mt-6 text-sm text-gray-500 font-medium">
            {navModes[mode].microcopy}
          </p>

        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">

          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">

            <AnimatePresence mode="wait">

              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >

                <Image
                  src={
                    mode === "owners"
                      ? "/rentafacil/hero-owner.JPG"
                      : "/rentafacil/hero-guest.jpeg"
                  }
                  alt={mode === "owners" ? "Dashboard propietario" : "Vista huésped"}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover max-h-[400px] sm:max-h-[300px] rounded-2xl"
                  priority={mode === "owners"}
                />

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

      </div>

      {/* LOGIN MODAL */}

      {openLogin && (
        <LoginModal close={() => setOpenLogin(false)} />
      )}

    </section>
  )
}