import React, {memo, useEffect, useState} from 'react'
import {Schema} from '../classes/schema'
import {apiService} from '../services/api.service'
import {SchemaList} from './schema-list'

interface Props {
  networkId?: string
}

export const PopularSchemas = memo<Props>(function PopularSchemas(props) {
  const [schemas, setSchemas] = useState<Schema[]>([])
  
  async function fetchData() {
    setSchemas(await apiService.get(props.networkId ? `network/${props.networkId}/popular/` : 'popular/'))
  }
  
  useEffect(() => {
    fetchData()
  }, [props.networkId])
  
  return schemas && (
    <SchemaList schemas={schemas}/>
  )
})
