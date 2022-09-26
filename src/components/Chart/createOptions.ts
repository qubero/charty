import type { ChartData, Filters } from '../../types';

export const createOptions = (chart: ChartData, filters: Filters | null) => {
  const { title: name, type, color, data: initData } = chart;
  const data = filters
    ? initData.filter(
        ([date]) => date >= filters.startDate && date <= filters.endDate
      )
    : initData;

  return {
    title: { text: name },
    yAxis: { title: { text: '' } },
    xAxis: { type: 'datetime' },
    series: [{ type, name, data, color }],
    turboThreshold: data.length,
  };
};
