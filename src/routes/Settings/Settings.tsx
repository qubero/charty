import { ChartEdit } from '../../components/ChartEdit';
import { Charts } from '../../components/Charts';

const Settings = () => {
  return (
    <div className="container mx-auto px-1">
      <div className="flex justify-center">
        <ChartEdit text={'Add chart'} />
      </div>
      <Charts editable={true} />
    </div>
  );
};

export default Settings;
