import { memo } from 'react';

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} />;
};

const MemoizedInput = memo(Input);

export default MemoizedInput;
