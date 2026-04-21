'use client'

import { useState } from "react"
import { ChevronDown, ChevronUp, ScrollText, CheckCircle2 } from "lucide-react"

const SUMMARY_POINTS = [
  "El arrendador es responsable de mantener la propiedad en condiciones habitables durante toda la vigencia del contrato.",
  "El canon de arrendamiento no podrá incrementarse más del IPC certificado por el DANE en cada período anual, conforme al Art. 20 de la Ley 820 de 2003.",
  "El arrendador debe respetar el preaviso mínimo de 3 meses para solicitar la restitución del inmueble sin justa causa.",
  "RentaFácil actúa como intermediario tecnológico. Los fondos son custodiados en escrow hasta el cumplimiento de las condiciones contractuales.",
  "El incumplimiento de las obligaciones del arrendador puede derivar en la suspensión de su cuenta y la liberación de garantías al arrendatario.",
  "Toda controversia se resolverá conforme a la legislación colombiana vigente, en particular la Ley 820 de 2003 y el Código Civil.",
]

const FULL_TERMS = `
TÉRMINOS Y CONDICIONES DE USO — ARRENDADORES
RentaFácil Colombia SAS · Versión 2.1 · Enero 2025

1. MARCO LEGAL APLICABLE
El presente contrato se rige por la Ley 820 de 2003 (Ley de Arrendamiento Urbano), el Código Civil Colombiano y demás normas concordantes. Al registrarse como arrendador, el usuario acepta cumplir con todas las disposiciones legales vigentes en materia de arrendamiento en Colombia.

2. OBLIGACIONES DEL ARRENDADOR
2.1 Mantener el inmueble en estado de servir para el uso convenido durante toda la vigencia del contrato.
2.2 Garantizar la disponibilidad del inmueble en las fechas pactadas.
2.3 No aumentar el canon de arrendamiento por encima del IPC certificado por el DANE para el período correspondiente.
2.4 Entregar recibo de pago al arrendatario dentro de los 5 días hábiles siguientes al pago.
2.5 Respetar la intimidad del arrendatario y no ingresar al inmueble sin autorización previa.
2.6 Informar con mínimo 3 meses de antelación la intención de no renovar el contrato sin justa causa.

3. DERECHOS DEL ARRENDADOR
3.1 Recibir el canon de arrendamiento puntualmente en la fecha pactada.
3.2 Solicitar la restitución del inmueble por incumplimiento del arrendatario previa notificación.
3.3 Exigir el depósito de garantía establecido (máximo 1 mes de canon).
3.4 Recuperar el inmueble en el estado en que fue entregado, salvo deterioro normal por uso.

4. SISTEMA DE PAGOS Y ESCROW
4.1 RentaFácil actúa como custodio tecnológico de los fondos mediante contratos inteligentes (smart contracts) en blockchain.
4.2 Los pagos son liberados al arrendador una vez verificado el cumplimiento de las condiciones contractuales.
4.3 En caso de disputa, los fondos permanecen en custodia hasta resolución por el equipo de mediación de RentaFácil.
4.4 RentaFácil cobra una comisión del 5% sobre cada transacción exitosa, descontada automáticamente del pago.

5. VERIFICACIÓN DE PROPIEDADES
5.1 Toda propiedad debe ser verificada por el equipo de RentaFácil antes de ser publicada.
5.2 El proceso de verificación toma entre 24 y 72 horas hábiles.
5.3 El arrendador debe presentar: título de propiedad o poder notarial, recibo de servicio público y documento de identidad.
5.4 RentaFácil se reserva el derecho de rechazar propiedades que no cumplan con los estándares mínimos de habitabilidad.

6. SUSPENSIÓN Y CANCELACIÓN
6.1 El incumplimiento reiterado de las obligaciones puede resultar en la suspensión temporal o definitiva de la cuenta.
6.2 La cancelación de un contrato activo sin justa causa genera una penalidad equivalente a 1 mes de canon.
6.3 En caso de cancelación de la cuenta, los contratos activos deberán completarse o transferirse conforme a las políticas de RentaFácil.

7. PROTECCIÓN DE DATOS
7.1 Los datos personales son tratados conforme a la Ley 1581 de 2012 (Habeas Data) y el Decreto 1377 de 2013.
7.2 RentaFácil no compartirá datos personales con terceros sin autorización expresa, excepto cuando sea requerido por autoridad competente.

8. JURISDICCIÓN
Las partes acuerdan que cualquier controversia derivada del presente acuerdo será resuelta ante los jueces competentes de la ciudad de Bogotá, Colombia, aplicando la legislación colombiana vigente.
`

interface Props {
  accepted: boolean
  onAccept: (v: boolean) => void
}

export default function TermsSection({ accepted, onAccept }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">

      <div className="text-center flex flex-col gap-2">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto">
          <ScrollText size={20} className="text-indigo-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Términos y condiciones</h2>
        <p className="text-sm text-gray-500">
          Adaptados a la Ley 820 de 2003 de arrendamiento urbano en Colombia.
        </p>
      </div>

      {/* RESUMEN */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Puntos clave</p>
        </div>
        <div className="flex flex-col divide-y divide-gray-50">
          {SUMMARY_POINTS.map((point, i) => (
            <div key={i} className="flex items-start gap-3 px-5 py-3.5">
              <CheckCircle2 size={15} className="text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FULL TERMS TOGGLE */}
      <div className="rounded-2xl border border-gray-100 overflow-hidden">
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
        >
          Ver términos completos
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded && (
          <div className="px-5 py-4 max-h-72 overflow-y-auto">
            <pre className="text-xs text-gray-500 whitespace-pre-wrap leading-relaxed font-sans">
              {FULL_TERMS.trim()}
            </pre>
          </div>
        )}
      </div>

      {/* ACCEPT CHECKBOX */}
      <label className={`
        flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all
        ${accepted ? "border-indigo-200 bg-indigo-50" : "border-gray-200 bg-white hover:border-indigo-200"}
      `}>
        <input
          type="checkbox"
          checked={accepted}
          onChange={e => onAccept(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-indigo-600 shrink-0"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">
            Acepto los términos y condiciones
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            He leído y acepto los términos de uso, la política de privacidad y las condiciones
            de arrendamiento de RentaFácil Colombia, incluyendo las disposiciones de la Ley 820 de 2003.
          </p>
        </div>
      </label>

    </div>
  )
}