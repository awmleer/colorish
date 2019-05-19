import {memo} from 'react'
import * as React from 'react'
import styled from 'styled-components'


const Root = styled.nav`
  border-bottom: solid 2px #f0f0f0;
`

const Logo = styled.h1.attrs({
  'className': 'navbar-item title is-4'
})`
  font-family: 'Raleway', sans-serif;
`

export const NavBar = memo(function NavBar(){
  return (
    <Root className='navbar' role='navigation'>
      <div className='container'>
        <div className='navbar-brand'>
          <Logo>Colorish</Logo>
        </div>
        
        <div className='navbar-menu'>
          <div className='navbar-start'>
            <a className='navbar-item'>
              Test
            </a>
          </div>
        </div>
      </div>
    </Root>
  )
})
