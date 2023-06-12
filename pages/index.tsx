import Layout from '@/components/layout/Layout'
import Search from '@/components/search/Search'
import RecordList from '@/components/record-list/RecordList'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Record } from '@/interfaces/Record'
import Link from 'next/link'
import FilterModal from '@/components/filter-modal/FilterModal'

export default function Home() {
  const queryClient = useQueryClient()
  const [searchName, setSearchName] = useState("")
  const [filterModalVisble, setFilterModalVisble] = useState(false)
  const [filterActiveValue, setFilterActiveValue] = useState("All")
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  
  const recordsQuery = useQuery({
    queryKey: ['records'],
    queryFn: () =>
      fetch(`/api/records?${searchName !== ''? `name=${searchName}`: ''}&filterActive=${filterActiveValue}`).then(
        async (res) => await res.json(),
      ),
  })

  const multiDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => {
      return fetch(`/api/records/`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ids})
      })
    },
    onSuccess: () => {
      setCheckedIds([])
      queryClient.invalidateQueries(['records'])
    }
  })

  useEffect(()=>{
    recordsQuery.refetch()
  },[searchName, recordsQuery])

  const handleMultiDelete = () => {
    multiDeleteMutation.mutate(checkedIds)
  }

  return (
    <Layout>
      <>
        <div className='flex items-center justify-between border-b md:px-10 px-4 pb-4'>
          <h1 className='md:text-3xl text-xl font-bold text-gray-700'>React Todo Test</h1>
          <Link href="/add-record" className='bg-blue-600 border-2 border-white text-white md:px-6 px-4 py-2 md:text-base text-sm rounded-lg hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600 transition-all'>Add Record</Link>    
        </div>
        <Search nameSetter={setSearchName} filterModalSetter={setFilterModalVisble} />
        {/* {JSON.stringify(checkedIds)} */}
        {
          recordsQuery.isSuccess?
          <RecordList records={recordsQuery.data.records} checkedIds={checkedIds} setCheckedIds={setCheckedIds} handleMultiDelete={handleMultiDelete} />: null
        }  
        {
          filterModalVisble?
          <FilterModal visibleSetter={setFilterModalVisble} setFilterActiveValue={setFilterActiveValue} defaultVal={filterActiveValue} />:null
        }
      </>
    </Layout>
  )
}

// TODO:
// Fields: id, name, description, category, active/inactive