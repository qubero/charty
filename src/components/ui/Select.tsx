import { memo } from "react";

interface SelectProps extends React.ButtonHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const Select = ({ options, ...props }: SelectProps) => {
  return (
    <select {...props}>
      {Boolean(options.length) &&
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
    </select>
  );
};

const MemoizedSelect = memo(Select);

export default MemoizedSelect;
