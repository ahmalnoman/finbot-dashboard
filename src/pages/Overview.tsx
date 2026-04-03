import { useMemo } from 'react'
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import { Transaction, CATEGORY_META, fmt } from '../data/mock'
import { StatCard } from '../components/StatCard'
import { CustomTooltip } from '../components/CustomTooltip'

interface Props { txns: Transaction[] }

export function Overview({ txns }: Props) {
  const { apr, expTrend, donutData, barData, recent } = useMemo(() => {
    const aprilTxns = txns.filter(t => t.date.startsWith('2026-04'))
    const marchTxns = txns.filter(t => t.date.startsWith('2026-03'))

    const sum = (list: Transaction[], dir: string) =>
      list.filter(t => t.dir === dir).reduce((s, t) => s + t.amount, 0)

    const aprIncome   = sum(aprilTxns, 'INCOME')
    const aprExpenses = sum(aprilTxns, 'EXPENSE')
    const marExpenses = sum(marchTxns, 'EXPENSE')
    const aprNet      = aprIncome - aprExpenses
    const aprSavings  = aprIncome > 0 ? ((aprNet / aprIncome) * 100).toFixed(1) : '0'
    const expTrend    = marExpenses > 0 ? Math.round(((aprExpenses - marExpenses) / marExpenses) * 100) : 0

    const catMap: Record<string, number> = {}
    aprilTxns.filter(t => t.dir === 'EXPENSE').forEach(t => {
      catMap[t.cat] = (catMap[t.cat] ?? 0) + t.amount
    })
    const donutData = Object.entries(catMap)
      .map(([k, v]) => ({ name: CATEGORY_META[k]?.label ?? k, value: v, color: CATEGORY_META[k]?.color ?? '#ccc' }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)

    const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
    const mockIncome  = [15200, 16500, 20500, 23000, 21200, aprIncome]
    const mockExpense = [10800, 12200, 11960, 12860, 12138, aprExpenses]
    const barData = months.map((m, i) => ({ month: m, Income: mockIncome[i], Expenses: mockExpense[i] }))

    const recent = [...aprilTxns].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)

    return {
      apr: { income: aprIncome, expenses: aprExpenses, net: aprNet, savings: aprSavings },
      expTrend, donutData, barData, recent,
    }
  }, [txns])

  return (
    <div className="fade-in space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Income"   value={`${fmt(apr.income)} EGP`}   icon="💰" sub="April 2026" trend={8} />
        <StatCard label="Total Expenses" value={`${fmt(apr.expenses)} EGP`} icon="💸" sub="April 2026" trend={-expTrend} />
        <StatCard label="Net Balance"    value={`${fmt(apr.net)} EGP`}      icon="📊" sub="After all expenses" trend={12} />
        <StatCard label="Savings Rate"   value={`${apr.savings}%`}          icon="🎯" sub="Of monthly income" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={2}>
                {donutData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${fmt(v)} EGP`, '']} />
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4">6-Month Overview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} />
              <Bar dataKey="Income"   fill="#27AE60" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expenses" fill="#e74c3c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {recent.map(t => (
            <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-xl">{CATEGORY_META[t.cat]?.icon ?? '📦'}</span>
                <div>
                  <div className="text-sm font-medium text-gray-700">{t.desc}</div>
                  <div className="text-xs text-gray-400">{t.date} · {CATEGORY_META[t.cat]?.label ?? t.cat}</div>
                </div>
              </div>
              <span className={`font-semibold text-sm ${t.dir === 'INCOME' ? 'text-green-600' : 'text-red-500'}`}>
                {t.dir === 'INCOME' ? '+' : '-'}{fmt(t.amount)} EGP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
