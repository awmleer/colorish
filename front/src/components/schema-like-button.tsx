import React, {memo} from 'react'
import {useStore} from 'reto'
import {SchemaStore} from '../stores/schema.store'
import {AccountStore} from '../stores/account.store'

export const SchemaLikeButton = memo(function SchemaLikeButton() {
  const accountStore = useStore(AccountStore)
  const schemaStore = useStore(SchemaStore)
  const {schema} = schemaStore.state
  
  function onClick() {
    if (!accountStore.state.user) {
      alert('Please login first.')
      return
    }
    schemaStore.toggleLike()
  }
  
  return (
    <button className={`button is-dark is-outlined`} onClick={onClick}>
      <span className='icon'>
        <i className={`${schema.liked ? 'fas' : 'far'} fa-heart`}/>
      </span>
      <span>Like</span>
    </button>
  )
})
