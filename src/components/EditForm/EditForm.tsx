import { useEffect, useCallback, Fragment } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useAppDispatch, useDataProvider, useEditForm } from '../../hooks';
import { addChart, removeChart, updateChart } from '../../store/slice';
import { Select, Input, Spinner } from '../ui';
import { Dialog, Transition } from '@headlessui/react';
import { Point, ChartData } from '../../types';

type EditFormProps = { chart?: ChartData; onClose: () => void };

const EditForm = ({ chart, onClose }: EditFormProps) => {
  const dispatch = useAppDispatch();

  const { isLoading, data, getData } = useDataProvider();
  const { hasChanged, chartData, possibleProviders, possibleTypes, handlers } =
    useEditForm(chart);

  const handleFinish = useCallback(
    (data: Point[]) => {
      if (chart?.id) {
        const payload = {
          ...chartData,
          data: data || chart.data,
        };

        dispatch(updateChart(payload));
      } else {
        const payload = {
          ...chartData,
          id: String(Date.now()),
          data,
        };

        dispatch(addChart(payload));
      }

      return onClose();
    },
    [dispatch, chart, chartData, onClose]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasChanged && chart) {
      return onClose();
    }

    if (!chart) {
      return getData(chartData.dataProvider);
    }

    handleFinish(chart.data);
  };

  const handleRemove = () => {
    if (chart) {
      dispatch(removeChart(chart.id));
    }

    return onClose();
  };

  useEffect(() => {
    if (data) {
      handleFinish(data);
    }
  }, [data, handleFinish]);

  return (
    <>
      <Transition appear show={isLoading} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={() => {}}>
          <div className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-25">
            <Spinner />
          </div>
        </Dialog>
      </Transition>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex flex-col gap-6">
          {chartData && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <DebounceInput
                  id="name"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={chartData.title}
                  onChange={handlers.handleTitleChange}
                  element={Input}
                  debounceTimeout={300}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Type
                </label>
                <Select
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  options={possibleTypes}
                  value={chartData.type}
                  onChange={handlers.handleTypeChange}
                />
              </div>

              {!chart && (
                <div>
                  <label
                    htmlFor="provider"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Data provider
                  </label>
                  <Select
                    id="provider"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    options={possibleProviders}
                    value={chartData.dataProvider}
                    onChange={handlers.handleProviderChange}
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Color
                </label>
                <DebounceInput
                  id="color"
                  type="color"
                  className="overflow-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-0"
                  value={chartData.color}
                  onChange={handlers.handleColorChange}
                  element={Input}
                  debounceTimeout={300}
                />
              </div>
            </>
          )}

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              disabled={!hasChanged}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Save
            </button>
            {chart && (
              <button
                onClick={handleRemove}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default EditForm;
