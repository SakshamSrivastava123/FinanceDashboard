import { useApp } from '../context/AppContext';

const PAGE_TITLES = { dashboard: 'Dashboard', transactions: 'Transactions', insights: 'Insights' };

export default function Topbar() {
  const { state, actions } = useApp();
  const { activePage, role } = state;

  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <header style={{
      padding: '18px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(10,13,20,0.85)',
      backdropFilter: 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Hamburger */}
        <button
          onClick={actions.toggleSidebar}
          className="hamburger-btn"
          style={{
            display: 'none', flexDirection: 'column', gap: 4,
            cursor: 'pointer', padding: 4, background: 'none', border: 'none',
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: 20, height: 2, background: 'var(--text-muted)', borderRadius: 1 }} />
          ))}
        </button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: 'var(--text)' }}>
          {PAGE_TITLES[activePage]}
        </h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
          {today}
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.1em',
          textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20,
          background: 'var(--gold-dim)', color: 'var(--gold)',
          border: '1px solid rgba(201,168,76,0.25)',
        }}>
          {role === 'admin' ? '⚡ Admin' : '👁 Viewer'}
        </span>
      </div>
    </header>
  );
}
