// 'use client'

// import OwnerHeader from "./right/OwnerHeader"
// import ChatWindow from "./right/ChatWindow"
// import ChatInput from "./right/ChatInput"

// interface Message {
//   id: string
//   sender: "owner" | "user"
//   text: string
//   createdAt: string
// }

// interface Owner {
//   name: string
//   avatar?: string
//   status?: "online" | "offline"
// }

// interface Props {
//   owner: Owner
//   messages: Message[]
//   onSendMessage: (text: string) => void
// }

// export default function RightPanel({
//   owner,
//   messages,
//   onSendMessage
// }: Props) {

//   return (
//     <div className="
//       w-full h-full
//       flex flex-col
//       bg-white
//       overflow-hidden
//       border-l border-gray-100
//     ">

//       {/* 👤 HEADER */}
//       <div className="shrink-0">
//         <OwnerHeader owner={owner} />
//       </div>

//       {/* 💬 CHAT AREA */}
//       <div className="flex-1 overflow-y-auto bg-gray-50">
//         <ChatWindow messages={messages} />
//       </div>

//       {/* ✍️ INPUT */}
//       <div className="
//         shrink-0
//         border-t border-gray-100
//         bg-white
//         pb-safe
//       ">
//         <div className="p-2 sm:p-3">
//           <ChatInput onSend={onSendMessage} />
//         </div>
//       </div>

//     </div>
//   )
// }


'use client'
// RightPanel.tsx — padding de ChatInput centralizado aquí, no duplicado
 
import OwnerHeader from "./right/OwnerHeader"
import ChatWindow from "./right/ChatWindow"
import ChatInput from "./right/ChatInput"
 
interface Message {
  id: string
  sender: "owner" | "user"
  text: string
  createdAt: string
}
 
interface Owner {
  name: string
  avatar?: string
  status?: "online" | "offline"
}
 
interface Props {
  owner: Owner
  messages: Message[]
  onSendMessage: (text: string) => void
}
 
export default function RightPanel({ owner, messages, onSendMessage }: Props) {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden border-l border-gray-100">
 
      {/* HEADER */}
      <div className="shrink-0">
        <OwnerHeader owner={owner} />
      </div>
 
      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <ChatWindow messages={messages} />
      </div>
 
      {/* INPUT — padding aquí, no dentro de ChatInput */}
      <div className="shrink-0 border-t border-gray-100 bg-white p-3">
        <ChatInput onSend={onSendMessage} />
      </div>
 
    </div>
  )
}
 
// ─────────────────────────────────────────────────────────────────────────────