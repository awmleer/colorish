import {FC, useState} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {NavBar} from './nav-bar'
import {Color} from '../classes/color'
import {useBloc, useStream, withProvider} from 'jorum'
import {SchemaBloc} from '../blocs/schema.bloc'

const Header = styled.div`
  padding: 12px;
`

export const App = withProvider({
  of: SchemaBloc
})(function App() {
    const schemaBloc = useBloc(SchemaBloc)
    const schema = useStream(schemaBloc.schema$)
    return (
      <>
        <NavBar/>
        <button className="button is-success" onClick={() => {
          schemaBloc.generate$.next()
        }}>
          Generate
        </button>
        {schema && schema.length}
      </>
    )
  }
)
