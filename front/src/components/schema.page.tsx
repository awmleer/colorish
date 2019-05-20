import {RouteComponentProps, withRouter} from 'react-router'
import {memo, useEffect, useState} from 'react'
import * as React from 'react'
import {apiService} from '../services/api.service'
import {SchemaDetail} from './schema-detail'
import {Schema} from '../classes/schema'

interface Props extends RouteComponentProps<{
  id: string
}> {}

export const SchemaPage = withRouter<Props>(memo(function (props) {
  const [schema, setSchema] = useState<Schema>(null)
  
  async function fetchData() {
    setSchema(await apiService.get(`schema/${props.match.params.id}/`))
  }
  
  useEffect(() => {
    fetchData()
  }, [props.match.params.id])
  
  return (
    <section className='section'>
      <div className='container'>
        {schema && (
          <>
            <h2 className='title'>
              Schema #{schema.id}
            </h2>
            <p>
              Network: {schema.networkId}<br/>
              Quality Point: {schema.quality.toFixed(6)}<br/>
              Created At: {schema.createdAt}<br/>
              Viewed: {schema.viewCount} time(s)<br/>
              Liked: {schema.likeCount} person(s)<br/>
            </p>
            <SchemaDetail schema={schema}/>
          </>
        )}
      </div>
    </section>
  )
}))
