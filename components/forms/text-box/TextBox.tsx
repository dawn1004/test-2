// import React, { FC } from 'react'

// interface TextBoxProps {
//   label: string;
//   defaultValue?: string;
// }

// const TextBox: FC<TextBoxProps> = ({label, defaultValue=''}) => {
//   return (
//   <div className='flex flex-col mb-4'>
//     <label htmlFor="name" className='text-gray-600'>{label}</label>
//     <textarea className='border rounded-md px-4 py-2' defaultValue={defaultValue} />
//   </div>
//   )
// }

// export default TextBox



import React, { FC, useEffect, useRef, useState } from 'react';

interface TextBoxProps {
  label: string;
  defaultValue?: string;
  required?: boolean;
}

const TextBox: FC<TextBoxProps> = ({ label, defaultValue = '', required=false }) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="name" className="text-gray-600">
        {label}
      </label>
      <textarea
        ref={inputRef}
        className="border rounded-md px-4 py-2"
        value={value}
        onChange={handleInputChange}
        required={required}
      />
    </div>
  );
};

export default TextBox;
