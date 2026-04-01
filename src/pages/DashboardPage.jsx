import SummaryCard from '../components/SummaryCard';
import { LineChartCard, BarChartCard, DoughnutChart } from '../components/Charts';
import { useTransactions } from '../hooks/useTransactions';
import { fmt } from '../utils/format';

export default function DashboardPage() {
  const { income, expenses, balance, savingsRate, categoryBreakdown, monthlyData, balanceTrend } = useTransactions();

  const monthLabels = monthlyData.map(m => m.label);
  const expDiff = monthlyData.length >= 2
    ? monthlyData[monthlyData.length - 1].expense - monthlyData[monthlyData.length - 2].expense
    : 0;

  return (
    <div>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }} className="summary-grid">
        <SummaryCard
          label="Total Balance" value={fmt(balance)} icon="◈"
          change="↑ Net accumulated" changePositive={balance >= 0}
          delay={50}
        />
        <SummaryCard
          label="Monthly Income" value={fmt(income)} icon="↑"
          accentColor="var(--green)" change="↑ This month" changePositive={true}
          delay={100}
        />
        <SummaryCard
          label="Monthly Expenses" value={fmt(expenses)} icon="↓"
          accentColor="var(--red)" change="↓ This month" changePositive={false}
          delay={150}
        />
        <SummaryCard
          label="Savings Rate" value={`${savingsRate}%`} icon="◑"
          accentColor="var(--gold)"
          change={savingsRate >= 20 ? '↑ Healthy (20%+ target)' : '↓ Below target'}
          changePositive={savingsRate >= 20}
          delay={200}
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }} className="charts-grid">
        <LineChartCard labels={monthLabels} data={balanceTrend} />
        {categoryBreakdown.length > 0 ? (
          <DoughnutChart
            labels={categoryBreakdown.map(c => c.cat)}
            data={categoryBreakdown.map(c => c.amt)}
            colors={categoryBreakdown.map(c => c.color)}
          />
        ) : (
          <div className="card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            No expense data this month
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <BarChartCard
        labels={monthLabels}
        incomeData={monthlyData.map(m => m.income)}
        expenseData={monthlyData.map(m => m.expense)}
      />
    </div>
  );
}
