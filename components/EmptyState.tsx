import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='col-span-12 py-32 flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-gray-600'>Empty Record...</div>
        <Link href="/add-record" className='bg-blue-600 border-2 mt-2 border-white text-white md:px-6 px-4 py-2 md:text-base text-sm rounded-lg hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600 transition-all'>Add Record</Link>    
      </div>
    </div>
  )
}

export default EmptyState