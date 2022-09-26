import { useEffect, useRef, useState } from 'react';
import {
  GeneratePoints,
  GeneratePointsArgs,
  getRandomIntInclusive,
} from '../utils';

const workerHandler = (
  fn: GeneratePoints,
  getRandom: typeof getRandomIntInclusive
) => {
  onmessage = (event) => {
    postMessage(fn(event.data as GeneratePointsArgs, getRandom));
  };
};

const useWebWorker = (fn: GeneratePoints) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [generatedData, setResult] = useState<ReturnType<GeneratePoints> | null>(null);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(
      URL.createObjectURL(
        new Blob([`(${workerHandler})(${fn}, ${getRandomIntInclusive})`])
      )
    );

    workerRef.current = worker;

    const handleFinish = () => {
      setIsGenerating(false);
      workerRef.current = null;
      worker.terminate();
    };

    worker.onmessage = (event) => {
      setResult(event.data);
      handleFinish();
    };

    worker.onerror = () => {
      setIsError(true);
      handleFinish();
    };

    return () => {
      worker.terminate();
    };
  }, [fn]);

  const generate = (
    min = -50,
    max = 50,
    length = getRandomIntInclusive(10, 1000)
  ) => {
    setIsGenerating(true);
    workerRef.current?.postMessage({ min, max, length });
  };

  return {
    isGenerating,
    isError,
    generatedData,
    generate,
  };
};

export default useWebWorker;
