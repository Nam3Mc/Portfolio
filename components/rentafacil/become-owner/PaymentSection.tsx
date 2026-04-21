'use client'

import { useState } from "react"
import { Wallet, CreditCard, Shield, Lock } from "lucide-react"
import { useAccount, useSignMessage } from "wagmi"
import { PLANS, PlanId, BillingCycle, PaymentMethod } from "@/src/rentafacil/services/becomeOwnerService"
import WalletConnectButton from "@/components/rentafacil/web3/WalletConnectButton"

interface Props {
  planId: PlanId
  billing: BillingCycle
  onPay: (method: PaymentMethod, txHash?: string) => Promise<void>
  loading: boolean
  error?: string
}

export default function PaymentSection({ planId, billing, onPay, loading, error }: Props) {
  const [method, setMethod] = useState<PaymentMethod>("crypto")
  const [cardData, setCardData] = useState({ number: "", expiry: "", cvv: "", name: "" })
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const plan = PLANS.find(p => p.id === planId)!
  const price = billing === "annual" ? plan.annualPrice * 12 : plan.monthlyPrice
  const billingLabel = billing === "annual" ? "anual" : "mensual"

  const handleCryptoPay = async () => {
    const sig = await signMessageAsync({
      message: `Suscripción RentaFácil ${plan.name} · ${billingLabel} · $${price} USD · ${Date.now()}`,
    })
    await onPay("crypto", sig)
  }

  const handleFiatPay = async () => {
    await onPay("fiat")
  }

  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto w-full">

      <div className="text-center flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-gray-900">Método de pago</h2>
        <p className="text-sm text-gray-500">Elegí cómo querés pagar tu suscripción.</p>
      </div>

      {/* ORDER SUMMARY */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">Plan {plan.name} · {billingLabel}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {billing === "annual" ? `$${plan.annualPrice} USD/mes · facturado anualmente` : `$${price} USD/mes`}
          </p>
        </div>
        <span className="text-lg font-bold text-indigo-600">${price} USD</span>
      </div>

      {/* METHOD SELECTOR */}
      <div className="grid grid-cols-2 gap-3">
        {([
          { id: "crypto", label: "Crypto", sub: "Wallet Web3", icon: Wallet },
          { id: "fiat",   label: "Tarjeta", sub: "Crédito / Débito", icon: CreditCard },
        ] as const).map(({ id, label, sub, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setMethod(id)}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all
              ${method === id
                ? "border-indigo-400 bg-indigo-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-indigo-200"
              }
            `}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method === id ? "bg-indigo-100" : "bg-gray-100"}`}>
              <Icon size={18} className={method === id ? "text-indigo-600" : "text-gray-400"} />
            </div>
            <div className="text-center">
              <p className={`text-sm font-semibold ${method === id ? "text-indigo-600" : "text-gray-700"}`}>{label}</p>
              <p className="text-[11px] text-gray-400">{sub}</p>
            </div>
          </button>
        ))}
      </div>

      {/* CRYPTO PAYMENT */}
      {method === "crypto" && (
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <Wallet size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Conectá tu wallet para firmar la transacción. El pago se procesará en USDC sobre la red seleccionada.
            </p>
          </div>

          {isConnected ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-green-50 border border-green-100">
                <span className="text-xs text-green-700 font-medium">Wallet conectada</span>
                <span className="text-xs font-mono text-gray-500">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </div>
              <button
                onClick={handleCryptoPay}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Procesando...</>
                ) : (
                  `Pagar $${price} USD en crypto`
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs text-gray-500">Primero conectá tu wallet</p>
              <WalletConnectButton />
            </div>
          )}
        </div>
      )}

      {/* FIAT PAYMENT */}
      {method === "fiat" && (
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-700">Nombre en la tarjeta</label>
            <input
              value={cardData.name}
              onChange={e => setCardData(d => ({ ...d, name: e.target.value }))}
              placeholder="Juan Pérez"
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-700">Número de tarjeta</label>
            <input
              value={cardData.number}
              onChange={e => setCardData(d => ({ ...d, number: e.target.value }))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-700">Vencimiento</label>
              <input
                value={cardData.expiry}
                onChange={e => setCardData(d => ({ ...d, expiry: e.target.value }))}
                placeholder="MM/AA"
                maxLength={5}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-700">CVV</label>
              <input
                value={cardData.cvv}
                onChange={e => setCardData(d => ({ ...d, cvv: e.target.value }))}
                placeholder="123"
                maxLength={4}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <button
            onClick={handleFiatPay}
            disabled={loading || !cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name}
            className="w-full h-12 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Procesando...</>
            ) : (
              `Pagar $${price} USD`
            )}
          </button>
        </div>
      )}

      {/* SECURITY BADGES */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {[
          { icon: Lock, label: "Pago encriptado SSL" },
          { icon: Shield, label: "Datos protegidos" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
            <Icon size={12} />
            {label}
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

    </div>
  )
}