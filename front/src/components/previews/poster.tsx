import {memo, useMemo} from 'react'
import {SchemeStore} from '../../stores/scheme.store'
import styled, {css} from 'styled-components'
import * as React from 'react'
import {Color} from '../../classes/color'
import {rgb, setLightness, setSaturation} from 'polished'
import {useStore} from 'reto'
import _ from 'lodash';

interface ColoredProps {
  c: Color
}

const Root = styled.div<ColoredProps>`
  background-color: ${props => props.c.str};
  padding: 80px 100px;
  font-family: 'Ubuntu', serif;
  position: relative;
  overflow: hidden;
`

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Logo = styled.div<ColoredProps>`
  font-size: 136px;
  margin-bottom: 1em;
  text-align: center;
  > i {
    color: ${props => props.c.str};
  }
  > span {
    color: #fff;
    display: inline-block;
    margin-left: 0.3em;
    line-height: 1;
    font-size: 156px;
    position: relative;
    bottom: -12px;
  }
`

const Feature = styled.div<ColoredProps>`
  max-width: 200px;
  > * {
    text-align: center;
    display: block;
  }
  > i {
    color: ${props => props.c.str};
    font-size: 56px;
  }
  > span {
    margin-top: 1em;
    font-size: 16px;
  }
`

const Operator = styled.span`
  display: block;
  //padding-top: 2px;
  font-size: 36px;
  text-align: center;
`

const SecondLine = styled.div<ColoredProps>`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  > * {
    flex: auto;
  }
  span {
    color: ${props => setLightness(props.c.hsl.lightness > 0.6 ? 0.3 : 0.8, setSaturation(props.c.hsl.saturation > 0.5 ? 0.3 : props.c.hsl.saturation/2, props.c.str))};
  }
`

const bubble = css`
  position: absolute;
  border-radius: 1000px;
`
const BubbleOne = styled.div<{
  c: Color
}>`
  ${bubble};
  left: -1300px;
  top: -900px;
  width: 1500px;
  height: 1500px;
  z-index: 1;
  background: ${props => props.c.str};
`
const BubbleTwo = styled.div<{
  c: Color
}>`
  ${bubble};
  right: -700px;
  top: -1300px;
  width: 1400px;
  height: 1400px;
  z-index: 1;
  background: ${props => props.c.str};
`
const BubbleThree = styled.div<{
  c: Color
}>`
  ${bubble};
  right: -120px;
  top: 50px;
  width: 280px;
  height: 280px;
  z-index: 0;
  background: ${props => props.c.str};
`


export const Poster = memo(function Poster() {
  const schemeStore = useStore(SchemeStore)
  const {primary, background, secondaries} = schemeStore.state.allocation
  
  return (
    <Root c={background}>
      <Content>
        <Logo c={primary}>
          <i className='fab fa-ubuntu'/>
          <span>Ubuntu</span>
        </Logo>
        <SecondLine c={background}>
          <Feature c={primary}>
            <i className='fas fa-bolt'/>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
          </Feature>
          <Operator>+</Operator>
          <Feature c={primary}>
            <i className='fas fa-eye'/>
            <span>Culpa dicta dolorem excepturi expedita facere fugit.</span>
          </Feature>
          <Operator>=</Operator>
          <Feature c={primary}>
            <i className='fab fa-ubuntu'/>
            <span>Illo impedit ipsum libero magni minus natus nostrum perspiciatis provident.</span>
          </Feature>
        </SecondLine>
        <BubbleOne c={secondaries[0]}/>
        <BubbleTwo c={secondaries[1]}/>
        <BubbleThree c={secondaries[2]}/>
      </Content>
    </Root>
  )
})
