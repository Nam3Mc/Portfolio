// 'use client'

// import { Circle } from "lucide-react"

// interface Owner {
//   name: string
//   avatar?: string
//   status?: "online" | "offline"
// }

// interface Props {
//   owner: Owner
// }

// export default function OwnerHeader({ owner }: Props) {

//   const isOnline = owner.status === "online"

//   return (
//     <div className="
//       flex items-center justify-between
//       px-3 sm:px-4 py-3
//       border-b border-gray-100
//       bg-white
//     ">

//       {/* 👤 INFO */}
//       <div className="flex items-center gap-3">

//         {/* AVATAR */}
//         <div className="
//           w-11 h-11 sm:w-10 sm:h-10
//           rounded-full
//           bg-gray-200
//           overflow-hidden
//           flex items-center justify-center
//           text-gray-500 font-medium
//         ">
//           {owner.avatar ? (
//             <img
//               src={owner.avatar}
//               className="w-full h-full object-cover"
//               alt={owner.name}
//             />
//           ) : (
//             owner.name.charAt(0).toUpperCase()
//           )}
//         </div>

//         {/* NAME + STATUS */}
//         <div className="flex flex-col leading-tight">
//           <span className="
//             text-sm sm:text-base
//             font-semibold
//             text-gray-900
//           ">
//             {owner.name}
//           </span>

//           <div className="flex items-center gap-1.5 text-xs">
//             <Circle
//               size={8}
//               className={isOnline ? "text-green-500" : "text-gray-300"}
//               fill="currentColor"
//             />

//             <span className={isOnline ? "text-green-600" : "text-gray-400"}>
//               {isOnline ? "En línea" : "Desconectado"}
//             </span>
//           </div>
//         </div>

//       </div>

//     </div>
//   )
// }

'use client'
// OwnerHeader.tsx — img con Next Image recomendado, sin cambios lógicos
import { Circle } from "lucide-react"
 
interface Owner { name: string; avatar?: string; status?: "online" | "offline" }
interface Props { owner: Owner }
 
export default function OwnerHeader({ owner }: Props) {
  const isOnline = owner.status === "online"
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white">
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500 font-medium shrink-0">
        {owner.avatar
          ? <img src={owner.avatar} className="w-full h-full object-cover" alt={owner.name} />
          : owner.name.charAt(0).toUpperCase()
        }
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-gray-900">{owner.name}</span>
        <div className="flex items-center gap-1.5 text-xs">
          <Circle size={8} className={isOnline ? "text-green-500" : "text-gray-300"} fill="currentColor" />
          <span className={isOnline ? "text-green-600" : "text-gray-400"}>
            {isOnline ? "En línea" : "Desconectado"}
          </span>
        </div>
      </div>
    </div>
  )
}