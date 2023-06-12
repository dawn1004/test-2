import { Categories } from '@/constants/Categories';
import React, { FC, useEffect, useRef, useState } from 'react'

interface SelectProps {
  label: string;
  options: string[];
  defaultValue?: string;
  required?: boolean;
}

const Select: FC<SelectProps> = ({label, options, defaultValue='', required=false}) => {
  const [value, setValue] = useState(defaultValue);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (defaultValue !== '') {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = value;
    }
  }, [value]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
  <div className='flex flex-col mb-4'>
    <label htmlFor="name" className='text-gray-600'>{label}</label>
    <select 
      name={label} id={label} className='border rounded-md px-4 py-2' 
      ref={selectRef} value={value}
      onChange={handleSelectChange}
      required={required}
    >
      {
        options.map((item, idx) => <option key={item} value={item}>{item}</option>)
      }
    </select>
  </div>
  )
}

export default Select