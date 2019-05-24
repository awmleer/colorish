import * as React from 'react'
import {NavBar} from './nav-bar'
import {GlobalStyle} from './global-style'

import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import {GeneratePage} from './generate.page'
import {HomePage} from './home.page'
import {NetworksPage} from './networks.page'
import {NetworkPage} from './network.page'
import {Provider} from 'reto'
import {AccountStore} from '../stores/account.store'
import {LoginPage} from './login.page'
import {SchemePage} from './scheme.page'
import {LikesPage} from './likes.page'

export const App = function() {
  return (
    <Provider of={AccountStore}>
      <Router>
        <>
          <GlobalStyle/>
          <NavBar/>
          <Switch>
            <Route path='/' component={HomePage} exact/>
            <Route path='/generate' component={GeneratePage} exact/>
            <Route path='/network' component={NetworksPage} exact/>
            <Route path='/network/:id' component={NetworkPage} exact/>
            <Route path='/scheme/:id' component={SchemePage} exact/>
            <Route path='/likes' component={LikesPage} exact/>
            <Route path='/login' component={LoginPage} exact/>
          </Switch>
        </>
      </Router>
    </Provider>
  )
}
