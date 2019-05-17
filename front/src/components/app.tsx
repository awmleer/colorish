import * as React from 'react'
import styled from 'styled-components'
import {NavBar} from './nav-bar'
import {SchemaStore} from '../stores/schema.store'
import {Palette} from './palette'
import {Poster} from './previews/poster'
import {GlobalStyle} from './global-style'
import {useStore, withProvider} from 'reto'
import {ChangeEvent} from 'react'

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
  const {schema, config} = schemaStore.state
  
  function generate() {
    schemaStore.generate()
  }
  
  function changeNetworkId(event: ChangeEvent<HTMLInputElement>) {
    schemaStore.mutate(state => {
      state.config.networkId = event.target.value
    })
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
          <div className="has-text-centered">
            <input className="input" onChange={changeNetworkId} value={config.networkId}/>
          </div>
          {schema && (
            <Info>
              Generated using model {schema.network} in {schema.time.toFixed(2)}ms.
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
