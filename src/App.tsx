import { useState } from 'react'
import { ALL_TXN } from './data/mock'
import { Sidebar, Page } from './components/Sidebar'
import { Overview }     from './pages/Overview'
import { Transactions } from './pages/Transactions'
import { Categories }   from './pages/Categories'
import { Trends }       from './pages/Trends'
import { Heatmap }      from './pages/Heatmap'

const PAGE_TITLES: Record<Page, string> = {
  overview:     'Overview',
  transactions: 'Transactions',
  categories:   'Categories',
  trends:       'Trends',
  heatmap:      'Spending Heatmap',
}

export default function App() {
  const [page, setPage] = useState<Page>('overview')

  return (
    <div className="flex min-h-screen">
      <Sidebar active={page} onNav={setPage} />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-5">{PAGE_TITLES[page]}</h1>
        {page === 'overview'     && <Overview     txns={ALL_TXN} />}
        {page === 'transactions' && <Transactions txns={ALL_TXN} />}
        {page === 'categories'   && <Categories   txns={ALL_TXN} />}
        {page === 'trends'       && <Trends       txns={ALL_TXN} />}
        {page === 'heatmap'      && <Heatmap      txns={ALL_TXN} />}
      </main>
    </div>
  )
}
