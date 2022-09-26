import Highcharts from 'highcharts';
import { useCallback, useMemo, useState } from 'react';
import type { ChartData } from '../types';
import { DATA_PROVIDERS } from './useDataProvider';

const initialChart = {
  id: '',
  dataProvider: DATA_PROVIDERS.Generated,
  type: 'line',
  color: '#000000',
  title: '',
};

const useEditForm = (chart: Omit<ChartData, 'data'> | null = null) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [chartData, setChartData] = useState(chart || initialChart);

  const possibleProviders = useMemo(() => Object.values(DATA_PROVIDERS), []);
  const possibleTypes = useMemo(
    () => Object.keys(Highcharts.getOptions().plotOptions || []).slice(0, -1),
    []
  );

  const handleChange = useCallback(([prop, value]: [string, string]) => {
    setHasChanged(true);
    setChartData((prev) => ({
      ...prev,
      [prop]: value,
    }));
  }, []);

  const handleTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChange(['type', e.target.value]);
    },
    [handleChange]
  );

  const handleProviderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChange(['dataProvider', e.target.value]);
    },
    [handleChange]
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(['title', e.target.value]);
    },
    [handleChange]
  );

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(['color', e.target.value]);
    },
    [handleChange]
  );

  return {
    chartData,
    hasChanged,
    possibleProviders,
    possibleTypes,
    handlers: {
      handleColorChange,
      handleProviderChange,
      handleTitleChange,
      handleTypeChange,
    },
  };
};

export default useEditForm;
