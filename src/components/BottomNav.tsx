import { Page } from './Sidebar'

interface Props {
  active: Page
  onNav: (p: Page) => void
}

const TABS: { id: Page; label: string; icon: string }[] = [
  { id: 'overview',     label: 'Overview',  icon: '📊' },
  { id: 'transactions', label: 'Txns',      icon: '💳' },
  { id: 'categories',   label: 'Categories',icon: '🗂️' },
  { id: 'trends',       label: 'Trends',    icon: '📈' },
  { id: 'heatmap',      label: 'Heatmap',   icon: '🔥' },
]

export function BottomNav({ active, onNav }: Props) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex">
      {TABS.map(t => (
        <button
          key={t.id}
          onClick={() => onNav(t.id)}
          className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium transition-colors ${
            active === t.id ? 'text-brand-600' : 'text-gray-400'
          }`}
        >
          <span className="text-lg leading-none">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
