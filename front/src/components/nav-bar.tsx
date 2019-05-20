import * as React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {useStore} from 'reto'
import {AccountStore} from '../stores/account.store'

const Root = styled.nav`
  border-bottom: solid 2px #f0f0f0;
`

export const NavBar = function() {
  const accountStore = useStore(AccountStore)
  const {user} = accountStore.state
  
  return (
    <Root className='navbar is-dark' role='navigation'>
      <div className='container'>
        <div className='navbar-brand'>
          <h1 className='navbar-item title is-4 font-raleway'>Colorish</h1>
        </div>
        
        <div className='navbar-menu'>
          <div className='navbar-start'>
            <NavLink to='/' className='navbar-item' activeClassName='is-active' exact>Home</NavLink>
            <NavLink to='/generate' className='navbar-item' activeClassName='is-active'>Generate</NavLink>
            <NavLink to='/networks' className='navbar-item' activeClassName='is-active'>Networks</NavLink>
            <NavLink to='/likes' className='navbar-item' activeClassName='is-active'>Likes</NavLink>
          </div>
  
          <div className='navbar-end'>
            {user ? (
              <NavLink to='/me' className='navbar-item' activeClassName='is-active'>{user.username}</NavLink>
            ) : (
              <NavLink to='/login' className='navbar-item' activeClassName='is-active'>Login</NavLink>
            )}
          </div>
        </div>
      </div>
    </Root>
  )
}
