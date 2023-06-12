import { Record } from '@/interfaces/Record';
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';
import jsonfile from 'jsonfile'


const file = 'records.json'

export let records: Record[] = []

jsonfile.readFile(file, function (err, obj) {
  if (err) console.error(err)
  console.dir(obj)
  records = obj.records
})

// export let records: Record[] = [
//   {
//     id: '123-23-a-3asd-34',
//     name: 'Mag lalaba ako',
//     description: 'Corn asdasd',
//     category: 'Bussiness',
//     isActive: false,
//     created: 'Sun Jun 11 2023 21:40:15 GMT+0800 (Philippine Standard Time)'
//   },
//   {
//     id: '23asd-3asd-35as-3',
//     name: 'Study ako',
//     description: 'Salad asdasd',
//     category: 'Work',
//     isActive: true,
//     created: 'asdasdasdasd'
//   }
// ];

export const deleteRecord = (id: string) => {
  records = records.filter(record => record.id !== id)
}

export const updateRecord = (id: string, newRecord: Record) => {
  records = records.map(record => {
    if(record.id !== id){
      return record
    }
    return {
      ...newRecord,
      id
    }
  })
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { name, filterActive },
    body,
    method,
  } = req;

  switch(req.method){
    case 'GET': {
      try {
        let recordResult: Record[] = records;

        if(name){
          recordResult = recordResult.filter(record => record.name.toLowerCase().includes(String(name).toLowerCase()))
        }
        if(filterActive !== 'All') {
          recordResult = recordResult.filter(record => record.isActive === (filterActive === 'Active'? true: false))
        }

        return res.status(200).json({ records: recordResult })
      } catch (error) {
        return res.status(400)
      }
    }
    case 'POST': {
      try {
        if(body){
          records.unshift({
            ...body,
            id: uuidv4()
          })
        }
        return res.status(200).json({ records })        
      } catch (error) {
        return res.status(400)
      }
    }
    case 'PUT': { // multiple delete
      try {
        if(body.ids){  //[12,44] ids
          body.ids.forEach((id: string) => {
            deleteRecord(String(id))  
          });
        }
        return res.status(200).json({ records })        
      } catch (error) {
        return res.status(400)
      }

    }
  }

}