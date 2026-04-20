'use client'

import { Check } from "lucide-react"

interface Step {
  label: string
  description: string
}

interface Props {
  steps: Step[]
  current: number   // 0-indexed
}

export default function StepIndicator({ steps, current }: Props) {
  return (
    <div className="w-full">

      {/* DESKTOP — horizontal */}
      <div className="hidden sm:flex items-center justify-between relative">

        {/* LINE */}
        <div className="absolute top-5 left-0 right-0 h-px bg-gray-200 z-0" />
        <div
          className="absolute top-5 left-0 h-px bg-indigo-600 z-0 transition-all duration-500"
          style={{ width: `${(current / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, i) => {
          const done = i < current
          const active = i === current

          return (
            <div key={step.label} className="flex flex-col items-center gap-2 z-10">

              {/* CIRCLE */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                text-sm font-semibold border-2 transition-all duration-300
                ${done
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : active
                  ? "bg-white border-indigo-600 text-indigo-600"
                  : "bg-white border-gray-300 text-gray-400"
                }
              `}>
                {done ? <Check size={16} /> : i + 1}
              </div>

              {/* LABEL */}
              <div className="text-center">
                <p className={`text-xs font-semibold ${active ? "text-indigo-600" : done ? "text-gray-700" : "text-gray-400"}`}>
                  {step.label}
                </p>
                <p className="text-[11px] text-gray-400 hidden md:block">{step.description}</p>
              </div>

            </div>
          )
        })}
      </div>

      {/* MOBILE — simple badge */}
      <div className="sm:hidden flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
          {current + 1}
        </div>
        <div>
          <p className="text-xs text-gray-400">Paso {current + 1} de {steps.length}</p>
          <p className="text-sm font-semibold text-gray-900">{steps[current].label}</p>
        </div>
        <div className="ml-auto flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-6 bg-indigo-600" : i < current ? "w-3 bg-indigo-300" : "w-3 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}