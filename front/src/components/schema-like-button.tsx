import React, {memo} from 'react'
import {useStore} from 'reto'
import {SchemaStore} from '../stores/schema.store'
import {MouseEvent} from 'react'

export const SchemaLikeButton = memo(function SchemaLikeButton() {
  const schemaStore = useStore(SchemaStore)
  const {schema} = schemaStore.state
  
  return (
    <button className={`button is-dark is-outlined`} onClick={schemaStore.toggleLike}>
      <span className='icon'>
        <i className={`${schema.liked ? 'fas' : 'far'} fa-heart`}/>
      </span>
      <span>Like</span>
    </button>
  )
})
