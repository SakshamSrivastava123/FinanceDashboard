export const CATEGORIES = {
  Food:          { color: '#fb923c', emoji: '🍜' },
  Transport:     { color: '#60a5fa', emoji: '🚇' },
  Shopping:      { color: '#f472b6', emoji: '🛍️' },
  Entertainment: { color: '#a78bfa', emoji: '🎬' },
  Healthcare:    { color: '#4ade80', emoji: '💊' },
  Utilities:     { color: '#2dd4bf', emoji: '⚡' },
  Rent:          { color: '#fbbf24', emoji: '🏠' },
  Salary:        { color: '#34d399', emoji: '💼' },
  Freelance:     { color: '#818cf8', emoji: '💻' },
  Investment:    { color: '#c9a84c', emoji: '📈' },
  Other:         { color: '#9ca3af', emoji: '◦'  },
};

const EXPENSE_POOL = [
  ['Zomato Order',        'Food',          400,  1200],
  ['Swiggy Delivery',     'Food',          300,   900],
  ['Restaurant Dinner',   'Food',          800,  2500],
  ['Metro Card Recharge', 'Transport',     500,  1000],
  ['Uber Ride',           'Transport',     150,   600],
  ['Netflix',             'Entertainment', 649,   649],
  ['Spotify Premium',     'Entertainment', 119,   119],
  ['BookMyShow Tickets',  'Entertainment', 500,  1200],
  ['Amazon Shopping',     'Shopping',     1200,  8000],
  ['Myntra',              'Shopping',      800,  4000],
  ['Pharmacy',            'Healthcare',    300,  1500],
  ['Medical Consultation','Healthcare',    500,   800],
  ['Electricity Bill',    'Utilities',    1200,  2500],
  ['Internet Bill',       'Utilities',     999,   999],
  ['Gym Membership',      'Other',        2000,  2000],
];

let _id = 1;
const rand = (min, max) => Math.round(min + Math.random() * (max - min));

export function generateSeedTransactions() {
  _id = 1;
  const now = new Date();
  const txns = [];

  for (let m = 5; m >= 0; m--) {
    const d = new Date(now.getFullYear(), now.getMonth() - m, 1);
    const y = d.getFullYear();
    const mo = d.getMonth();
    const days = new Date(y, mo + 1, 0).getDate();
    const pad = (n) => String(n).padStart(2, '0');
    const dateStr = (day) => `${y}-${pad(mo + 1)}-${pad(day)}`;

    // Income
    txns.push({ id: _id++, desc: 'Monthly Salary', amount: 85000, type: 'income', category: 'Salary', date: dateStr(1) });
    if (Math.random() > 0.4)
      txns.push({ id: _id++, desc: 'Freelance Project', amount: rand(15000, 35000), type: 'income', category: 'Freelance', date: dateStr(rand(10, 25)) });

    // Rent
    txns.push({ id: _id++, desc: 'Monthly Rent', amount: 22000, type: 'expense', category: 'Rent', date: dateStr(5) });

    // Random expenses
    const count = rand(7, 11);
    for (let i = 0; i < count; i++) {
      const [desc, cat, min, max] = EXPENSE_POOL[Math.floor(Math.random() * EXPENSE_POOL.length)];
      txns.push({ id: _id++, desc, amount: rand(min, max), type: 'expense', category: cat, date: dateStr(rand(1, days)) });
    }
  }

  return txns.sort((a, b) => b.date.localeCompare(a.date));
}
