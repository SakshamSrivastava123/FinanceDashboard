import { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/seed';

const CATEGORY_LIST = Object.keys(CATEGORIES);

const emptyForm = {
  desc: '', amount: '', date: new Date().toISOString().split('T')[0],
  type: 'expense', category: 'Food',
};

export default function TransactionModal({ isOpen, onClose, onSave, editData }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editData) {
      setForm({ desc: editData.desc, amount: editData.amount, date: editData.date, type: editData.type, category: editData.category });
    } else {
      setForm(emptyForm);
    }
  }, [editData, isOpen]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.desc.trim() || !form.amount || !form.date) return;
    onSave({
      ...(editData || {}),
      desc: form.desc.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      type: form.type,
      category: form.category,
    });
  };

  const inputStyle = {
    width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '10px 12px', color: 'var(--text)',
    fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)', zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'all' : 'none',
        transition: 'opacity 0.2s',
      }}
    >
      <div style={{
        background: 'var(--surface)', border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 16, padding: 28, width: 440, maxWidth: '90vw',
        transform: isOpen ? 'translateY(0)' : 'translateY(12px)',
        transition: 'transform 0.2s',
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, marginBottom: 20, color: 'var(--gold-light)' }}>
          {editData ? 'Edit Transaction' : 'Add Transaction'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              Description
            </label>
            <input style={inputStyle} value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="e.g. Netflix" />
          </div>
          <div>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              Amount (₹)
            </label>
            <input style={inputStyle} type="number" value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="0.00" min="0" step="0.01" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              Date
            </label>
            <input style={inputStyle} type="date" value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
          <div>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              Type
            </label>
            <select style={inputStyle} value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="expense" style={{ background: '#1a1f2e' }}>Expense</option>
              <option value="income" style={{ background: '#1a1f2e' }}>Income</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
            Category
          </label>
          <select style={inputStyle} value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORY_LIST.map(c => (
              <option key={c} value={c} style={{ background: '#1a1f2e' }}>
                {CATEGORIES[c].emoji} {c}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{
            padding: '8px 16px', borderRadius: 8, background: 'transparent',
            border: '1px solid var(--border)', color: 'var(--text-muted)',
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{
            padding: '8px 16px', borderRadius: 8, background: 'var(--gold)',
            border: 'none', color: '#0a0d14',
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
