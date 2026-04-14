'use client'

interface Message {
  id: string
  sender: "owner" | "user"
  text: string
  createdAt: string
}

interface Props {
  messages: Message[]
}

export default function ChatWindow({ messages }: Props) {

  return (
    <div className="h-full overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">

      {messages.map((msg) => {
        const isUser = msg.sender === "user"

        return (
          <div
            key={msg.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`
                max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed
                ${isUser
                  ? "bg-indigo-600 text-white rounded-br-md"
                  : "bg-white text-gray-700 border border-gray-200 rounded-bl-md"
                }
              `}
            >
              {msg.text}

              <div className={`text-[10px] mt-1 opacity-60 ${isUser ? "text-white" : "text-gray-400"}`}>
                {new Date(msg.createdAt).toLocaleTimeString("es-CO", {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}