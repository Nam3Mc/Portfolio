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
      <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">

        {/* NAVBAR — fixed, h-16 mobile / h-20 desktop */}
        <Navbar />

        {/*
          pt-16 md:pt-20 empuja el contenido exactamente debajo del navbar.
          MisContratosPage y otras páginas full-height deben descontar
          este padding en su propio height calc.
        */}
        <main className="flex-1 flex flex-col pt-16 md:pt-20">
          {children}
        </main>

        <Footer />

      </div>
    </Providers>
  )
}