import styled from 'styled-components'
import * as React from 'react'
import {Color} from '../classes/color'
import {SchemaStore} from '../stores/schema.store'
import {memo} from 'react'
import {useStore} from 'reto'
import {readableColor} from 'polished'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
`


const Info = styled.div`

`

const ColorBlock = styled.div<{
  c: Color
}>`
  flex: auto;
  height: 100%;
  background-color: ${props => props.c.str};
  position: relative;
  > ${Info} {
    opacity: 0;
    transition: opacity ease 0.2s;
    &, & > a {
      color: ${props => props.c.hsl.lightness > 0.6 ? '#3b3b3b' : '#e8e8e8'};
    }
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 16px;
  }
  :hover > ${Info} {
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
          <Info>
            {color.str} <a><i className="fas fa-clone"/></a><br/>
            hue: {color.hsl.hue.toFixed(0)}<br/>
            saturation: {color.hsl.saturation.toFixed(2)}<br/>
            lightness: {color.hsl.lightness.toFixed(2)}<br/>
          </Info>
        </ColorBlock>
      ))}
    </Container>
  )
})
