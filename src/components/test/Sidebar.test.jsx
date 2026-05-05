import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';

// Mock useApp
const mockSetPage = jest.fn();
const mockSetRole = jest.fn();
const mockCloseSidebar = jest.fn();

jest.mock('../../context/AppContext', () => ({
  useApp: () => ({
    state: {
      activePage: 'dashboard',
      role: 'viewer',
      sidebarOpen: true,
    },
    actions: {
      setPage: mockSetPage,
      setRole: mockSetRole,
      closeSidebar: mockCloseSidebar,
    },
  }),
}));

describe('Sidebar Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Render test
  test('renders all navigation items', () => {
    render(<Sidebar />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Insights')).toBeInTheDocument();
  });

  // ✅ Active page styling
  test('highlights active page', () => {
    render(<Sidebar />);

    const activeButton = screen.getByText('Dashboard');
    expect(activeButton).toHaveStyle('background: var(--gold-dim)');
  });

  // ✅ Click navigation
  test('calls setPage when nav item is clicked', () => {
    render(<Sidebar />);

    fireEvent.click(screen.getByText('Transactions'));

    expect(mockSetPage).toHaveBeenCalledWith('transactions');
  });
});