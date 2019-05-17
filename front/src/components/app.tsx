import * as React from 'react'
import styled from 'styled-components'
import {NavBar} from './nav-bar'
import {SchemaStore} from '../stores/schema.store'
import {Palette} from './palette'
import {Poster} from './previews/poster'
import {GlobalStyle} from './global-style'
import {useStore, withProvider} from 'reto'

const Space = styled.div`
  height: 30px;
`

const Info = styled.div`
  text-align: center;
  margin-top: 12px;
`

export const App = withProvider({
  of: SchemaStore
})(function App() {
  const schemaStore = useStore(SchemaStore)
  const {schema} = schemaStore.state
  
  function generate() {
    schemaStore.generate('8')
  }
  
  return (
    <>
      <GlobalStyle/>
      <NavBar/>
      <section className="section">
        <div className="container">
          <div className="has-text-centered">
            <button className="button is-success is-large" onClick={generate}>
                <span className="icon is-small">
                  <i className="fas fa-bong"/>
                </span>
              <span>Generate</span>
            </button>
          </div>
          {schema && (
            <Info>
              Generated using model {schema.network}.
            </Info>
          )}
          <Space/>
          <Palette/>
          <Space/>
          <Poster/>
        </div>
      </section>
    </>
  )
})
