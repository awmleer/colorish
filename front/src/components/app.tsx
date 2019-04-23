import {FC, useState} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {NavBar} from './nav-bar'
import {useBloc, useStream, withProvider} from 'jorum'
import {SchemaBloc} from '../blocs/schema.bloc'
import {Palette} from './palette'
import {Poster} from './previews/poster'

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
  of: SchemaBloc
})(function App() {
    const schemaBloc = useBloc(SchemaBloc)
    return (
      <>
        <NavBar/>
        <section className="section">
          <div className="container">
            <div className="has-text-centered">
              <button className="button is-success is-large" onClick={() => {
                schemaBloc.generate$.next()
              }}>
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
