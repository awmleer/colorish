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

export const PopularSchemas = memo(function PopularSchemas() {
  const [schemas, setSchemas] = useState<Schema[]>([])
  
  async function fetchData() {
    setSchemas(await apiService.get('popular/'))
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <section className='section'>
      <div className='container'>
        <h2 className='title'>Popular Color Schemas</h2>
        {schemas.map((schema) => (
          <Provider of={SchemaStore} args={[schema]} key={schema.id}>
            <PaletteContainer>
              <Palette/>
            </PaletteContainer>
          </Provider>
        ))}
      </div>
    </section>
  )
})
