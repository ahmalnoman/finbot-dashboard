import { fmt } from '../data/mock'

interface Props {
  label: string
  value: string
  sub?: string
  icon: string
  trend?: number
}

export function StatCard({ label, value, sub, icon, trend }: Props) {
  const isPos = (trend ?? 0) >= 0
  return (
    <div className="bg-white rounded-2xl p-5 card-hover shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl">{icon}</div>
        {trend !== undefined && (
          <span className={`chip ${isPos ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {isPos ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-800 leading-tight">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  )
}
