import {memo} from 'react'
import * as React from 'react'
import styled from 'styled-components'


const Root = styled.nav`
  border-bottom: solid 2px #f0f0f0;
`

export const NavBar = memo(function NavBar(){
  return (
    <Root className="navbar" role="navigation">
      <div className="container">
        <div className="navbar-brand">
          <h1 className="navbar-item title is-4">Colorish</h1>
        </div>
        
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              Test
            </a>
          </div>
        </div>
      </div>
    </Root>
  )
})
