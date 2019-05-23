import {withRouter} from 'react-router'
import React, {memo, useEffect, useState} from 'react'
import {Scheme} from '../classes/scheme'
import {apiService} from '../services/api.service'
import {SchemeList} from './scheme-list'
import {useStore} from 'reto'
import {AccountStore} from '../stores/account.store'

export const LikesPage = withRouter(memo(function Likes() {
  const accountStore = useStore(AccountStore)
  const {user} = accountStore.state
  const [schemes, setSchemes] = useState<Scheme[]>([])
  
  async function fetchData() {
    setSchemes(await apiService.get('likes/'))
  }
  
  useEffect(() => {
    if (!user) return
    fetchData()
  }, [user])
  
  return (
    <section className='section'>
      <div className='container'>
        {user ? (
          schemes && (
            <SchemeList schemes={schemes}/>
          )
        ) : (
          <p>Please login first to see your likes.</p>
        )}
      </div>
    </section>
  )
}))
