import {memo, useEffect, useState} from 'react'
import {withRouter} from 'react-router'
import React from 'react';
import {Network} from '../classes/network'
import {apiService} from '../services/api.service'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 16px;
`

export const NetworksPage = withRouter(memo(function NetworksPage() {
  const [networks, setNetworks] = useState<Network[]>([])
  
  async function fetchData() {
    setNetworks(await apiService.get('networks/'))
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <section className='section'>
      <div className='container'>
        {networks.map(network => (
          <Container key={network.networkId}>
            <Link to={`/network/${network.networkId}`} className='is-size-4'>
              #{network.networkId}
            </Link>
            <p><b>{network.schemeCount}</b> scheme(s) are generated using this models.</p>
          </Container>
        ))}
      </div>
    </section>
  )
}))
