// app/rentafacil/layout.tsx
import Navbar from "@/components/rentafacil/navbar/Navbar"
import Footer from "@/components/rentafacil/global/Footer"
import Providers from "@/components/rentafacil/global/Providers"

interface Props {
  children: React.ReactNode
}

export const metadata = {
  title: "RentaFácil",
  description: "Alquila lo que necesitas, fácil y seguro.",
}

export default function RentaFacilLayout({ children }: Props) {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col bg-white">

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </div>
    </Providers>
  )
}