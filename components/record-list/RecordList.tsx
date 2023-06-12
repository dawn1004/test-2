import { Record } from '@/interfaces/Record'
import { useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { data } from 'autoprefixer'
import Link from 'next/link'
import React, { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import EmptyState from '../EmptyState'

interface RecordListProps {
  records: Record[]
  checkedIds: string[],
  setCheckedIds: Dispatch<SetStateAction<string[]>>
  handleMultiDelete: () => void
}

const RecordList: FC<RecordListProps> = ({records, checkedIds,  setCheckedIds, handleMultiDelete}) => {
  const queryClient = useQueryClient()
  const [allChecked, setAllChecked] = useState(false)
  const [checkBoxKey, setCheckBoxKey] = useState(uuidv4())
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null)

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return fetch(`/api/records/${id}`, {
        method: 'DELETE'
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['records'])
    }
  })

  const handleDelete = (id?: string) => {
    if(id)
    mutation.mutate(id)
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id?: string) => {
    console.log()
    if(e.target.checked){
      setCheckedIds((prevVal) => [...prevVal, String(id)])    
      return  
    }
    setCheckedIds((prevVal) => prevVal.filter(item => item !== id ))      
  }

  const handleCheckAllToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllChecked(e.target.checked)
    setCheckBoxKey(uuidv4())
    if(e.target.checked)
    setCheckedIds(records.map(rec => String(rec.id)))
    else
    setCheckedIds([])
  }

  const handleMultiDeleteClick = () => {
    handleMultiDelete()
    if(selectAllCheckboxRef.current?.checked)
    selectAllCheckboxRef.current?.click()
  }

  return (
    <div className='md:px-10 px-4 pb-4 mt-6 grid grid-cols-12 gap-4'>
      <div className='col-span-12 flex items-center justify-between px-4'>
        {
          checkedIds.length? 
          <span 
          onClick={handleMultiDeleteClick} 
            className='bg-red-600 border border-red-600 text-white md:px-6 px-4 py-1 text-xs rounded-xl hover:bg-white hover:text-red-600 transition-all cursor-pointer'
          >
            Delete all seleted items
          </span>: <div></div>
        } 
        {
          records.length?
          <input ref={selectAllCheckboxRef} type="checkbox" name="" id="" className='w-4 h-4 cursor-pointer' onChange={handleCheckAllToggle} />:
          null
        }
      </div>
      <div key={checkBoxKey} className='col-span-12 grid grid-cols-12 gap-4'>
        {
          records.length?
          records.map(record => 
          <div key={record.id} className={`col-span-12 bg-gray-50 shadow-sm border rounded-lg`}>
            <div className='w-full border-b px-4 py-3 flex md:items-center justify-between md:flex-row flex-col-reverse'>
              <h5 className={`font-semibold text-lg text-gray-600 ${record.isActive? null:'line-through'}`}>{record.name}</h5>
              <div className='flex items-center md:justify-normal justify-end'>
                <button onClick={()=>{handleDelete(record.id)}} className='text-gray-600 hover:text-red-700 text-sm mr-2 hover:bg-red-100 px-2 rounded'>Delete</button>   
                <Link href={'/edit/'+String(record.id)} className='text-gray-600 hover:text-gray-800 text-sm mr-2 hover:bg-gray-200 px-2 rounded'>Edit</Link>   
                <input type="checkbox" name="" id="" className='w-4 h-4 cursor-pointer' onChange={(e)=>{handleCheckboxChange(e, record.id)}} defaultChecked={allChecked} />            
              </div>
            </div>
            <div className={`px-4 py-4 ${record.isActive? null:'line-through'}`}>
              <p>{record.description}</p>
            </div>
          </div> 
          ):
          <EmptyState /> 
        }        
      </div>

    </div>
  )
}

export default RecordList