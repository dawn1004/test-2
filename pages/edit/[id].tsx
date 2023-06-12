import InputText from '@/components/forms/input-text/InputText'
import Select from '@/components/forms/select/Select'
import TextBox from '@/components/forms/text-box/TextBox'
import Layout from '@/components/layout/Layout'
import { Categories } from '@/constants/Categories'
import { Record } from '@/interfaces/Record'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit: NextPage = () => {
  const categories = Categories.map(category => category.category)
  const router = useRouter()
  const queryClient = useQueryClient()
  const {id} = router.query
  
  // useEffect(()=>{
  //   recordsQuery.refetch()
  // }, [id])

  const recordsQuery = useQuery({
    queryKey: ['record'],
    queryFn: () =>
      fetch(`http://localhost:3000/api/records/${id}`).then(
        async (res) => await res.json(),
      ),
  })

  const mutation = useMutation({
    mutationFn: (data: Record) => {
      return fetch(`http://localhost:3000/api/records/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['records'])
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: Record = {
      name: (e.target as unknown as HTMLInputElement[])[0]?.value,
      category: (e.target as unknown as HTMLInputElement[])[1]?.value,
      description: (e.target as unknown as HTMLInputElement[])[2]?.value,
      isActive: (e.target as unknown as HTMLInputElement[])[3]?.value === 'true',
      created: (new Date()).toUTCString()
    }

    console.log('data', data)
    mutation.mutate(data)
    toast.success("Successfully update the record.")
  }

  return (
    <Layout>
      <div className='flex items-center justify-left border-b md:px-10 px-4 pb-4'>
        <Link href="/">
          <ArrowLongLeftIcon className='w-8 h-8 mr-4 text-gray-700 rounded-full hover:bg-gray-200 cursor-pointer transition-all' />
        </Link>
        <h1 className='md:text-3xl text-xl font-bold text-gray-700'>Edit Record</h1>
      </div>
      <div className='md:px-10 px-4 pb-4 mt-12'>
        {
          recordsQuery.isLoading || recordsQuery.isError? 
          <div>loading...</div>:
          <form onSubmit={handleSubmit}>
            <InputText label="Name/Title" defaultValue={recordsQuery.data.records[0]?.name || ''} />
            <Select label="Category" options={categories} defaultValue={recordsQuery.data.records[0]?.category || ''} />
            <TextBox label="Description" defaultValue={recordsQuery.data.records[0]?.description || ''} />
            <Select label="Active" options={['true', 'false']} defaultValue={(recordsQuery.data.records[0]?.isActive? 'true': 'false') || ''} />

            <button 
            type='submit'
            className='bg-blue-600 border-2 border-white text-white md:px-6 px-4 py-2 md:text-base text-sm rounded-lg hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600 transition-all'>
              Submit
            </button>    
          </form>
          // <>{JSON.stringify(recordsQuery.data.records[0])}</>
        }

        {/* <>{JSON.stringify(recordsQuery.data.records[0])}</> */}
      </div>
      <ToastContainer position='top-center' />
    </Layout>
  )
}

export default Edit