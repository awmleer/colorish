import qs from 'qs'
import {ApiError} from '../classes/error'

export class ApiService {
  constructor(
    private readonly apiPrefix = '/api/'
  ) {}

  get(url: string, query: {[key:string]:any} = null) {
    return this.fetch('GET', url, query)
  }

  post(url: string, query: {[key:string]:any} = null, body: string|object = null) {
    return this.fetch('POST', url, query, body)
  }

  put(url: string, query: {[key:string]:any} = null, body: string|object = null) {
    return this.fetch('PUT', url, query ,body)
  }

  delete(url: string, query: {[key:string]:any} = null, body: string|object = null) {
    return this.fetch('DELETE', url, query ,body)
  }
  private async fetch(method: 'GET'|'POST'|'PUT'|'DELETE', url: string, query: {[key:string]:any}, body: string|object = null): Promise<any> {
    let completeUrl = this.apiPrefix + url
    if (query) {
      completeUrl += '?' + qs.stringify(query)
    }
    const response = await fetch(completeUrl, {
      method,
      cache: 'no-cache',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'same-origin',
      body: body === null ? (
        null
      ) : (
        typeof body === 'string' ? body : JSON.stringify(body)
      )
    })
    let data = null
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    }
    if (response.ok) {
      return data
    } else {
      throw new ApiError(response.status, data)
    }
  }
}

export const apiService = new ApiService()
