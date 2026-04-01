import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Toast from './components/Toast';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';
import { useToast } from './hooks/useToast';

function AppShell() {
  const { state } = useApp();
  const { toast, showToast } = useToast();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="main-content">
        <Topbar />
        <div style={{ padding: '28px 32px', flex: 1 }} className="page-content">
          {state.activePage === 'dashboard' && <DashboardPage />}
          {state.activePage === 'transactions' && <TransactionsPage showToast={showToast} />}
          {state.activePage === 'insights' && <InsightsPage />}
        </div>
      </main>
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
