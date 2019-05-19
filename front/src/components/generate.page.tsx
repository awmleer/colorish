import {ChangeEvent, memo} from 'react'
import {GenerateStore} from '../stores/generate.store'
import {Provider, useStore, withProvider} from 'reto'
import {Logo} from './previews/logo'
import {Palette} from './palette'
import {Poster} from './previews/poster'
import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router'
import {SchemaStore} from '../stores/schema.store'

const Space = styled.div`
  height: 30px;
`

const Info = styled.div`
  text-align: center;
  margin-top: 12px;
`

export const GeneratePage = withProvider({
  of: GenerateStore
})(withRouter(memo(function GeneratePage(props) {
  const generateStore = useStore(GenerateStore)
  const {schema, config} = generateStore.state
  
  function generate() {
    generateStore.generate()
  }
  
  function generateASimilarOne() {
    generateStore.generate(schema.networkId)
  }
  
  function changeNetworkId(event: ChangeEvent<HTMLInputElement>) {
    generateStore.mutate(state => {
      state.config.networkId = event.target.value
    })
  }
  
  return (
    <section className='section'>
      <div className='container'>
        <div className='has-text-centered'>
          <button className='button is-success is-large' onClick={generate}>
                <span className='icon is-small'>
                  <i className='fas fa-bong'/>
                </span>
            <span>Generate</span>
          </button>
          &nbsp;
          <button className='button is-large' onClick={generateASimilarOne}>
                <span className='icon is-small'>
                  <i className='fas fa-sync-alt'/>
                </span>
            <span>Generate a Similar One</span>
          </button>
        </div>
        {/*<div className='has-text-centered'>*/}
        {/*  <input className='input' onChange={changeNetworkId} value={config.networkId}/>*/}
        {/*</div>*/}
        {schema && (
          <Provider of={SchemaStore} args={[schema]} key={schema.id}>
            <Info>
              Generated using model <b>#{schema.networkId}</b> in <b>{schema.time.toFixed(2)}</b>ms.
            </Info>
            <Space/>
            <Palette/>
            <Space/>
            <Poster/>
            <Space/>
            <Logo/>
          </Provider>
        )}
      </div>
    </section>
  )
})))
