import { useCallback } from 'react';
import { DatePicker } from '../ui';
import { subDays } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateFilter } from '../../store/slice';

const DateFilter = () => {
  const dispatch = useAppDispatch();
  const { startLimit, endLimit, startDate, endDate } = useAppSelector(
    (state) => state.filters
  );

  const handleStartChange = useCallback(
    (date: Date) => {
      dispatch(updateFilter({ type: 'startDate', value: Number(date) }));
    },
    [dispatch]
  );

  const handleEndChange = useCallback(
    (date: Date) => {
      dispatch(updateFilter({ type: 'endDate', value: Number(date) }));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-0 justify-center">
      <DatePicker
        selected={new Date(startDate)}
        onChange={handleStartChange}
        includeDateIntervals={[
          { start: new Date(startLimit), end: new Date(endDate) },
        ]}
        placeholderText="Select start date"
        className="sm:mr-2"
      />
      <DatePicker
        selected={new Date(endDate)}
        onChange={handleEndChange}
        includeDateIntervals={[
          { start: subDays(new Date(startDate), 1), end: new Date(endLimit) },
        ]}
        placeholderText="Select end date"
        className="sm:ml-2"
      />
    </div>
  );
};

export default DateFilter;
