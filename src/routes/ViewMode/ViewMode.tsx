import { Charts } from '../../components/Charts';
import { DateFilter } from '../../components/DateFilter';
import { useAppSelector } from '../../hooks';

const ViewMode = () => {
  const charts = useAppSelector((state) => state.charts.length);

  return (
    <div className="container mx-auto px-1">
      {Boolean(charts) && <DateFilter />}
      <Charts filterable={true} />
    </div>
  );
};

export default ViewMode;
