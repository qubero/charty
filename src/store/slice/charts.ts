import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChartData } from '../../types';

const initialState: ChartData[] = [];

export const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    addChart(state, action: PayloadAction<ChartData>) {
      state.push(action.payload);
    },
    removeChart(state, action: PayloadAction<string>) {
      return state.filter((chart) => chart.id !== action.payload);
    },
    updateChart(state, action: PayloadAction<ChartData>) {
      const idx = state.findIndex((chart) => chart.id === action.payload.id);
      state[idx] = action.payload;
    },
  },
});
