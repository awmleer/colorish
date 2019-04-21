import {FC, useState} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {NavBar} from './nav-bar'
import {Color} from '../classes/color'

const Header = styled.div`
  padding: 12px;
`

export const App: FC = function() {
  const [schema, setSchema] = useState<Color[]>(null)
  return (
    <>
      <NavBar/>
      <button className="button is-success">
        Generate
      </button>
    </>
  )
}
