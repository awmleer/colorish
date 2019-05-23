import React, {memo} from 'react'
import {Scheme} from '../classes/scheme'
import {Provider} from 'reto'
import {SchemeStore} from '../stores/scheme.store'
import {Palette} from './palette'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {SchemeLikeButton} from './scheme-like-button'

const Container = styled.div`
  margin-bottom: 36px;
  > div.level {
    margin-top: 12px;
    > .level-right > .button {
      margin-left: 12px;
    }
  }
`

export const SchemeList = memo<{
  schemes: Scheme[]
}>(function SchemeList(props) {
  return (
    <>
      {props.schemes.map((scheme) => (
        <Provider of={SchemeStore} args={[scheme]} key={scheme.id}>
          <Container>
            <Palette/>
            <div className='level'>
              <div className='level-left'>
                #{scheme.id}
              </div>
              <div className='level-right'>
                <Link to={`/scheme/${scheme.id}`} className='button is-dark is-outlined'>
                  <span className='icon'>
                    <i className='far fa-eye'/>
                  </span>
                  <span>View</span>
                </Link>
                <SchemeLikeButton/>
              </div>
            </div>
          </Container>
        </Provider>
      ))}
    </>
  )
})
