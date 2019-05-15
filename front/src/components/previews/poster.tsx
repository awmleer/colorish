import {memo, useMemo} from 'react'
import {SchemaStore} from '../../stores/schema.store'
import styled from 'styled-components'
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
  font-family: 'Roboto Slab', serif;
`

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Logo = styled.div<ColoredProps>`
  font-size: 128px;
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
    font-size: 161px;
    position: relative;
    bottom: -13px;
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
    color: ${props => setLightness(0.8, setSaturation(0.3, props.c.str))};
    //color: ${props => props.c.str};
  }
`

export const Poster = memo(function Poster() {
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
  
  let [primary, secondary] = _.sampleSize(others, 2)
  
  return colors.length > 0 && (
    <Root c={background}>
      <Content>
        <Logo c={primary}>
          <i className="fas fa-cat"/>
          <span>Cater</span>
        </Logo>
        <SecondLine c={background}>
          <Feature c={secondary}>
            <i className="fas fa-bolt"/>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
          </Feature>
          <Operator>+</Operator>
          <Feature c={secondary}>
            <i className="fas fa-eye"/>
            <span>Culpa dicta dolorem excepturi expedita facere fugit.</span>
          </Feature>
          <Operator>=</Operator>
          <Feature c={secondary}>
            <i className="fas fa-cat"/>
            <span>Illo impedit ipsum libero magni minus natus nostrum perspiciatis provident.</span>
          </Feature>
        </SecondLine>
      </Content>
    </Root>
  )
})
