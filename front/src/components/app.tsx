import {FC, useState} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {NavBar} from './nav-bar'
import {Color} from '../classes/color'
import {useBloc, useStream, withProvider} from 'jorum'
import {SchemaBloc} from '../blocs/schema.bloc'
import {Palette} from './palette'

const Header = styled.div`
  padding: 12px;
`

const PaletteContainer = styled.div`
  margin: 20px 0;
`

export const App = withProvider({
  of: SchemaBloc
})(function App() {
    const schemaBloc = useBloc(SchemaBloc)
    const schema = useStream(schemaBloc.schema$, null)
    return (
      <>
        <NavBar/>
        <section className="section">
          <div className="container">
            <button className="button is-success" onClick={() => {
              schemaBloc.generate$.next()
            }}>
              Generate
            </button>
            <PaletteContainer>
              <Palette/>
            </PaletteContainer>
          </div>
        </section>
      </>
    )
  }
)
