// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { useState, ReactNode, Children, isValidElement, cloneElement } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// interface Props {
//   children: ReactNode
//   rightContent?: ReactNode
// }

// export default function NavbarBase({ children, rightContent }: Props) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const closeMenu = () => setIsMenuOpen(false)

//   /* Helper: envuelve los elementos del mobile menu para que cierren el menu al click */
//   const wrapWithClose = (nodes: ReactNode) =>
//     Children.map(nodes, (child, idx) => {
//       if (!isValidElement(child)) return child
//       return cloneElement(child as any, {
//         onClick: () => {
//           closeMenu()
//           if ((child as any).props.onClick) (child as any).props.onClick()
//         },
//         key: idx,
//       })
//     })

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b border-gray-200">
//       <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

//         {/* LOGO */}
//         <Link href="/rentafacil" onClick={closeMenu}>
//           <Image
//             src="/rentafacil/logo.PNG"
//             alt="Renta Fácil"
//             width={200}
//             height={80}
//             className="h-full w-auto object-contain"
//           />
//         </Link>

//         {/* NAV LINKS DESKTOP */}
//         <div className="hidden md:flex items-center gap-8">
//           {children}
//         </div>

//         {/* RIGHT CONTENT DESKTOP */}
//         <div className="hidden md:flex items-center gap-4">
//           {rightContent}
//         </div>

//         {/* MOBILE TOGGLE */}
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="md:hidden text-2xl"
//         >
//           {isMenuOpen ? "✕" : "☰"}
//         </button>
//       </nav>

//       {/* MOBILE MENU */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="md:hidden border-t border-gray-200 bg-white max-h-[90vh] overflow-auto"
//           >
//             <div className="px-6 py-6 space-y-6">

//               {/* NAV LINKS */}
//               <div className="flex flex-col gap-4 text-lg font-medium">
//                 {wrapWithClose(children)}
//               </div>

//               {/* ACTIONS */}
//               {rightContent && (
//                 <div className="flex flex-col gap-3 pt-4 border-t">
//                   {wrapWithClose(rightContent)}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   )
// }

// components/rentafacil/navbar/NavbarBase.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

interface Props {
  children?: ReactNode      // nav links desktop
  rightContent?: ReactNode  // wallet + usermenu + cta
}

export default function NavbarBase({ children, rightContent }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/rentafacil" onClick={close} className="flex items-center">
          <Image
            src="/rentafacil/logo.PNG"
            alt="Renta Fácil"
            width={140}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* DESKTOP — nav links */}
        {children && (
          <div className="hidden md:flex items-center gap-6">
            {children}
          </div>
        )}

        {/* DESKTOP — right */}
        <div className="hidden md:flex items-center gap-3">
          {rightContent}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <div
              className="px-6 py-6 flex flex-col gap-6"
              onClick={e => { if ((e.target as HTMLElement).closest("a")) close() }}
            >
              {children && (
                <div className="flex flex-col gap-3 text-base font-medium">
                  {children}
                </div>
              )}
              {rightContent && (
                <div className="flex flex-col gap-3 pt-4 border-t">
                  {rightContent}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}