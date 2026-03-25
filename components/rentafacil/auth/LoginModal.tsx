'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, UserPlus, X } from 'lucide-react'

export default function LoginModal({ close }: { close: () => void }) {

  const router = useRouter()

  return (

    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={close}
    >

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white p-8 rounded-2xl w-[420px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ❌ Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        {/* 🧠 Header */}
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Bienvenido 👋
        </h2>

        <p className="text-gray-500 mb-6 text-center text-sm">
          Inicia sesión o crea una cuenta para continuar con tu reserva
        </p>

        {/* 🔥 Actions */}
        <div className="flex flex-col gap-3">

          {/* LOGIN */}
          <button
            onClick={() => router.push('/rentafacil/login')}
            className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition active:scale-[0.98]"
          >
            <Mail size={18} />
            Iniciar sesión
          </button>

          {/* REGISTER */}
          <button
            onClick={() => router.push('/rentafacil/register')}
            className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition active:scale-[0.98]"
          >
            <UserPlus size={18} />
            Crear cuenta
          </button>

        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="text-xs text-gray-400">o</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* 💡 Extra UX */}
        <p className="text-xs text-gray-400 text-center">
          Al continuar aceptas nuestros términos y condiciones
        </p>

      </motion.div>

    </div>
  )
}