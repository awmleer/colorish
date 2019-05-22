import {memo} from 'react'
import styled from 'styled-components'
import * as React from 'react'
import {Color} from '../../classes/color'
import {useStore} from 'reto'
import {SchemaStore} from '../../stores/schema.store'
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
  background: ${props => props.c.str};
  opacity: 0.7;
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
  const {primary, background, secondaries} = schemaStore.state.allocation
  
  return (
    <Container c={background}>
      <Wrapper>
        <Part1 c={primary}/>
        <Part2 c={primary}/>
        <Part3 c={secondaries[0]}/>
        <Part4 c={secondaries[1]}/>
        <Part5 c={secondaries[2]}/>
      </Wrapper>
    </Container>
  )
})
