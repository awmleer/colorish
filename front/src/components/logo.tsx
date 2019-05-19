import {memo} from 'react'
import styled from 'styled-components'
import * as React from 'react'
import {Color} from '../classes/color'
import {useStore} from 'reto'
import {SchemaStore} from '../stores/schema.store'
import {lighten} from 'polished'

const Container = styled.div<{c: Color}>`
  background: ${props => props.c.str};
  width:400px;
  height:400px;
  margin-top: 30px;
  margin-right: auto;
  margin-left: auto;
  border-radius:10px;
  display: flex;
  justify-content: center;
  align-items:center;
`

const Wrapper = styled.div`
  width: 180px;
  height: 270px;
  display: flex;
  flex-wrap:wrap;
`

const Part = styled.div`
  width:90px;
  height:90px;
`
const Part1 = styled(Part)<{c: Color}>`
  border-top-left-radius:50px;
  border-bottom-left-radius:50px;
  background: ${props => props.c.str};
`
const Part2 = styled(Part)<{c: Color}>`
  border-top-right-radius:50px;
  border-bottom-right-radius:50px;
  background: ${props => lighten(0.2, props.c.str)};
`
const Part3 = styled(Part)<{c: Color}>`
  border-top-left-radius:50px;
  border-bottom-left-radius:50px;
  background: ${props => props.c.str};
`
const Part4 = styled(Part)<{c: Color}>`
  border-radius:50px;
  background: ${props => props.c.str};
`
const Part5 = styled(Part)<{c: Color}>`
  border-top-left-radius:50px;
  border-bottom-left-radius:50px;
  border-bottom-right-radius:50px;
  background: ${props => props.c.str};
`


export const Logo = memo(function Logo(){
  const schemaStore = useStore(SchemaStore)
  const {schema} = schemaStore.state
  if (schema === null) return null
  const {colors} = schema
  
  let background = colors[0]
  function getColorRank(c: Color) {
    return c.hsl.lightness + c.hsl.saturation * 0.5
  }
  for (const c of colors) {
    if (getColorRank(c) < getColorRank(background)) {
      background = c
    }
  }
  
  const others = []
  for (const c of colors) {
    if (c !== background) others.push(c)
  }
  
  return (
    <Container c={background}>
      <Wrapper>
        <Part1 c={others[0]}/>
        <Part2 c={others[0]}/>
        <Part3 c={others[1]}/>
        <Part4 c={others[2]}/>
        <Part5 c={others[3]}/>
      </Wrapper>
    </Container>
  )
})
