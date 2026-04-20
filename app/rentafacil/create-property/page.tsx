// app/rentafacil/create-property/page.tsx
import CreatePropertyWizard from "@/components/rentafacil/create-property/CreatePropertyWizard"

export const metadata = {
  title: "Publicar propiedad — RentaFácil",
  description: "Agregá tu propiedad para alquiler mensual.",
}

export default function CreatePropertyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Publicar propiedad</h1>
        <p className="text-sm text-gray-500 mt-1">
          Completá los pasos para enviar tu propiedad a verificación.
        </p>
      </div>

      {/* WIZARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <CreatePropertyWizard />
      </div>

    </div>
  )
}