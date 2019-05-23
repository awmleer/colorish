import React, {memo, useEffect, useState} from 'react'
import {Scheme} from '../classes/scheme'
import {apiService} from '../services/api.service'
import {SchemeList} from './scheme-list'

interface Props {
  networkId?: string
}

export const PopularSchemes = memo<Props>(function PopularSchemes(props) {
  const [schemes, setSchemes] = useState<Scheme[]>([])
  
  async function fetchData() {
    setSchemes(await apiService.get(props.networkId ? `network/${props.networkId}/popular/` : 'popular/'))
  }
  
  useEffect(() => {
    fetchData()
  }, [props.networkId])
  
  return schemes && (
    <SchemeList schemes={schemes}/>
  )
})
