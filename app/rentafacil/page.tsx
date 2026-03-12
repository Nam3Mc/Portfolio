import Hero from "@/components/rentafacil/home/Hero"
import TrustSection from "@/components/rentafacil/home/TrustSection"
import HowItWorks from "@/components/rentafacil/home/HowItWorks"
import ForOwners from "@/components/rentafacil/home/ForOwners"
import FinalCTA from "@/components/rentafacil/home/FinalCTA"
import Comparison from "@/components/rentafacil/home/Comparison"
import HeroSearchBar from "@/components/rentafacil/explore/search/HeroSearchBar"

export default function RentaFacilHome() {
  return (
    <>
      <Hero />
      <TrustSection />
      <HowItWorks />
      <ForOwners />
      <FinalCTA />
      < Comparison />
    </>
  )
}
