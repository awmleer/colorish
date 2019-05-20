import React, {memo, useEffect, useState} from 'react'
import {Schema} from '../classes/schema'
import {Provider} from 'reto'
import {SchemaStore} from '../stores/schema.store'
import {Palette} from './palette'
import {apiService} from '../services/api.service'
import styled from 'styled-components'

const PaletteContainer = styled.div`
  margin-bottom: 36px;
`

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
  
  return (
    <>
      {schemas.map((schema) => (
        <Provider of={SchemaStore} args={[schema]} key={schema.id}>
          <PaletteContainer>
            <Palette/>
          </PaletteContainer>
        </Provider>
      ))}
    </>
  )
})
