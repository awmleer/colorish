import React, {memo} from 'react'
import {Provider, useStore} from 'reto'
import {SchemeStore} from '../stores/scheme.store'
import {Palette} from './palette'
import {Poster} from './previews/poster'
import {Logo} from './previews/logo'
import {Scheme} from '../classes/scheme'
import styled from 'styled-components'
import {SchemeLikeButton} from './scheme-like-button'

const Space = styled.div`
  height: 30px;
`

interface Props {
  scheme: Scheme
}

export const SchemeDetail = memo<Props>(function SchemeDetail(props) {
  return (
    <Provider of={SchemeStore} args={[props.scheme]} key={props.scheme.id}>
      <Space/>
      <SchemeLikeButton/>
      <Space/>
      <Palette/>
      <Space/>
      <Poster/>
      <Space/>
      <Logo/>
    </Provider>
  )
})
