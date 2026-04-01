import { createContext, useContext, useReducer, useEffect } from 'react';
import { generateSeedTransactions } from '../data/seed';

const AppContext = createContext(null);

const initialState = {
  role: 'admin',         // 'admin' | 'viewer'
  transactions: [],
  activePage: 'dashboard',
  sidebarOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_PAGE':
      return { ...state, activePage: action.payload, sidebarOpen: false };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebarOpen: false };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION': {
      const updated = [action.payload, ...state.transactions];
      return { ...state, transactions: updated };
    }
    case 'EDIT_TRANSACTION': {
      const updated = state.transactions.map(t =>
        t.id === action.payload.id ? action.payload : t
      );
      return { ...state, transactions: updated };
    }
    case 'DELETE_TRANSACTION': {
      const updated = state.transactions.filter(t => t.id !== action.payload);
      return { ...state, transactions: updated };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('aurum_txns');
    const storedRole = localStorage.getItem('aurum_role');
    dispatch({
      type: 'SET_TRANSACTIONS',
      payload: stored ? JSON.parse(stored) : generateSeedTransactions(),
    });
    if (storedRole) dispatch({ type: 'SET_ROLE', payload: storedRole });
  }, []);

  // Persist transactions
  useEffect(() => {
    if (state.transactions.length)
      localStorage.setItem('aurum_txns', JSON.stringify(state.transactions));
  }, [state.transactions]);

  // Persist role
  useEffect(() => {
    localStorage.setItem('aurum_role', state.role);
  }, [state.role]);

  const nextId = () => Math.max(0, ...state.transactions.map(t => t.id)) + 1;

  const actions = {
    setRole: (role) => dispatch({ type: 'SET_ROLE', payload: role }),
    setPage: (page) => dispatch({ type: 'SET_PAGE', payload: page }),
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    closeSidebar: () => dispatch({ type: 'CLOSE_SIDEBAR' }),
    addTransaction: (tx) => dispatch({ type: 'ADD_TRANSACTION', payload: { ...tx, id: nextId() } }),
    editTransaction: (tx) => dispatch({ type: 'EDIT_TRANSACTION', payload: tx }),
    deleteTransaction: (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id }),
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
