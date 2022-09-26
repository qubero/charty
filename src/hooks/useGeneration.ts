import { generatePoints } from '../utils';
import useWebWorker from './useWebWorker';

const useGeneration = () => {
  return useWebWorker(generatePoints);
};

export default useGeneration;
