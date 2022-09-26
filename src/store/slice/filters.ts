import { createSlice } from '@reduxjs/toolkit';
import { Filters } from '../../types';

const initialState: Filters = {
  startLimit: Number(new Date(0)),
  endLimit: Number(new Date()),
  startDate: Number(new Date('2021')),
  endDate: Number(new Date()),
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilter: <K extends keyof Filters>(
      state: Filters,
      action: {
        type: string;
        payload: { type: K; value: Filters[K] };
      }
    ) => {
      const { type, value } = action.payload;
      state[type] = value;
    },
  },
});
