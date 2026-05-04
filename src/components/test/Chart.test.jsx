import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LineChart } from '../Charts';

beforeAll(() => {
  global.Chart = jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
  }));
});

test('renders LineChart without crashing', () => {
  render(<LineChart labels={['Jan', 'Feb']} data={[1000, 2000]} />);
});