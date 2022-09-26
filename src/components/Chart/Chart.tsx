import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { memo, useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import type { ChartData } from '../../types';
import { createOptions } from './createOptions';

type ChartProps = { data: ChartData; filterable: boolean };

const Chart = ({ data, filterable = false }: ChartProps) => {
  const filters = useAppSelector((state) =>
    filterable ? state.filters : null
  );
  const [options, setOptions] = useState(createOptions(data, filters));

  useEffect(() => {
    setOptions(createOptions(data, filters));
  }, [data, filters]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

const MemoizedChart = memo(Chart);

export default MemoizedChart;
