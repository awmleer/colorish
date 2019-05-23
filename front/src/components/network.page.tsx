import {RouteComponentProps, withRouter} from 'react-router'
import {memo, useEffect, useRef, useState} from 'react'
import * as React from 'react'
import {Network} from '../classes/network'
import {apiService} from '../services/api.service'
import {PopularSchemes} from './popular-schemes'
import Chart from 'chart.js';

interface Props extends RouteComponentProps<{
  id: string
}>{}

export const NetworkPage = withRouter<Props>(memo(function NetworkDetailPage(props) {
  const [network, setNetwork] = useState<Network>(null)
  const chartCanvasRef = useRef<HTMLCanvasElement>()
  
  async function fetchData() {
    setNetwork(await apiService.get(`network/${props.match.params.id}/`))
  }
  
  useEffect(() => {
    fetchData()
  }, [props.match.params.id])
  
  useEffect(() => {
    if (!network) return
    const labels = []
    const dataD = []
    const dataG = []
    let count = 0
    for (const round of network.log.rounds) {
      if (count%2 === 0) labels.push((count/2 + 1).toString())
      count++
      if (round.mode === 'D') {
        dataD.push(round.loss)
      } else {
        dataG.push(round.loss)
      }
    }
    const ctx = chartCanvasRef.current.getContext('2d')
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Discriminator',
          data: dataD,
          borderColor: 'rgb(255,135,99)',
          backgroundColor: 'rgb(255,193,178)',
          fill: false,
        }, {
          label: 'Generator',
          data: dataG,
          borderColor: 'rgb(115,136,255)',
          backgroundColor: 'rgb(184,190,255)',
          fill: false,
        }]
      }
    })
  }, [network])
  
  return network && (
    <>
      <section className='section'>
        <div className='container'>
          <h2 className='title'>Network #{network.networkId}</h2>
          <p><b>{network.schemeCount}</b> scheme(s) are generated using this models.</p>
        </div>
      </section>
      <section className='section'>
        <div className='container'>
          <h3 className='title is-4'>Training Log</h3>
          <canvas ref={chartCanvasRef}/>
        </div>
      </section>
      <section className='section'>
        <div className='container'>
          <h3 className='title is-4'>Popular Schemes</h3>
          <PopularSchemes networkId={network.networkId}/>
        </div>
      </section>
    </>
  )
}))
