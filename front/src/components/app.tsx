import * as React from 'react'
import styled from 'styled-components'
import {NavBar} from './nav-bar'
import {SchemaStore} from '../stores/schema.store'
import {Palette} from './palette'
import {Poster} from './previews/poster'
import {GlobalStyle} from './global-style'
import {useStore, withProvider} from 'reto'

const Header = styled.div`
  padding: 12px;
`

const PaletteContainer = styled.div`
  margin: 30px 0;
`

const Space = styled.div`
  height: 30px;
`

export const App = withProvider({
  of: SchemaStore
})(function App() {
    const schemaStore = useStore(SchemaStore)
    return (
      <>
        <GlobalStyle/>
        <NavBar/>
        <section className="section">
          <div className="container">
            <div className="has-text-centered">
              <button className="button is-success is-large" onClick={schemaStore.generate}>
                <span className="icon is-small">
                  <i className="fas fa-bong"/>
                </span>
                <span>Generate</span>
              </button>
            </div>
            <Space/>
            <Palette/>
            <Space/>
            <Poster/>
          </div>
        </section>
      </>
    )
  }
)
