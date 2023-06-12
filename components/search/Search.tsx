import React, { Dispatch, FC, SetStateAction } from 'react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'

interface SearchProps {
  nameSetter: Dispatch<SetStateAction<string>>
  filterModalSetter: Dispatch<SetStateAction<boolean>>
}

const Search: FC<SearchProps> = ({nameSetter, filterModalSetter}) => {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    nameSetter(e.target.value)
  }

  return (
    <div className='mt-8 flex items-center md:px-10 px-4'>
      <input 
        type="text" 
        placeholder='search' 
        className='border flex-1 px-4 py-2 mr-2 rounded-md'
        onChange={handleOnChange}
      />
      <AdjustmentsHorizontalIcon onClick={()=>{filterModalSetter(true)}} className='w-10 h-10 text-gray-700 hover:text-gray-900 cursor-pointer hover:bg-gray-100 transition-all p-1 rounded-md' />
    </div>
  )
}

export default Search