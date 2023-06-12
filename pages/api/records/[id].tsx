import { Record } from '@/interfaces/Record';
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteRecord, records, updateRecord } from '.';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    method,
  } = req;

  switch(req.method){
    case 'GET': {
      try {
        if(id){
          return res.status(200).json({ records: records.filter(record => record.id === id) })
        }
        return res.status(401)        
      } catch (error) {
        return res.status(400)
      }
    }
    case 'DELETE': {
      try {
        if(id){
          deleteRecord(String(id))
          return res.status(200).json({ records })
        }
        return res.status(401)        
      } catch (error) {
        return res.status(400)
      }
    }
    case 'PATCH': {
      try {
        if(id){
          updateRecord(String(id), body)
          return res.status(200).json({ records })
        }
        return res.status(401)        
      } catch (error) {
        return res.status(400)
      }
    }
  }
}