export type Page = 'overview' | 'transactions' | 'categories' | 'trends' | 'heatmap'

interface Props {
  active: Page
  onNav: (p: Page) => void
}

const LINKS: { id: Page; label: string; icon: string }[] = [
  { id: 'overview',     label: 'Overview',     icon: '📊' },
  { id: 'transactions', label: 'Transactions', icon: '💳' },
  { id: 'categories',   label: 'Categories',   icon: '🗂️' },
  { id: 'trends',       label: 'Trends',       icon: '📈' },
  { id: 'heatmap',      label: 'Heatmap',      icon: '🔥' },
]

export function Sidebar({ active, onNav }: Props) {
  return (
    <aside className="hidden md:flex w-56 min-h-screen flex-shrink-0 flex-col" style={{ background: '#1A6B4A' }}>
      <div className="px-6 py-5 border-b border-white/10">
        <div className="text-white font-bold text-xl tracking-tight">💰 FinBot</div>
        <div className="text-white/50 text-xs mt-0.5">Finance Dashboard</div>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {LINKS.map(l => (
          <button
            key={l.id}
            onClick={() => onNav(l.id)}
            className={`sidebar-link w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active === l.id
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <span>{l.icon}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-white/10">
        <div className="text-white/40 text-xs">Mock data · Apr 2026</div>
      </div>
    </aside>
  )
}
