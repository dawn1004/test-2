import React, { FC, useEffect, useRef, useState } from 'react';

interface InputTextProps {
  label: string;
  defaultValue?: string;
  required?: boolean;
}

const InputText: FC<InputTextProps> = ({ label, defaultValue = '', required=false }) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultValue !== '') {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="name" className="text-gray-600">
        {label}
      </label>
      <input
        ref={inputRef}
        type="text"
        className="border rounded-md px-4 py-2"
        value={value}
        onChange={handleInputChange}
        required={required}
      />
    </div>
  );
};

export default InputText;
