import styled from 'styled-components'
import * as React from 'react'
import {Color} from '../classes/color'
import {SchemaStore} from '../stores/schema.store'
import {memo} from 'react'
import {useStore} from 'reto'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
`


const ColorText = styled.div`

`

const ColorBlock = styled.div<{
  c: Color
}>`
  flex: auto;
  height: 100%;
  background-color: ${props => props.c.str};
  > ${ColorText} {
    opacity: 0;
    transition: opacity ease 0.2s;
  }
  :hover > ${ColorText} {
    opacity: 1;
  }
`


export const Palette = memo(function Palette() {
  const schemaStore = useStore(SchemaStore)
  const {schema} = schemaStore.state
  if (schema === null) return null
  
  const {colors} = schema
  
  return colors.length > 0 && (
    <Container>
      {colors.map((color, index) => (
        <ColorBlock c={color} key={index}>
          <ColorText></ColorText>
        </ColorBlock>
      ))}
    </Container>
  )
})
