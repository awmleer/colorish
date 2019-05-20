import {withRouter} from 'react-router'
import React, {memo, useEffect, useState} from 'react'
import {Schema} from '../classes/schema'
import {apiService} from '../services/api.service'
import {SchemaList} from './schema-list'
import {useStore} from 'reto'
import {AccountStore} from '../stores/account.store'

export const LikesPage = withRouter(memo(function Likes() {
  const accountStore = useStore(AccountStore)
  const {user} = accountStore.state
  const [schemas, setSchemas] = useState<Schema[]>([])
  
  async function fetchData() {
    setSchemas(await apiService.get('likes/'))
  }
  
  useEffect(() => {
    if (!user) return
    fetchData()
  }, [user])
  
  return (
    <section className='section'>
      <div className='container'>
        {user ? (
          schemas && (
            <SchemaList schemas={schemas}/>
          )
        ) : (
          <p>Please login first to see your likes.</p>
        )}
      </div>
    </section>
  )
}))
