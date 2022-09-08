import {useState, useCallback} from 'react';

export const useToggle = initialValue => {
  const [value, setValue] = useState(initialValue);
  const toggler = useCallback(() => {setValue(value => !value)}, []);
  return [value, toggler];
};