'use client'

import { useRouter } from 'next/navigation'

export default function LoginModal({close}:{close:()=>void}){

  const router = useRouter()

  return(

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-2xl w-[420px]">

        <h2 className="text-xl font-semibold mb-4">
          Inicia sesión
        </h2>

        <p className="text-gray-500 mb-6">
          Debes iniciar sesión para publicar una propiedad
        </p>

        <div className="flex flex-col gap-3">

          <button
            onClick={()=>router.push('/login')}
            className="bg-black text-white py-3 rounded-xl"
          >
            Iniciar sesión
          </button>

          <button
            onClick={()=>router.push('/register')}
            className="border py-3 rounded-xl"
          >
            Crear cuenta
          </button>

          <button
            onClick={close}
            className="text-sm text-gray-500 mt-2"
          >
            Cancelar
          </button>

        </div>

      </div>

    </div>

  )
}