import { Record } from '@/interfaces/Record';
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteRecord, records, updateRecord } from '.';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

  switch(req.method){
    case 'GET': {
      try {
        return res.status(200).json({categories: [
          {
            category: 'Personal',
            color: 'red-500'
          },
          {
            category: 'Bussiness',
            color: 'blue-500'
          },
          {
            category: 'Work',
            color: 'purple-500'
          }
        ]})        
      } catch (error) {
        return res.status(400)
      }
    }
  }
}