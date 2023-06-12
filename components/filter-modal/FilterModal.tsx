import { useQueryClient } from '@tanstack/react-query'
import React, { Dispatch, FC, SetStateAction } from 'react'
import Select from '../forms/select/Select'

interface FilterModalProps {
  visibleSetter: Dispatch<SetStateAction<boolean>>
  setFilterActiveValue: Dispatch<SetStateAction<string>>
}

const FilterModal: FC<FilterModalProps> = ({visibleSetter, setFilterActiveValue}) => {
  const queryClient = useQueryClient()

  const handleHideModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    visibleSetter(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const selectValue = (e.target as unknown as HTMLInputElement[])[0]?.value
    setFilterActiveValue(selectValue)
    queryClient.invalidateQueries(['records'])
    visibleSetter(false)
  }

  return (
    <div onClick={handleHideModal} className='bg-black bg-opacity-60 absolute top-0 left-0 w-full h-screen flex flex-col items-center'>
      <div className='bg-white w-96 md:px-6 px-4 py-6 mt-40 rounded-md' onClick={(e)=>{e.stopPropagation();}}>
        <div className='mb-6 border-b'>
          <h3 className='font-semibold text-xl text-gray-700'>Filters:</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <Select label="Active / Inactive" options={['All', 'Active', 'Inactive']} defaultValue={'All'} />
          <button className='bg-blue-600 border-2 border-white text-white md:px-6 px-4 py-2 md:text-base text-sm rounded-lg hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600 transition-all'>Save</button>           
        </form>
   

      </div>
    </div>
  )
}

export default FilterModal