import {ChangeEvent, memo} from 'react'
import {SchemaStore} from '../stores/schema.store'
import {useStore, withProvider} from 'reto'
import {Logo} from './logo'
import {Palette} from './palette'
import {Poster} from './previews/poster'
import React from 'react';
import styled from 'styled-components'

const Space = styled.div`
  height: 30px;
`

const Info = styled.div`
  text-align: center;
  margin-top: 12px;
`

export const GeneratePage = withProvider({
  of: SchemaStore
})(memo(function GeneratePage(props) {
  const schemaStore = useStore(SchemaStore)
  const {schema, config} = schemaStore.state
  
  function generate() {
    schemaStore.generate()
  }
  
  function generateASimilarOne() {
    schemaStore.generate(schema.networkId)
  }
  
  function changeNetworkId(event: ChangeEvent<HTMLInputElement>) {
    schemaStore.mutate(state => {
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
          <Info>
            Generated using model <b>#{schema.networkId}</b> in <b>{schema.time.toFixed(2)}</b>ms.
          </Info>
        )}
        <Space/>
        <Palette/>
        <Space/>
        <Poster/>
        <Space/>
        <Logo/>
      </div>
    </section>
  )
}))