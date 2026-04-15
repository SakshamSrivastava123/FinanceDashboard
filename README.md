# Finance Dashboard

A clean, interactive finance dashboard built with React. Tracks financial activity with a refined dark-luxury aesthetic.
Finance Dashboard to help users track their income and expenses in a structured way. The main problem it solves is giving users a clear view of their financial activity, including where they are spending and how much they are earning.

The application includes features like adding transactions, filtering by type such as income or expense, categorizing transactions like food, rent, or freelance, and sorting them by date. It also calculates totals and can be extended to show insights like category-wise spending.

---

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
src/
├── context/
│   └── AppContext.jsx       # Global state via useReducer + Context
├── hooks/
│   ├── useTransactions.js   # Derived financial data (memoized)
│   └── useToast.js          # Toast notification hook
├── data/
│   └── seed.js              # Category config + seed data generator
├── utils/
│   └── format.js            # Currency, date, month helpers
├── components/
│   ├── Sidebar.jsx          # Nav + role selector
│   ├── Topbar.jsx           # Page title + role badge
│   ├── SummaryCard.jsx      # Metric card
│   ├── Charts.jsx           # Line, Bar, Doughnut (Chart.js)
│   ├── TransactionModal.jsx # Add/Edit modal
│   └── Toast.jsx            # Notification toast
├── pages/
│   ├── DashboardPage.jsx    # Overview with charts
│   ├── TransactionsPage.jsx # Full transaction list
│   └── InsightsPage.jsx     # Analytics & insights
├── App.jsx                  # Shell + routing
├── main.jsx                 # Entry point
└── index.css                # Global styles + CSS variables
```

---

## Features

### Dashboard
- **4 Summary Cards** — Total Balance, Monthly Income, Expenses, Savings Rate
- **Balance Trend** — 6-month line chart (running net balance)
- **Spending Breakdown** — Doughnut chart by category
- **Income vs Expenses** — Grouped bar chart (6 months)

### Transactions
- Full list with date, description, category badge, type, and amount
- **Search** — by description or category
- **Filter** — by type (income/expense) and category
- **Sort** — newest, oldest, highest/lowest amount
- **Admin only**: Add, Edit, Delete transactions

### Role-Based UI
Switch via the sidebar dropdown — no login required:
- **Viewer** — read-only, no action buttons
- **Admin** — full CRUD on transactions

### Insights
- Top spending category with percentage share
- Month-over-month expense comparison
- Savings rate with health indicator
- Transaction count, average expense size, net cash flow
- Category breakdown with animated bar chart
- Top 5 largest expenses

### State Management
- `useReducer` + React Context for global state
- `useMemo` in `useTransactions` hook for all derived data
- `localStorage` persistence for transactions and role

### Design
- Dark luxury aesthetic (navy + gold)
- Playfair Display + DM Mono + DM Sans typography
- SVG grain texture overlay
- Glassmorphic cards with hover shimmer
- Fully responsive — collapsible sidebar on mobile

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Chart.js 4 | Charts (via CDN) |
| React Context | State management |
| localStorage | Persistence |

No external UI library — all components are hand-crafted.
