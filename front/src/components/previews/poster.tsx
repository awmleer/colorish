import {memo} from 'react'
import {suspense, useBloc, useStream} from 'jorum'
import {SchemaBloc} from '../../blocs/schema.bloc'
import styled from 'styled-components'
import * as React from 'react'
import {Color} from '../../classes/color'
import {rgb, setLightness, setSaturation} from 'polished'

interface ColoredProps {
  c: Color
}

const Root = styled.div<ColoredProps>`
  background-color: ${props => rgb(...props.c)};
  padding: 80px 100px;
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
    color: ${props => rgb(...props.c)};
  }
  > span {
    color: #fff;
    display: inline-block;
    margin-left: 0.3em;
  }
`

const Feature = styled.div<ColoredProps>`
  max-width: 200px;
  > * {
    text-align: center;
    display: block;
  }
  > i {
    color: ${props => rgb(...props.c)};
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
    color: ${props => setLightness(0.8, setSaturation(0.3, rgb(...props.c)))};
    //color: ${props => rgb(...props.c)};
  }
`

export const Poster = memo(suspense(function Poster() {
  const schemaBloc = useBloc(SchemaBloc)
  const schema = useStream(schemaBloc.schema$)
  
  return () => {
    return (
      <Root c={schema[0]}>
        <Content>
          <Logo c={schema[4]}>
            <i className="fas fa-cat"/>
            <span>Cater</span>
          </Logo>
          <SecondLine c={schema[0]}>
            <Feature c={schema[3]}>
              <i className="fas fa-bolt"/>
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
            </Feature>
            <Operator>+</Operator>
            <Feature c={schema[3]}>
              <i className="fas fa-eye"/>
              <span>Culpa dicta dolorem excepturi expedita facere fugit.</span>
            </Feature>
            <Operator>=</Operator>
            <Feature c={schema[3]}>
              <i className="fas fa-cat"/>
              <span>Illo impedit ipsum libero magni minus natus nostrum perspiciatis provident.</span>
            </Feature>
          </SecondLine>
        </Content>
      </Root>
    )
  }
}))
