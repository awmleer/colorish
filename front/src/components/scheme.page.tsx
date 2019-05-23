import {RouteComponentProps, withRouter} from 'react-router'
import {memo, useEffect, useState} from 'react'
import * as React from 'react'
import {apiService} from '../services/api.service'
import {SchemeDetail} from './scheme-detail'
import {Scheme} from '../classes/scheme'

interface Props extends RouteComponentProps<{
  id: string
}> {}

export const SchemePage = withRouter<Props>(memo(function (props) {
  const [scheme, setScheme] = useState<Scheme>(null)
  
  async function fetchData() {
    setScheme(await apiService.get(`scheme/${props.match.params.id}/`))
  }
  
  useEffect(() => {
    fetchData()
  }, [props.match.params.id])
  
  return (
    <section className='section'>
      <div className='container'>
        {scheme && (
          <>
            <h2 className='title'>
              Scheme #{scheme.id}
            </h2>
            <p>
              Network: {scheme.networkId}<br/>
              Quality Point: {scheme.quality.toFixed(6)}<br/>
              Created At: {scheme.createdAt}<br/>
              Viewed: {scheme.viewCount} time(s)<br/>
              Liked: {scheme.likeCount} person(s)<br/>
            </p>
            <SchemeDetail scheme={scheme}/>
          </>
        )}
      </div>
    </section>
  )
}))
