import { useTransactions } from '../hooks/useTransactions';
import { fmt } from '../utils/format';
import { CATEGORIES } from '../data/seed';

function InsightCard({ label, value, valueColor, desc, delay = 0 }) {
  return (
    <div className="card fade-in" style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 14, padding: '20px 22px', animationDelay: `${delay}ms`,
      transition: 'border-color 0.2s',
    }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: valueColor || 'var(--text)', marginBottom: 6 }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}

export default function InsightsPage() {
  const {
    income, expenses, balance, savingsRate,
    categoryBreakdown, currentMonthTxns, prevExpenses, monthlyData,
  } = useTransactions();

  const topCat = categoryBreakdown[0];
  const totalEx = categoryBreakdown.reduce((s, c) => s + c.amt, 0);
  const expDiff = prevExpenses > 0 ? Math.round(((expenses - prevExpenses) / prevExpenses) * 100) : 0;
  const expTxns = currentMonthTxns.filter(t => t.type === 'expense');
  const avgTx = expTxns.length > 0 ? expenses / expTxns.length : 0;
  const maxEx = categoryBreakdown[0]?.amt || 1;
  const topTx = [...expTxns].sort((a, b) => b.amount - a.amount).slice(0, 5);

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, marginBottom: 20 }}>
        Financial Insights
      </h2>

      {/* Insight Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }} className="insights-grid">
        <InsightCard
          label="Top Spending Category"
          value={topCat ? `${topCat.emoji} ${topCat.cat}` : '—'}
          valueColor={topCat?.color}
          desc={topCat ? `${fmt(topCat.amt)} spent · ${Math.round((topCat.amt / totalEx) * 100)}% of total expenses` : 'No expenses this month'}
          delay={50}
        />
        <InsightCard
          label="Month-over-Month"
          value={`${expDiff > 0 ? '↑' : '↓'} ${Math.abs(expDiff)}%`}
          valueColor={expDiff <= 0 ? 'var(--green)' : 'var(--red)'}
          desc={`${expDiff <= 0 ? 'Expenses decreased' : 'Expenses increased'} vs last month. Prev: ${fmt(prevExpenses)}`}
          delay={100}
        />
        <InsightCard
          label="Savings Rate"
          value={`${savingsRate}%`}
          valueColor={savingsRate >= 20 ? 'var(--green)' : savingsRate >= 10 ? 'var(--gold)' : 'var(--red)'}
          desc={savingsRate >= 20 ? '✓ Healthy savings (target: 20%+)' : savingsRate >= 10 ? '◐ Below target — reduce discretionary spend' : '⚠ Critical — expenses near income'}
          delay={150}
        />
        <InsightCard
          label="Transactions This Month"
          value={String(currentMonthTxns.length)}
          desc={`${(currentMonthTxns.length / Math.max(1, new Date().getDate())).toFixed(1)} per day avg`}
          delay={200}
        />
        <InsightCard
          label="Avg Expense Size"
          value={avgTx > 0 ? fmt(avgTx) : '—'}
          desc="Average per expense transaction this month"
          delay={250}
        />
        <InsightCard
          label="Net Cash Flow"
          value={`${income - expenses >= 0 ? '+' : ''}${fmt(income - expenses)}`}
          valueColor={income - expenses >= 0 ? 'var(--green)' : 'var(--red)'}
          desc="Income minus expenses this month"
          delay={300}
        />
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="charts-grid">
        {/* Category breakdown */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 24px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Category Breakdown</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>Expense distribution</div>
          {categoryBreakdown.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: 13 }}>No expenses this month</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {categoryBreakdown.slice(0, 7).map(({ cat, amt, color, emoji }) => (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--text-dim)' }}>{emoji} {cat}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>{fmt(amt)}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(amt / maxEx * 100).toFixed(1)}%`, background: color, borderRadius: 2, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top transactions */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 24px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Top Expenses</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>Largest this month</div>
          {topTx.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: 13 }}>No expenses this month</div>
          ) : topTx.map((t, i) => {
            const cat = CATEGORIES[t.category] || CATEGORIES.Other;
            return (
              <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '24px 1fr auto', alignItems: 'center', padding: '10px 0', borderBottom: i < topTx.length - 1 ? '1px solid var(--border)' : 'none', gap: 10 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--text-muted)' }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 13 }}>{t.desc}</div>
                  <div style={{ fontSize: 11, color: cat.color, marginTop: 2 }}>{cat.emoji} {t.category}</div>
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500, color: 'var(--red)' }}>{fmt(t.amount)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
