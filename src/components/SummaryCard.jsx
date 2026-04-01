export default function SummaryCard({ label, value, change, changePositive, icon, accentColor, delay = 0 }) {
  return (
    <div
      className="card fade-in"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '20px 22px',
        position: 'relative',
        overflow: 'hidden',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--gold-dim), transparent)',
      }} />
      {/* Background icon */}
      <div style={{
        position: 'absolute', top: 16, right: 18,
        fontSize: 26, opacity: 0.12, color: accentColor || 'var(--text)',
      }}>{icon}</div>

      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--text-muted)', marginBottom: 10,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        ⬡ {label}
      </div>
      <div style={{
        fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700,
        color: accentColor || 'var(--text)', lineHeight: 1, marginBottom: 8,
      }}>
        {value}
      </div>
      {change && (
        <div style={{
          fontSize: 11, fontFamily: "'DM Mono', monospace",
          color: changePositive === true ? 'var(--green)' : changePositive === false ? 'var(--red)' : 'var(--text-muted)',
        }}>
          {change}
        </div>
      )}
    </div>
  );
}
