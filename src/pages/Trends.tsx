import { useMemo } from 'react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts'
import { Transaction } from '../data/mock'
import { CustomTooltip } from '../components/CustomTooltip'

interface Props { txns: Transaction[] }

const MONTH_LABELS: Record<string, string> = {
  '2026-01': 'Jan', '2026-02': 'Feb', '2026-03': 'Mar', '2026-04': 'Apr',
}

export function Trends({ txns }: Props) {
  const { chartData, netData } = useMemo(() => {
    const map: Record<string, { income: number; expenses: number }> = {}
    txns.forEach(t => {
      const key = t.date.slice(0, 7)
      if (!map[key]) map[key] = { income: 0, expenses: 0 }
      if (t.dir === 'INCOME') map[key].income += t.amount
      else map[key].expenses += t.amount
    })

    const padded: Record<string, { income: number; expenses: number }> = {
      '2025-11': { income: 15200, expenses: 10800 },
      '2025-12': { income: 16500, expenses: 12200 },
      ...map,
    }

    const sorted = Object.entries(padded).sort(([a], [b]) => a.localeCompare(b))
    const chartData = sorted.map(([k, v]) => ({
      month: MONTH_LABELS[k] ?? k.slice(5),
      Income:   v.income,
      Expenses: v.expenses,
    }))
    const netData = sorted.map(([k, v]) => ({
      month: MONTH_LABELS[k] ?? k.slice(5),
      Net: v.income - v.expenses,
    }))
    return { chartData, netData }
  }, [txns])

  return (
    <div className="fade-in space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4">Income vs Expenses (6 months)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#27AE60" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#27AE60" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#e74c3c" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#e74c3c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} />
            <Area type="monotone" dataKey="Income"   stroke="#27AE60" fill="url(#gIncome)"  strokeWidth={2} dot={{ r: 4 }} />
            <Area type="monotone" dataKey="Expenses" stroke="#e74c3c" fill="url(#gExpense)" strokeWidth={2} dot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4">Net Balance Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={netData}>
            <defs>
              <linearGradient id="gNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#1A6B4A" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#1A6B4A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#ccc" />
            <Area type="monotone" dataKey="Net" stroke="#1A6B4A" fill="url(#gNet)" strokeWidth={2} dot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
