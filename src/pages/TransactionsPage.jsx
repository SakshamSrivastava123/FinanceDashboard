import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useTransactions } from '../hooks/useTransactions';
import TransactionModal from '../components/TransactionModal';
import { CATEGORIES } from '../data/seed';
import { fmt, fmtDate } from '../utils/format';

const inputStyle = {
  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
  padding: '8px 12px', color: 'var(--text)', fontFamily: "'DM Sans', sans-serif",
  fontSize: 13, outline: 'none', cursor: 'pointer',
};

export default function TransactionsPage({ showToast }) {
  const { state, actions } = useApp();
  const { transactions } = useTransactions();
  const isAdmin = state.role === 'admin';

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [sort, setSort] = useState('date-desc');
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const cats = useMemo(() => [...new Set(transactions.map(t => t.category))].sort(), [transactions]);

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (search) list = list.filter(t => t.desc.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));
    if (typeFilter) list = list.filter(t => t.type === typeFilter);
    if (catFilter) list = list.filter(t => t.category === catFilter);
    if (sort === 'date-desc') list.sort((a, b) => b.date.localeCompare(a.date));
    else if (sort === 'date-asc') list.sort((a, b) => a.date.localeCompare(b.date));
    else if (sort === 'amount-desc') list.sort((a, b) => b.amount - a.amount);
    else if (sort === 'amount-asc') list.sort((a, b) => a.amount - b.amount);
    return list;
  }, [transactions, search, typeFilter, catFilter, sort]);

  const openAdd = () => { setEditData(null); setModalOpen(true); };
  const openEdit = (tx) => { setEditData(tx); setModalOpen(true); };

  const handleSave = (tx) => {
    if (tx.id) {
      actions.editTransaction(tx);
      showToast('✓ Transaction updated');
    } else {
      actions.addTransaction(tx);
      showToast('✓ Transaction added');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this transaction?')) return;
    actions.deleteTransaction(id);
    showToast('✓ Transaction deleted');
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600 }}>All Transactions</h2>
        {isAdmin && (
          <button onClick={openAdd} style={{
            padding: '8px 16px', borderRadius: 8, background: 'var(--gold)',
            border: 'none', color: '#0a0d14', fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>
            + Add Transaction
          </button>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <input
          style={{ ...inputStyle, width: 220 }}
          placeholder="Search transactions…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select style={inputStyle} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select style={inputStyle} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option value="">All Categories</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select style={inputStyle} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 0' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '90px 1fr 130px 80px 110px 80px',
          padding: '8px 20px', fontFamily: "'DM Mono', monospace", fontSize: 10,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)',
          borderBottom: '1px solid var(--border)', marginBottom: 4,
        }} className="tx-head">
          <div>Date</div><div>Description</div><div>Category</div>
          <div>Type</div><div style={{ textAlign: 'right' }}>Amount</div>
          <div style={{ textAlign: 'right' }}>Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.4 }}>⊘</div>
            <div>No transactions found</div>
          </div>
        ) : filtered.map(t => {
          const cat = CATEGORIES[t.category] || CATEGORIES.Other;
          const isIncome = t.type === 'income';
          return (
            <div key={t.id}
              style={{
                display: 'grid', gridTemplateColumns: '90px 1fr 130px 80px 110px 80px',
                padding: '12px 20px', alignItems: 'center', borderRadius: 8, margin: '0 4px',
                transition: 'background 0.15s', cursor: 'default',
              }}
              className="tx-row"
            >
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>
                {fmtDate(t.date)}
              </div>
              <div style={{ fontSize: 13.5 }}>{t.desc}</div>
              <div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 11, padding: '3px 8px', borderRadius: 20,
                  fontFamily: "'DM Mono', monospace",
                  background: cat.color + '22', color: cat.color,
                }}>
                  {cat.emoji} {t.category}
                </span>
              </div>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.05em',
                textTransform: 'uppercase', color: isIncome ? 'var(--green)' : 'var(--red)',
              }}>
                {t.type}
              </div>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500,
                textAlign: 'right', color: isIncome ? 'var(--green)' : 'var(--red)',
              }}>
                {isIncome ? '+' : '-'}{fmt(t.amount)}
              </div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                {isAdmin ? (
                  <>
                    <button onClick={() => openEdit(t)} title="Edit" style={{
                      background: 'transparent', border: '1px solid var(--border)', borderRadius: 6,
                      width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontSize: 12, color: 'var(--text-muted)', transition: 'all 0.15s',
                    }} className="action-btn">✎</button>
                    <button onClick={() => handleDelete(t.id)} title="Delete" style={{
                      background: 'transparent', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 6,
                      width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontSize: 12, color: 'var(--red)', transition: 'all 0.15s',
                    }}>✕</button>
                  </>
                ) : (
                  <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
}
