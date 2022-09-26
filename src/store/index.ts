import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { openMapApi } from './api';
import { chartsSlice, filtersSlice } from './slice';

const rootReducer = combineReducers({
  [filtersSlice.name]: filtersSlice.reducer,
  [chartsSlice.name]: chartsSlice.reducer,
  [openMapApi.reducerPath]: openMapApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openMapApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
