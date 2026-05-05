import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LineChart } from '../Charts';

describe('LineChart Component', () => {
  let destroyMock;

  beforeEach(() => {
    destroyMock = jest.fn();

    global.Chart = jest.fn().mockImplementation(() => ({
      destroy: destroyMock,
    }));
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders canvas element', () => {
    const { container } = render(
      <LineChart labels={['Jan', 'Feb']} data={[1000, 2000]} />
    );

    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  test('initializes Chart with correct type and data', () => {
    render(<LineChart labels={['Jan']} data={[1000]} />);

    expect(global.Chart).toHaveBeenCalledTimes(1);

    const chartConfig = global.Chart.mock.calls[0][1];

    expect(chartConfig.type).toBe('line');
    expect(chartConfig.data.labels).toEqual(['Jan']);
    expect(chartConfig.data.datasets[0].data).toEqual([1000]);
  });

  test('handles empty labels and data', () => {
    render(<LineChart labels={[]} data={[]} />);

    expect(global.Chart).toHaveBeenCalled();

    const chartConfig = global.Chart.mock.calls[0][1];
    expect(chartConfig.data.labels).toEqual([]);
    expect(chartConfig.data.datasets[0].data).toEqual([]);
  });

  test('destroys chart on unmount', () => {
    const { unmount } = render(
      <LineChart labels={['Jan']} data={[100]} />
    );

    unmount();

    expect(destroyMock).toHaveBeenCalled();
  });

  test('does not crash if Chart is undefined', () => {
    const originalChart = global.Chart;
    global.Chart = undefined;

    expect(() => {
      render(<LineChart labels={['Jan']} data={[100]} />);
    }).not.toThrow();

    global.Chart = originalChart;
  });
});