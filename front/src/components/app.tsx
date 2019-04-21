import {FC} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {NavBar} from './nav-bar'

const Header = styled.div`
  padding: 12px;
`

export const App: FC = function() {
  return (
    <>
      <NavBar/>
    </>
  )
}
