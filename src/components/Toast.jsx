export default function Toast({ message, visible }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      background: 'var(--surface)', border: '1px solid rgba(201,168,76,0.3)',
      borderRadius: 10, padding: '12px 18px', fontSize: 13, color: 'var(--text)',
      zIndex: 300,
      transform: visible ? 'translateY(0)' : 'translateY(80px)',
      opacity: visible ? 1 : 0,
      transition: 'all 0.25s',
      pointerEvents: 'none',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    }}>
      {message}
    </div>
  );
}
