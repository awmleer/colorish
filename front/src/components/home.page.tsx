import React, {memo} from 'react'
import {withRouter} from 'react-router'
import {PopularSchemes} from './popular-schemes'

export const HomePage = withRouter(memo(function HomePage() {
  return (
    <>
      <section className='hero is-medium is-light is-bold'>
        <div className='hero-body'>
          <div className='container font-raleway'>
            <h1 className='title' style={{fontSize: 60}}>Colorish</h1>
            <h2 className='subtitle is-size-4'>Deep learning network for color scheme generating.</h2>
          </div>
        </div>
      </section>
      <section className='section'>
        <div className='container'>
          <h2 className='title'>Popular Color Schemes</h2>
          <PopularSchemes/>
        </div>
      </section>
    </>
  )
}))
