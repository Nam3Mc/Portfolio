'use client'

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

export default function RightPanel({
  owner,
  messages,
  onSendMessage
}: Props) {

  return (
    <div className="
      w-full h-full flex flex-col
      border-l border-gray-100
      bg-white
      overflow-hidden
    ">

      {/* 👤 HEADER (fixed height) */}
      <div className="shrink-0">
        <OwnerHeader owner={owner} />
      </div>

      {/* 💬 CHAT AREA (scrollable + controlled padding) */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full px-3 py-2">
          <ChatWindow messages={messages} />
        </div>
      </div>

      {/* ✍️ INPUT (compact + safe spacing) */}
      <div className="shrink-0 border-t border-gray-100 bg-white">
        <div className="p-3">
          <ChatInput onSend={onSendMessage} />
        </div>
      </div>

    </div>
  )
}