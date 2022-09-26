import { chartsSlice } from './charts';
import { filtersSlice } from './filters';

export { chartsSlice, filtersSlice };

export const { addChart, updateChart, removeChart } = chartsSlice.actions;
export const { updateFilter } = filtersSlice.actions;
