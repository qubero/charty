import { useCallback, useState } from 'react';
import { useGetTemperatureQuery } from '../store/api';
import useGeneration from './useGeneration';

export const DATA_PROVIDERS = {
  Generated: 'generated',
  OpenMap: 'openMap',
};

const useDataProvider = () => {
  const [skip, setSkip] = useState(true);

  const { isGenerating, generatedData, generate } = useGeneration();
  const { isFetching, fetchedData } = useGetTemperatureQuery(
    {},
    {
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        fetchedData: data || null,
        isFetching: isLoading || isFetching,
      }),
      skip,
    }
  );

  const getData = useCallback(
    (provider: string) => {
      if (provider === DATA_PROVIDERS.Generated) generate();
      if (provider === DATA_PROVIDERS.OpenMap) setSkip(false);
    },
    [generate]
  );

  return {
    isLoading: isGenerating || isFetching,
    data: generatedData || fetchedData,
    getData,
  };
};

export default useDataProvider;
