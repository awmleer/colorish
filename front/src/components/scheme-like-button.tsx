import React, {memo} from 'react'
import {useStore} from 'reto'
import {SchemeStore} from '../stores/scheme.store'
import {AccountStore} from '../stores/account.store'

export const SchemeLikeButton = memo(function SchemeLikeButton() {
  const accountStore = useStore(AccountStore)
  const schemeStore = useStore(SchemeStore)
  const {scheme} = schemeStore.state
  
  function onClick() {
    if (!accountStore.state.user) {
      alert('Please login first.')
      return
    }
    schemeStore.toggleLike()
  }
  
  return (
    <button className={`button is-dark is-outlined`} onClick={onClick}>
      <span className='icon'>
        <i className={`${scheme.liked ? 'fas' : 'far'} fa-heart`}/>
      </span>
      <span>Like</span>
    </button>
  )
})
