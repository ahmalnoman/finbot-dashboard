interface TooltipPayload {
  name: string
  value: number
  color?: string
  fill?: string
}

interface Props {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
  prefix?: string
}

export function CustomTooltip({ active, payload, label, prefix = 'EGP ' }: Props) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
      {label && <div className="font-semibold text-gray-700 mb-1">{label}</div>}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color ?? p.fill }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-semibold">{prefix}{Math.round(p.value).toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}
