import InputText from '@/components/forms/input-text/InputText'
import Select from '@/components/forms/select/Select'
import TextBox from '@/components/forms/text-box/TextBox'
import Layout from '@/components/layout/Layout'
import { Categories } from '@/constants/Categories'
import { Category } from '@/interfaces/Category'
import { Record } from '@/interfaces/Record'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const AddRecord: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: Record) => {
      return fetch('/api/records', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['records'])
      router.push('/')
    }
  })

  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      fetch(`/api/records/category`).then(
        async (res) => await res.json(),
      ),
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data: Record = {
      name: (e.target as unknown as HTMLInputElement[])[0]?.value,
      category: (e.target as unknown as HTMLInputElement[])[1]?.value,
      description: (e.target as unknown as HTMLInputElement[])[2]?.value,
      isActive: true,
      created: (new Date()).toUTCString()
    }
    mutation.mutate(data)
  }

  return (
    <Layout>
      <div className='flex items-center justify-left border-b md:px-10 px-4 pb-4'>
        <Link href="/">
          <ArrowLongLeftIcon className='w-8 h-8 mr-4 text-gray-700 rounded-full hover:bg-gray-200 cursor-pointer transition-all' />
        </Link>
        <h1 className='md:text-3xl text-xl font-bold text-gray-700'>Add new record</h1>
      </div>
      <div className='md:px-10 px-4 pb-4 mt-12'>
        <form onSubmit={handleSubmit}>
          <InputText label="Name/Title" required />
          {
            categoryQuery.isSuccess?
            <Select label="Category" options={categoryQuery.data.categories.map((category: Category) => category.category)} defaultValue='Personal' required />
            : null
          }
          
          <TextBox label="Description" required />
          <button 
          type='submit'
          className='bg-blue-600 border-2 border-white text-white md:px-6 px-4 py-2 md:text-base text-sm rounded-lg hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600 transition-all'>
            Submit
          </button>    
        </form>
      </div>
    </Layout>
  )
}

export default AddRecord