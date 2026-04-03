import { useState, useMemo } from 'react'
import { Transaction, CATEGORY_META, fmt } from '../data/mock'

interface Props { txns: Transaction[] }

export function Transactions({ txns }: Props) {
  const [search, setSearch] = useState('')
  const [dirFilter, setDirFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL')
  const [catFilter, setCatFilter] = useState('ALL')

  const categories = useMemo(() => ['ALL', ...Object.keys(CATEGORY_META)], [])

  const filtered = useMemo(() =>
    txns
      .filter(t => dirFilter === 'ALL' || t.dir === dirFilter)
      .filter(t => catFilter === 'ALL' || t.cat === catFilter)
      .filter(t => t.desc.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.date.localeCompare(a.date)),
    [txns, search, dirFilter, catFilter]
  )

  return (
    <div className="fade-in space-y-4">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search transactions…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm flex-1 min-w-48 outline-none focus:border-brand-400"
        />
        <select
          value={dirFilter}
          onChange={e => setDirFilter(e.target.value as 'ALL' | 'INCOME' | 'EXPENSE')}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-400 bg-white"
        >
          <option value="ALL">All directions</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
        <select
          value={catFilter}
          onChange={e => setCatFilter(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-400 bg-white"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c === 'ALL' ? 'All categories' : CATEGORY_META[c]?.label ?? c}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <span>Description</span>
          <span>Category</span>
          <span>Date</span>
          <span className="text-right">Amount</span>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-gray-400 text-sm">No transactions found.</div>
        )}
        {filtered.map(t => (
          <div key={t.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
            {/* Desktop row */}
            <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 items-center">
              <div className="flex items-center gap-2 min-w-0">
                <span>{CATEGORY_META[t.cat]?.icon ?? '📦'}</span>
                <span className="text-sm text-gray-700 truncate">{t.desc}</span>
              </div>
              <span className="text-xs text-gray-400">{CATEGORY_META[t.cat]?.label ?? t.cat}</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">{t.date}</span>
              <span className={`text-sm font-semibold text-right whitespace-nowrap ${t.dir === 'INCOME' ? 'text-green-600' : 'text-red-500'}`}>
                {t.dir === 'INCOME' ? '+' : '-'}{fmt(t.amount)} EGP
              </span>
            </div>
            {/* Mobile card row */}
            <div className="md:hidden flex items-center gap-3 px-4 py-3">
              <span className="text-xl flex-shrink-0">{CATEGORY_META[t.cat]?.icon ?? '📦'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-gray-700 truncate">{t.desc}</span>
                  <span className={`text-sm font-semibold whitespace-nowrap ${t.dir === 'INCOME' ? 'text-green-600' : 'text-red-500'}`}>
                    {t.dir === 'INCOME' ? '+' : '-'}{fmt(t.amount)} EGP
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400">{CATEGORY_META[t.cat]?.label ?? t.cat}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs text-gray-400">{t.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 text-right">{filtered.length} transactions</div>
    </div>
  )
}
