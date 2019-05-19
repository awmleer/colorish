import * as React from 'react'
import {NavBar} from './nav-bar'
import {GlobalStyle} from './global-style'

import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import {GeneratePage} from './generate.page'

export const App = function() {
  return (
    <>
      <GlobalStyle/>
      <NavBar/>
      <Router>
        <Switch>
          <Redirect from='/' to='/generate' exact/>
          <Route path='/generate' component={GeneratePage}/>
        </Switch>
      </Router>
    </>
  )
}
