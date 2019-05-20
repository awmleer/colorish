import {RouteComponentProps, withRouter} from 'react-router'
import {memo, useState} from 'react'
import * as React from 'react'
import {useStore} from 'reto'
import {AccountStore} from '../stores/account.store'

interface Props extends RouteComponentProps {}

export const LoginPage = withRouter(memo<Props>(function LoginPage(props) {
  const accountStore = useStore(AccountStore)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  if (accountStore.state.user) props.history.push('/')
  
  async function login() {
    const result = await accountStore.login(username, password)
    if (!result) alert('Wrong username or password.')
  }
  
  return (
    <section className='section'>
      <div className='container'>
        <div className='field'>
          <label className='label'>Username</label>
          <div className='control'>
            <input className='input' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
        </div>
        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input className='input' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success" onClick={login}>
              <span className='icon'>
                <i className='fas fa-sign-in-alt'/>
              </span>
              <span>Login</span>
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}))
