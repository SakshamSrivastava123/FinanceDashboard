import { useEffect, useRef } from 'react';

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#171d2e',
      borderColor: 'rgba(201,168,76,0.2)',
      borderWidth: 1,
      titleColor: '#c9a84c',
      bodyColor: '#e8e4da',
      padding: 10,
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: '#6b7280', font: { family: 'DM Mono', size: 10 } },
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: {
        color: '#6b7280',
        font: { family: 'DM Mono', size: 10 },
        callback: v => '₹' + (v / 1000).toFixed(0) + 'k',
      },
      border: { display: false },
    },
  },
};

function ChartCard({ title, subtitle, height = 200, children }) {
  return (
    <div className="card fade-in" style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 14, padding: '22px 24px',
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
        {title}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>
        {subtitle}
      </div>
      <div style={{ position: 'relative', height }}>
        {children}
      </div>
    </div>
  );
}

export function LineChart({ labels, data }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!ref.current || !window.Chart) return;
    chartRef.current?.destroy();
    chartRef.current = new window.Chart(ref.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor: '#c9a84c',
          backgroundColor: 'rgba(201,168,76,0.08)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#c9a84c',
          pointRadius: 4,
          pointHoverRadius: 6,
        }],
      },
      options: {
        ...CHART_DEFAULTS,
        plugins: {
          ...CHART_DEFAULTS.plugins,
          tooltip: {
            ...CHART_DEFAULTS.plugins.tooltip,
            callbacks: { label: ctx => ' ₹' + ctx.parsed.y.toLocaleString('en-IN') },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [labels, data]);

  return <canvas ref={ref} />;
}

export function BarChart({ labels, incomeData, expenseData }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!ref.current || !window.Chart) return;
    chartRef.current?.destroy();
    chartRef.current = new window.Chart(ref.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Income', data: incomeData, backgroundColor: 'rgba(74,222,128,0.7)', borderRadius: 4, borderSkipped: false },
          { label: 'Expenses', data: expenseData, backgroundColor: 'rgba(248,113,113,0.7)', borderRadius: 4, borderSkipped: false },
        ],
      },
      options: {
        ...CHART_DEFAULTS,
        plugins: {
          legend: {
            display: true,
            labels: { color: '#9ca3af', font: { family: 'DM Mono', size: 10 }, padding: 12, boxWidth: 10, boxHeight: 10 },
          },
          tooltip: {
            ...CHART_DEFAULTS.plugins.tooltip,
            callbacks: { label: ctx => ` ${ctx.dataset.label}: ₹${ctx.parsed.y.toLocaleString('en-IN')}` },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [labels, incomeData, expenseData]);

  return <canvas ref={ref} />;
}

export function DoughnutChart({ labels, data, colors }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!ref.current || !window.Chart) return;
    chartRef.current?.destroy();
    chartRef.current = new window.Chart(ref.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: { color: '#9ca3af', font: { family: 'DM Mono', size: 10 }, padding: 8, boxWidth: 10, boxHeight: 10 },
          },
          tooltip: {
            backgroundColor: '#171d2e',
            borderColor: 'rgba(201,168,76,0.2)',
            borderWidth: 1,
            titleColor: '#c9a84c',
            bodyColor: '#e8e4da',
            callbacks: { label: ctx => ' ₹' + ctx.parsed.toLocaleString('en-IN') },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [labels, data, colors]);

  return (
    <ChartCard title="Spending by Category" subtitle="Current month" height={200}>
      <canvas ref={ref} />
    </ChartCard>
  );
}

export function LineChartCard({ labels, data }) {
  return (
    <ChartCard title="Balance Trend" subtitle="6-month overview">
      <LineChart labels={labels} data={data} />
    </ChartCard>
  );
}

export function BarChartCard({ labels, incomeData, expenseData }) {
  return (
    <ChartCard title="Income vs Expenses" subtitle="Monthly comparison">
      <BarChart labels={labels} incomeData={incomeData} expenseData={expenseData} />
    </ChartCard>
  );
}
