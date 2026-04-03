import { useMemo, useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { Transaction, CATEGORY_META, fmt } from '../data/mock'

interface Props { txns: Transaction[] }

const MONTHS = [
  { value: 'ALL',     label: 'All time' },
  { value: '2026-04', label: 'April 2026' },
  { value: '2026-03', label: 'March 2026' },
  { value: '2026-02', label: 'February 2026' },
  { value: '2026-01', label: 'January 2026' },
]

export function Categories({ txns }: Props) {
  const [month, setMonth] = useState('2026-04')

  const { rows, pieData, total } = useMemo(() => {
    const filtered = txns.filter(t =>
      t.dir === 'EXPENSE' && (month === 'ALL' || t.date.startsWith(month))
    )
    const map: Record<string, number> = {}
    filtered.forEach(t => { map[t.cat] = (map[t.cat] ?? 0) + t.amount })
    const total = Object.values(map).reduce((s, v) => s + v, 0)
    const rows = Object.entries(map)
      .map(([cat, amount]) => ({
        cat, amount,
        pct: total > 0 ? (amount / total * 100).toFixed(1) : '0',
      }))
      .sort((a, b) => b.amount - a.amount)
    const pieData = rows.map(r => ({
      name: CATEGORY_META[r.cat]?.label ?? r.cat,
      value: r.amount,
      color: CATEGORY_META[r.cat]?.color ?? '#ccc',
    }))
    return { rows, pieData, total }
  }, [txns, month])

  return (
    <div className="fade-in space-y-6">
      <div className="flex items-center gap-3">
        <select
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-400 bg-white"
        >
          {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
        </select>
        <span className="text-sm text-gray-400">
          Total expenses: <strong className="text-gray-700">{fmt(total)} EGP</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={110} dataKey="value" paddingAngle={2}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${fmt(v)} EGP`, '']} />
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden self-start">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
            <span>Category</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Share</span>
          </div>
          {rows.map(r => (
            <div key={r.cat} className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 border-t border-gray-50 items-center">
              <div className="flex items-center gap-2">
                <span>{CATEGORY_META[r.cat]?.icon ?? '📦'}</span>
                <span className="text-sm text-gray-700">{CATEGORY_META[r.cat]?.label ?? r.cat}</span>
              </div>
              <span className="text-sm font-semibold text-gray-800 text-right">{fmt(r.amount)} EGP</span>
              <span className="text-xs text-gray-400 text-right w-10">{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
