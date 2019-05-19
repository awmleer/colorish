import * as React from 'react'
import {NavBar} from './nav-bar'
import {GlobalStyle} from './global-style'

import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import {GeneratePage} from './generate.page'
import {HomePage} from './home.page'
import {NetworksPage} from './networks.page'

export const App = function() {
  return (
    <Router>
      <>
        <GlobalStyle/>
        <NavBar/>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/generate' component={GeneratePage}/>
          <Route path='/networks' component={NetworksPage}/>
          <Route path='/likes' component={GeneratePage}/>
        </Switch>
      </>
    </Router>
  )
}
