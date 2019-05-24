import {ChangeEvent, memo} from 'react'
import {GenerateStore} from '../stores/generate.store'
import {useStore, withProvider} from 'reto'
import React from 'react';
import styled from 'styled-components'
import {RouteComponentProps, withRouter} from 'react-router'
import {SchemeDetail} from './scheme-detail'

const Info = styled.div`
  text-align: center;
  margin-top: 12px;
`

export const GeneratePage = withProvider({
  of: GenerateStore
})(withRouter<RouteComponentProps>(memo(function GeneratePage(props) {
  const generateStore = useStore(GenerateStore)
  const {scheme, config} = generateStore.state
  
  function generate() {
    generateStore.generate()
  }
  
  function generateASimilarOne() {
    generateStore.generate(scheme.networkId)
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
          <button className='button is-dark is-large' onClick={generate}>
            <span className='icon'>
              <i className='fas fa-bong'/>
            </span>
            <span>Generate</span>
          </button>
          &nbsp;
          <button className='button is-large' onClick={generateASimilarOne}>
            <span className='icon'>
              <i className='fas fa-sync-alt'/>
            </span>
            <span>Generate a Similar One</span>
          </button>
        </div>
        {/*<div className='has-text-centered'>*/}
        {/*  <input className='input' onChange={changeNetworkId} value={config.networkId}/>*/}
        {/*</div>*/}
        {scheme && (
          <>
            <Info>
              Generated using network <b>#{scheme.networkId}</b> in <b>{scheme.time.toFixed(2)}</b>ms. Quality point is <b>{scheme.quality.toFixed(4)}.</b>
            </Info>
            <SchemeDetail scheme={scheme}/>
          </>
        )}
      </div>
    </section>
  )
})))
