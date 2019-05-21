import React, {memo} from 'react'
import {Schema} from '../classes/schema'
import {Provider} from 'reto'
import {SchemaStore} from '../stores/schema.store'
import {Palette} from './palette'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {SchemaLikeButton} from './schema-like-button'

const Container = styled.div`
  margin-bottom: 36px;
  > div.level {
    margin-top: 12px;
    > .level-right > .button {
      margin-left: 12px;
    }
  }
`

export const SchemaList = memo<{
  schemas: Schema[]
}>(function SchemaList(props) {
  return (
    <>
      {props.schemas.map((schema) => (
        <Provider of={SchemaStore} args={[schema]} key={schema.id}>
          <Container>
            <Palette/>
            <div className='level'>
              <div className='level-left'>
                #{schema.id}
              </div>
              <div className='level-right'>
                <Link to={`/schema/${schema.id}`} className='button is-dark is-outlined'>
                  <span className='icon'>
                    <i className='far fa-eye'/>
                  </span>
                  <span>View</span>
                </Link>
                <SchemaLikeButton/>
              </div>
            </div>
          </Container>
        </Provider>
      ))}
    </>
  )
})
