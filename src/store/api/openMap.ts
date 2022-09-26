import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Point } from '../../types';

const API_URL = 'https://archive-api.open-meteo.com/v1';

const initialParams = {
  start_date: '2012-09-20',
  end_date: '2022-09-20',
  latitude: 55.7558,
  longitude: 37.6176,
  daily: 'temperature_2m_max',
  timezone: 'Europe/Moscow',
  timeformat: 'unixtime',
};

const MILLISECONDS = 1000;

interface OpenMapResponse {
  daily: {
    time: number[];
    temperature_2m_max: number[];
  };
}

export const openMapApi = createApi({
  reducerPath: 'OpenMapAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getTemperature: build.query<Point[], Record<string, unknown>>({
      query: () => ({
        url: 'era5',
        params: initialParams,
      }),
      transformResponse: (response: OpenMapResponse, meta, arg) => {
        const { time: days, temperature_2m_max } = response.daily;

        const data: Point[] = days.map((day: number, idx: number) => [
          day * MILLISECONDS,
          temperature_2m_max[idx],
        ]);

        return data;
      },
    }),
  }),
});
