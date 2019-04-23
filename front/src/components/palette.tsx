import {suspense, useBloc, useStream} from 'jorum'
import styled from 'styled-components'
import * as React from 'react'
import {Color} from '../classes/color'
import {SchemaBloc} from '../blocs/schema.bloc'
import {rgb} from 'polished'
import {memo} from 'react'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
`

const ColorBlock = styled.div<{
  c: Color
}>`
  flex: auto;
  height: 100%;
  background-color: ${props => rgb(...props.c)};
`

export const Palette = memo(suspense(function Palette() {
  const schemaBloc = useBloc(SchemaBloc)
  const schema = useStream(schemaBloc.schema$)
  
  return () => {
    return (
      <Container>
        {schema.map((color) => (
          <ColorBlock c={color}/>
        ))}
      </Container>
    )
  }
}))
