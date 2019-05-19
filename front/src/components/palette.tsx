import styled from 'styled-components'
import * as React from 'react'
import {Color} from '../classes/color'
import {SchemaStore} from '../stores/schema.store'
import {memo, useRef} from 'react'
import {useStore} from 'reto'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
`


const Info = styled.div``

const ColorBlock = styled.div<{
  c: Color
}>`
  flex: auto;
  height: 100%;
  background-color: ${props => props.c.str};
  position: relative;
  overflow: hidden;
  > ${Info} {
    opacity: 0;
    transition: opacity ease 0.2s;
    &, & > a {
      color: ${props => props.c.hsl.lightness > 0.6 ? '#3b3b3b' : '#f2f2f2'};
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

const CopyTarget = styled.input`
  position: absolute;
  bottom: -30px;
`

export const ColorCard = memo<{color: Color}>(function Card(props){
  const copyTargetRef = useRef<HTMLInputElement>()
  function copy() {
    if (!copyTargetRef.current) return
    copyTargetRef.current.select()
    console.log(document.execCommand('copy'))
    console.log(1)
  }
  
  return (
    <ColorBlock c={props.color}>
      <Info>
        <CopyTarget ref={copyTargetRef} defaultValue={props.color.str}/>
        {props.color.str} <a onClick={copy}><i className='fas fa-clone'/></a><br/>
        hue: {props.color.hsl.hue.toFixed(0)}<br/>
        saturation: {props.color.hsl.saturation.toFixed(2)}<br/>
        lightness: {props.color.hsl.lightness.toFixed(2)}<br/>
      </Info>
    </ColorBlock>
  )
})

export const Palette = memo(function Palette() {
  const schemaStore = useStore(SchemaStore)
  const {schema} = schemaStore.state
  if (schema === null) return null
  
  const {colors} = schema
  
  return colors.length > 0 && (
    <Container>
      {colors.map((color, index) => (
        <ColorCard color={color} key={color.str}/>
      ))}
    </Container>
  )
})
