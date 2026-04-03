import { useMemo } from 'react'
import { Transaction, fmt } from '../data/mock'

interface Props { txns: Transaction[] }

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function heatColor(amount: number, max: number): string {
  if (amount === 0) return '#f0f4f2'
  const intensity = Math.min(amount / max, 1)
  if (intensity < 0.25) return '#d5f0e3'
  if (intensity < 0.5)  return '#7ecaac'
  if (intensity < 0.75) return '#27AE60'
  return '#1A6B4A'
}

export function Heatmap({ txns }: Props) {
  const { weeks, max, topDays } = useMemo(() => {
    const dailyMap: Record<string, number> = {}
    txns
      .filter(t => t.dir === 'EXPENSE' && t.date.startsWith('2026'))
      .forEach(t => { dailyMap[t.date] = (dailyMap[t.date] ?? 0) + t.amount })

    const max = Math.max(...Object.values(dailyMap), 1)

    const start = new Date('2026-01-01')
    const end   = new Date('2026-04-30')
    const days: { date: string; amount: number }[] = []
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10)
      days.push({ date: key, amount: dailyMap[key] ?? 0 })
    }

    const firstDow = new Date('2026-01-01').getDay()
    const padded = [...Array(firstDow).fill(null), ...days]
    const weeks: ({ date: string; amount: number } | null)[][] = []
    for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7))

    const topDays = Object.entries(dailyMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    return { weeks, max, topDays }
  }, [txns])

  return (
    <div className="fade-in space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4">Daily Spending Heatmap · Jan–Apr 2026</h3>

        <div className="flex gap-1 mb-1">
          {DAYS.map(d => <div key={d} className="w-8 text-center text-xs text-gray-400">{d}</div>)}
        </div>

        <div className="space-y-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex gap-1">
              {Array(7).fill(null).map((_, di) => {
                const cell = week[di]
                if (!cell) return <div key={di} className="w-8 h-8" />
                return (
                  <div
                    key={di}
                    className="heatmap-cell w-8 h-8 flex items-center justify-center relative group"
                    style={{ background: heatColor(cell.amount, max) }}
                  >
                    {cell.amount > 0 && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity">
                        {cell.date}: {fmt(cell.amount)} EGP
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs text-gray-400">Less</span>
          {['#f0f4f2', '#d5f0e3', '#7ecaac', '#27AE60', '#1A6B4A'].map(c => (
            <div key={c} className="w-4 h-4 rounded" style={{ background: c }} />
          ))}
          <span className="text-xs text-gray-400">More</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-3">Top Spending Days</h3>
        <div className="space-y-2">
          {topDays.map(([date, amount]) => (
            <div key={date} className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-28">{date}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(amount / topDays[0][1]) * 100}%`, background: '#1A6B4A' }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 w-28 text-right">{fmt(amount)} EGP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
