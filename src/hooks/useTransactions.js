import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { currentMonthPrefix, monthPrefix, getLast6Months } from '../utils/format';
import { CATEGORIES } from '../data/seed';

export function useTransactions() {
  const { state } = useApp();
  const { transactions } = state;

  const currentMonthTxns = useMemo(() => {
    const prefix = currentMonthPrefix();
    return transactions.filter(t => t.date.startsWith(prefix));
  }, [transactions]);

  const income = useMemo(
    () => currentMonthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    [currentMonthTxns]
  );

  const expenses = useMemo(
    () => currentMonthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    [currentMonthTxns]
  );

  const balance = useMemo(
    () => transactions.reduce((s, t) => t.type === 'income' ? s + t.amount : s - t.amount, 0),
    [transactions]
  );

  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

  const prevMonthTxns = useMemo(() => {
    const prefix = monthPrefix(-1);
    return transactions.filter(t => t.date.startsWith(prefix));
  }, [transactions]);

  const prevExpenses = useMemo(
    () => prevMonthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    [prevMonthTxns]
  );

  const categoryBreakdown = useMemo(() => {
    const map = {};
    currentMonthTxns.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => ({ cat, amt, color: CATEGORIES[cat]?.color || '#9ca3af', emoji: CATEGORIES[cat]?.emoji || '◦' }));
  }, [currentMonthTxns]);

  const monthlyData = useMemo(() => {
    return getLast6Months().map(({ label, prefix }) => {
      const txns = transactions.filter(t => t.date.startsWith(prefix));
      const inc = txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
      const exp = txns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
      return { label, income: inc, expense: exp, net: inc - exp };
    });
  }, [transactions]);

  const balanceTrend = useMemo(() => {
    let running = 0;
    return monthlyData.map(m => { running += m.net; return running; });
  }, [monthlyData]);

  return {
    transactions,
    currentMonthTxns,
    income,
    expenses,
    balance,
    savingsRate,
    prevExpenses,
    categoryBreakdown,
    monthlyData,
    balanceTrend,
  };
}
