import {RouteComponentProps, withRouter} from 'react-router'
import {memo, useEffect, useState} from 'react'
import * as React from 'react'
import {Network} from '../classes/network'
import {apiService} from '../services/api.service'
import {PopularSchemas} from './popular-schemas'

interface Props extends RouteComponentProps<{
  id: string
}>{}

export const NetworkDetailPage = withRouter<Props>(memo(function NetworkDetailPage(props) {
  const [network, setNetwork] = useState<Network>(null)
  
  
  async function fetchData() {
    setNetwork(await apiService.get(`network/${props.match.params.id}`))
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return network && (
    <>
      <section className='section'>
        <div className='container'>
          <h2 className='title'>Network #{network.networkId}</h2>
          <p><b>{network.schemaCount}</b> schema(s) are generated using this models.</p>
        </div>
      </section>
      <section className='section'>
        <div className='container'>
          <h3 className='title is-4'>Training Log</h3>
        </div>
      </section>
      <section className='section'>
        <div className='container'>
          <h3 className='title is-4'>Popular Schemas</h3>
          <PopularSchemas networkId={network.networkId}/>
        </div>
      </section>
    </>
  )
}))
