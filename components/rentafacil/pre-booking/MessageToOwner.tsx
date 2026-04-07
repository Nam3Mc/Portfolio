'use client'

interface Props {
  message: string
  setMessage: (value: string) => void
}

export default function MessageToOwner({ message, setMessage }: Props) {

  const maxLength = 300

  return (
    <div className="
      bg-white border border-gray-100 rounded-2xl shadow-sm
      p-4 sm:p-5 lg:p-6 flex flex-col gap-3
    ">

      {/* 🧠 Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-900">
          Mensaje al propietario
        </h2>
        <p className="text-sm text-gray-500">
          Preséntate brevemente y aumenta tus posibilidades de aprobación
        </p>
      </div>

      {/* ✍️ Textarea */}
      <div className="relative">
        <textarea
          maxLength={maxLength}
          className="
            w-full min-h-[120px]
            border border-gray-200 rounded-xl p-3
            text-sm text-gray-700
            placeholder-gray-400
            resize-none

            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
            transition-all duration-200
          "
          placeholder="Hola, estoy interesado en la propiedad. Trabajo en... tengo ingresos estables y estoy buscando..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 🔢 contador */}
        <div className="absolute bottom-2 right-3 text-xs text-gray-400">
          {message.length}/{maxLength}
        </div>
      </div>

      {/* 💡 Tips UX */}
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs text-gray-500">
        💡 Tip: menciona tu estabilidad laboral y el tiempo que planeas quedarte.
      </div>

    </div>
  )
}