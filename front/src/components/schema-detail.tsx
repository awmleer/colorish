import React, {memo} from 'react'
import {Provider, useStore} from 'reto'
import {SchemaStore} from '../stores/schema.store'
import {Palette} from './palette'
import {Poster} from './previews/poster'
import {Logo} from './previews/logo'
import {Schema} from '../classes/schema'
import styled from 'styled-components'
import {SchemaLikeButton} from './schema-like-button'

const Space = styled.div`
  height: 30px;
`

interface Props {
  schema: Schema
}

export const SchemaDetail = memo<Props>(function SchemaDetail(props) {
  return (
    <Provider of={SchemaStore} args={[props.schema]} key={props.schema.id}>
      <Space/>
      <SchemaLikeButton/>
      <Space/>
      <Palette/>
      <Space/>
      <Poster/>
      <Space/>
      <Logo/>
    </Provider>
  )
})
