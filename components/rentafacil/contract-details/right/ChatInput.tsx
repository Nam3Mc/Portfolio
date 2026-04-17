// 'use client'

// import { useState } from "react"
// import { Send } from "lucide-react"

// interface Props {
//   onSend: (text: string) => void
// }

// export default function ChatInput({ onSend }: Props) {

//   const [text, setText] = useState("")

//   const handleSend = () => {
//     if (!text.trim()) return
//     onSend(text)
//     setText("")
//   }

//   return (
//     <div className="p-3 border-t border-gray-100 bg-white flex gap-2">

//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Escribe un mensaje..."
//         className="
//           flex-1 px-3 py-2 text-sm
//           border border-gray-200 rounded-xl
//           focus:outline-none focus:ring-2 focus:ring-indigo-500
//         "
//       />

//       <button
//         onClick={handleSend}
//         className="
//           px-4 py-2 rounded-xl
//           bg-indigo-600 text-white
//           hover:bg-indigo-700
//           transition
//           flex items-center justify-center
//         "
//       >
//         <Send size={16} />
//       </button>

//     </div>
//   )
// }


'use client'
// ChatInput.tsx — sin padding propio, sin sticky (lo maneja el padre)
 
import { useState } from "react"
import { Send } from "lucide-react"
 
interface Props {
  onSend: (text: string) => void
}
 
export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("")
 
  const handleSend = () => {
    if (!text.trim()) return
    onSend(text.trim())
    setText("")
  }
 
  return (
    <div className="flex items-center gap-2 w-full">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
        placeholder="Escribe un mensaje..."
        className="
          flex-1 px-4 py-3
          text-sm
          border border-gray-200 rounded-full
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition-shadow
        "
      />
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className={`
          flex items-center justify-center
          h-11 w-11 rounded-full
          transition-colors
          ${text.trim()
            ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        <Send size={18} />
      </button>
    </div>
  )
}