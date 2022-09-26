import { memo, useState } from 'react';
import type { ChartData } from '../../types';
import { EditModal } from '../EditModal';

type ChartEditProps = { text: string; chart?: ChartData };

const ChartEdit = ({ text, chart }: ChartEditProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {text}
      </button>
      {isOpen && <EditModal text={text} onClose={closeModal} chart={chart} />}
    </>
  );
};

const MemoizedChartEdit = memo(ChartEdit);

export default MemoizedChartEdit;
