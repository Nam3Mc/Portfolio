// 'use client'

// import { useEffect, useRef } from "react"

// interface Message {
//   id: string
//   sender: "owner" | "user"
//   text: string
//   createdAt: string
// }

// interface Props {
//   messages: Message[]
// }

// export default function ChatWindow({ messages }: Props) {

//   const bottomRef = useRef<HTMLDivElement | null>(null)

//   // 🔽 AUTO SCROLL
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   return (
//     <div className="
//       h-full
//       overflow-y-auto
//       px-3 sm:px-4 py-4
//       flex flex-col gap-3
//       bg-gray-50
//     ">

//       {messages.map((msg) => {
//         const isUser = msg.sender === "user"

//         return (
//           <div
//             key={msg.id}
//             className={`flex ${isUser ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`
//                 max-w-[85%] sm:max-w-[70%]
//                 px-4 py-2.5
//                 rounded-2xl
//                 text-sm sm:text-base
//                 leading-relaxed
//                 shadow-sm
//                 ${isUser
//                   ? "bg-indigo-600 text-white rounded-br-md"
//                   : "bg-white text-gray-700 border border-gray-200 rounded-bl-md"
//                 }
//               `}
//             >
//               {/* TEXT */}
//               <p className="whitespace-pre-wrap break-words">
//                 {msg.text}
//               </p>

//               {/* TIME */}
//               <div className={`
//                 text-[10px] mt-2
//                 ${isUser ? "text-white/70" : "text-gray-400"}
//                 text-right
//               `}>
//                 {new Date(msg.createdAt).toLocaleTimeString("es-CO", {
//                   hour: "2-digit",
//                   minute: "2-digit"
//                 })}
//               </div>
//             </div>
//           </div>
//         )
//       })}

//       {/* 🔽 SCROLL TARGET */}
//       <div ref={bottomRef} />

//     </div>
//   )
// }


'use client'
// ChatWindow.tsx — sin cambios lógicos
import { useEffect, useRef } from "react"
 
interface Message { id: string; sender: "owner" | "user"; text: string; createdAt: string }
interface Props { messages: Message[] }
 
export default function ChatWindow({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)
 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
 
  return (
    <div className="h-full overflow-y-auto px-3 sm:px-4 py-4 flex flex-col gap-3 bg-gray-50">
      {messages.map(msg => {
        const isUser = msg.sender === "user"
        return (
          <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`
              max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
              ${isUser
                ? "bg-indigo-600 text-white rounded-br-md"
                : "bg-white text-gray-700 border border-gray-200 rounded-bl-md"
              }
            `}>
              <p className="whitespace-pre-wrap break-words">{msg.text}</p>
              <div className={`text-[10px] mt-2 text-right ${isUser ? "text-white/70" : "text-gray-400"}`}>
                {new Date(msg.createdAt).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
 
// ─────────────────────────────────────────────────────────────────────────────