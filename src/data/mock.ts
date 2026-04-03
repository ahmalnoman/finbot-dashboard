export type Direction = 'INCOME' | 'EXPENSE'

export interface Transaction {
  id: string
  date: string
  desc: string
  cat: string
  dir: Direction
  amount: number
  currency: string
}

export interface CategoryMeta {
  label: string
  icon: string
  color: string
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  food_drink:    { label: 'Food & Drink',    icon: '🍕', color: '#27AE60' },
  transport:     { label: 'Transport',        icon: '🚗', color: '#2980b9' },
  utilities:     { label: 'Utilities',        icon: '⚡', color: '#f39c12' },
  shopping:      { label: 'Shopping',         icon: '🛍️', color: '#8e44ad' },
  health:        { label: 'Health',           icon: '💊', color: '#e74c3c' },
  entertainment: { label: 'Entertainment',    icon: '🎬', color: '#e67e22' },
  rent:          { label: 'Rent',             icon: '🏠', color: '#16a085' },
  education:     { label: 'Education',        icon: '📚', color: '#e91e8c' },
  salary:        { label: 'Salary',           icon: '💼', color: '#1A6B4A' },
  freelance:     { label: 'Freelance',        icon: '💻', color: '#2c3e50' },
  transfer:      { label: 'Transfer',         icon: '🔄', color: '#7f8c8d' },
  other:         { label: 'Other',            icon: '📦', color: '#95a5a6' },
}

export const ALL_TXN: Transaction[] = [
  // April 2026
  { id: 't1',  date: '2026-04-02', desc: 'Morning coffee',       cat: 'food_drink',    dir: 'EXPENSE', amount: 55,    currency: 'EGP' },
  { id: 't2',  date: '2026-04-02', desc: 'Uber to office',       cat: 'transport',     dir: 'EXPENSE', amount: 85,    currency: 'EGP' },
  { id: 't3',  date: '2026-04-01', desc: 'Monthly salary',       cat: 'salary',        dir: 'INCOME',  amount: 18000, currency: 'EGP' },
  { id: 't4',  date: '2026-04-01', desc: 'April rent',           cat: 'rent',          dir: 'EXPENSE', amount: 4500,  currency: 'EGP' },
  { id: 't5',  date: '2026-04-03', desc: 'Lunch at work',        cat: 'food_drink',    dir: 'EXPENSE', amount: 140,   currency: 'EGP' },
  { id: 't6',  date: '2026-04-03', desc: 'Electricity bill',     cat: 'utilities',     dir: 'EXPENSE', amount: 380,   currency: 'EGP' },
  { id: 't7',  date: '2026-04-04', desc: 'Freelance project',    cat: 'freelance',     dir: 'INCOME',  amount: 4500,  currency: 'EGP' },
  { id: 't8',  date: '2026-04-04', desc: 'Netflix subscription', cat: 'entertainment', dir: 'EXPENSE', amount: 169,   currency: 'EGP' },
  { id: 't9',  date: '2026-04-05', desc: 'Grocery shopping',     cat: 'food_drink',    dir: 'EXPENSE', amount: 920,   currency: 'EGP' },
  { id: 't10', date: '2026-04-06', desc: 'Pharmacy',             cat: 'health',        dir: 'EXPENSE', amount: 235,   currency: 'EGP' },
  { id: 't11', date: '2026-04-07', desc: 'Internet bill',        cat: 'utilities',     dir: 'EXPENSE', amount: 280,   currency: 'EGP' },
  { id: 't12', date: '2026-04-07', desc: 'Dinner with friends',  cat: 'food_drink',    dir: 'EXPENSE', amount: 380,   currency: 'EGP' },
  { id: 't13', date: '2026-04-08', desc: 'Amazon order',         cat: 'shopping',      dir: 'EXPENSE', amount: 650,   currency: 'EGP' },
  { id: 't14', date: '2026-04-09', desc: 'Gym membership',       cat: 'health',        dir: 'EXPENSE', amount: 450,   currency: 'EGP' },
  { id: 't15', date: '2026-04-10', desc: 'Coffee & pastry',      cat: 'food_drink',    dir: 'EXPENSE', amount: 75,    currency: 'EGP' },
  { id: 't16', date: '2026-04-10', desc: 'Petrol',               cat: 'transport',     dir: 'EXPENSE', amount: 620,   currency: 'EGP' },
  { id: 't17', date: '2026-04-11', desc: 'Clothes shopping',     cat: 'shopping',      dir: 'EXPENSE', amount: 1200,  currency: 'EGP' },
  { id: 't18', date: '2026-04-12', desc: 'Cinema tickets',       cat: 'entertainment', dir: 'EXPENSE', amount: 210,   currency: 'EGP' },
  { id: 't19', date: '2026-04-13', desc: 'Phone bill',           cat: 'utilities',     dir: 'EXPENSE', amount: 180,   currency: 'EGP' },
  { id: 't20', date: '2026-04-14', desc: 'Uber Eats delivery',   cat: 'food_drink',    dir: 'EXPENSE', amount: 165,   currency: 'EGP' },
  { id: 't21', date: '2026-04-15', desc: 'Online course',        cat: 'education',     dir: 'EXPENSE', amount: 850,   currency: 'EGP' },
  { id: 't22', date: '2026-04-16', desc: 'Freelance invoice',    cat: 'freelance',     dir: 'INCOME',  amount: 2800,  currency: 'EGP' },
  { id: 't23', date: '2026-04-17', desc: 'Lunch',                cat: 'food_drink',    dir: 'EXPENSE', amount: 110,   currency: 'EGP' },
  { id: 't24', date: '2026-04-18', desc: 'Supermarket',          cat: 'food_drink',    dir: 'EXPENSE', amount: 740,   currency: 'EGP' },
  { id: 't25', date: '2026-04-19', desc: 'Parking',              cat: 'transport',     dir: 'EXPENSE', amount: 40,    currency: 'EGP' },
  { id: 't26', date: '2026-04-20', desc: 'Doctor visit',         cat: 'health',        dir: 'EXPENSE', amount: 400,   currency: 'EGP' },
  { id: 't27', date: '2026-04-21', desc: 'Coffee (Starbucks)',   cat: 'food_drink',    dir: 'EXPENSE', amount: 95,    currency: 'EGP' },
  { id: 't28', date: '2026-04-22', desc: 'Spotify',              cat: 'entertainment', dir: 'EXPENSE', amount: 69,    currency: 'EGP' },
  { id: 't29', date: '2026-04-23', desc: 'Metro card recharge',  cat: 'transport',     dir: 'EXPENSE', amount: 100,   currency: 'EGP' },
  { id: 't30', date: '2026-04-24', desc: 'Restaurant dinner',    cat: 'food_drink',    dir: 'EXPENSE', amount: 450,   currency: 'EGP' },
  // March 2026
  { id: 't31', date: '2026-03-01', desc: 'March salary',         cat: 'salary',        dir: 'INCOME',  amount: 18000, currency: 'EGP' },
  { id: 't32', date: '2026-03-01', desc: 'March rent',           cat: 'rent',          dir: 'EXPENSE', amount: 4500,  currency: 'EGP' },
  { id: 't33', date: '2026-03-03', desc: 'Groceries',            cat: 'food_drink',    dir: 'EXPENSE', amount: 880,   currency: 'EGP' },
  { id: 't34', date: '2026-03-05', desc: 'Electricity',          cat: 'utilities',     dir: 'EXPENSE', amount: 410,   currency: 'EGP' },
  { id: 't35', date: '2026-03-07', desc: 'Freelance work',       cat: 'freelance',     dir: 'INCOME',  amount: 3200,  currency: 'EGP' },
  { id: 't36', date: '2026-03-09', desc: 'Coffee x8 (month)',    cat: 'food_drink',    dir: 'EXPENSE', amount: 440,   currency: 'EGP' },
  { id: 't37', date: '2026-03-12', desc: 'Lunch meals',          cat: 'food_drink',    dir: 'EXPENSE', amount: 620,   currency: 'EGP' },
  { id: 't38', date: '2026-03-14', desc: 'Amazon purchase',      cat: 'shopping',      dir: 'EXPENSE', amount: 480,   currency: 'EGP' },
  { id: 't39', date: '2026-03-17', desc: 'Gym',                  cat: 'health',        dir: 'EXPENSE', amount: 450,   currency: 'EGP' },
  { id: 't40', date: '2026-03-18', desc: 'Transport (Uber)',     cat: 'transport',     dir: 'EXPENSE', amount: 520,   currency: 'EGP' },
  { id: 't41', date: '2026-03-20', desc: 'Netflix + Spotify',    cat: 'entertainment', dir: 'EXPENSE', amount: 238,   currency: 'EGP' },
  { id: 't42', date: '2026-03-22', desc: 'Internet + phone',     cat: 'utilities',     dir: 'EXPENSE', amount: 460,   currency: 'EGP' },
  { id: 't43', date: '2026-03-25', desc: 'Clothes',              cat: 'shopping',      dir: 'EXPENSE', amount: 800,   currency: 'EGP' },
  { id: 't44', date: '2026-03-28', desc: 'Dinner out',           cat: 'food_drink',    dir: 'EXPENSE', amount: 340,   currency: 'EGP' },
  // February 2026
  { id: 't45', date: '2026-02-01', desc: 'Feb salary',           cat: 'salary',        dir: 'INCOME',  amount: 18000, currency: 'EGP' },
  { id: 't46', date: '2026-02-01', desc: 'Feb rent',             cat: 'rent',          dir: 'EXPENSE', amount: 4500,  currency: 'EGP' },
  { id: 't47', date: '2026-02-05', desc: 'Groceries',            cat: 'food_drink',    dir: 'EXPENSE', amount: 950,   currency: 'EGP' },
  { id: 't48', date: '2026-02-08', desc: 'Freelance',            cat: 'freelance',     dir: 'INCOME',  amount: 5000,  currency: 'EGP' },
  { id: 't49', date: '2026-02-10', desc: 'Utilities',            cat: 'utilities',     dir: 'EXPENSE', amount: 720,   currency: 'EGP' },
  { id: 't50', date: '2026-02-14', desc: 'Valentine dinner',     cat: 'food_drink',    dir: 'EXPENSE', amount: 680,   currency: 'EGP' },
  { id: 't51', date: '2026-02-16', desc: 'Shopping',             cat: 'shopping',      dir: 'EXPENSE', amount: 1400,  currency: 'EGP' },
  { id: 't52', date: '2026-02-20', desc: 'Health & gym',         cat: 'health',        dir: 'EXPENSE', amount: 650,   currency: 'EGP' },
  { id: 't53', date: '2026-02-22', desc: 'Transport',            cat: 'transport',     dir: 'EXPENSE', amount: 480,   currency: 'EGP' },
  { id: 't54', date: '2026-02-25', desc: 'Entertainment',        cat: 'entertainment', dir: 'EXPENSE', amount: 380,   currency: 'EGP' },
  // January 2026
  { id: 't55', date: '2026-01-01', desc: 'Jan salary',           cat: 'salary',        dir: 'INCOME',  amount: 18000, currency: 'EGP' },
  { id: 't56', date: '2026-01-01', desc: 'Jan rent',             cat: 'rent',          dir: 'EXPENSE', amount: 4500,  currency: 'EGP' },
  { id: 't57', date: '2026-01-07', desc: 'Groceries',            cat: 'food_drink',    dir: 'EXPENSE', amount: 870,   currency: 'EGP' },
  { id: 't58', date: '2026-01-10', desc: 'Utilities',            cat: 'utilities',     dir: 'EXPENSE', amount: 690,   currency: 'EGP' },
  { id: 't59', date: '2026-01-15', desc: 'Freelance',            cat: 'freelance',     dir: 'INCOME',  amount: 2500,  currency: 'EGP' },
  { id: 't60', date: '2026-01-18', desc: 'Shopping',             cat: 'shopping',      dir: 'EXPENSE', amount: 950,   currency: 'EGP' },
  { id: 't61', date: '2026-01-20', desc: 'Health',               cat: 'health',        dir: 'EXPENSE', amount: 500,   currency: 'EGP' },
  { id: 't62', date: '2026-01-22', desc: 'Transport',            cat: 'transport',     dir: 'EXPENSE', amount: 550,   currency: 'EGP' },
  { id: 't63', date: '2026-01-25', desc: 'Entertainment',        cat: 'entertainment', dir: 'EXPENSE', amount: 290,   currency: 'EGP' },
  { id: 't64', date: '2026-01-28', desc: 'Food & drinks',        cat: 'food_drink',    dir: 'EXPENSE', amount: 820,   currency: 'EGP' },
]

export const fmt = (n: number) => new Intl.NumberFormat('en-EG').format(Math.round(n))
