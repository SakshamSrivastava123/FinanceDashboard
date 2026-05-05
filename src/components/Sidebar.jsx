import { useApp } from '../context/AppContext';
import React from 'react';
const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',     icon: '◈' },
  { id: 'transactions', label: 'Transactions',  icon: '⇄' },
  { id: 'insights',     label: 'Insights',      icon: '◎' },
];

export default function Sidebar() {
  const { state, actions } = useApp();
  const { activePage, role, sidebarOpen } = state;

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={actions.closeSidebar}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)', zIndex: 90,
          }}
        />
      )}

      <aside style={{
        width: 240,
        minHeight: '100vh',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 100,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
        transition: 'transform 0.3s ease',
      }}
        className="sidebar"
      >
        {/* Logo */}
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.05em' }}>
         
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>
            Finance Dashboard
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '12px 12px 6px' }}>
            Overview
          </div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => actions.setPage(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                color: activePage === item.id ? 'var(--gold-light)' : 'var(--text-muted)',
                background: activePage === item.id ? 'var(--gold-dim)' : 'transparent',
                border: activePage === item.id ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
                fontSize: 13.5, fontWeight: activePage === item.id ? 500 : 400,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.15s', textAlign: 'left', width: '100%',
              }}
            >
              <span style={{ width: 16, textAlign: 'center', fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Role selector */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
          <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
              Active Role
            </div>
            <select
              value={role}
              onChange={e => actions.setRole(e.target.value)}
              style={{
                background: 'transparent', border: 'none', color: 'var(--gold)',
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                cursor: 'pointer', width: '100%', outline: 'none', appearance: 'none',
              }}
            >
              <option value="viewer" style={{ background: '#1a1f2e' }}>👁 Viewer</option>
              <option value="admin" style={{ background: '#1a1f2e' }}>⚡ Admin</option>
            </select>
          </div>
        </div>
      </aside>
    </>
  );
}
