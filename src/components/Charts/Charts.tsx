import { Fragment } from 'react';
import { useAppSelector } from '../../hooks';
import { ChartEdit } from '../ChartEdit';
import { Chart } from '../Chart';

const Charts = ({ filterable = false, editable = false }) => {
  const charts = useAppSelector((state) => state.charts);

  return (
    <div className="flex flex-col gap-6 my-6">
      {Boolean(charts.length) ? (
        charts.map((chart) => (
          <Fragment key={chart.id}>
            {editable && (
              <div className="flex justify-end pr-2">
                <ChartEdit text="Edit chart" chart={chart} />
              </div>
            )}
            <Chart filterable={filterable} data={chart} />
          </Fragment>
        ))
      ) : (
        <div className="fixed -z-10 inset-0 flex items-center justify-center text-2xl">
          No charts
        </div>
      )}
    </div>
  );
};

export default Charts;
