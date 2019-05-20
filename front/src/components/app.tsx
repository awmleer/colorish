import * as React from 'react'
import {NavBar} from './nav-bar'
import {GlobalStyle} from './global-style'

import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import {GeneratePage} from './generate.page'
import {HomePage} from './home.page'
import {NetworksPage} from './networks.page'
import {NetworkDetailPage} from './network-detail.page'

export const App = function() {
  return (
    <Router>
      <>
        <GlobalStyle/>
        <NavBar/>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/generate' component={GeneratePage} exact/>
          <Route path='/networks' component={NetworksPage} exact/>
          <Route path='/networks/:id' component={NetworkDetailPage} exact/>
          <Route path='/likes' component={GeneratePage} exact/>
        </Switch>
      </>
    </Router>
  )
}
