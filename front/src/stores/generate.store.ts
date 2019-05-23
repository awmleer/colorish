import {Store, store} from 'reto'
import {apiService} from '../services/api.service'
import {Scheme} from '../classes/scheme'

interface State {
  scheme: Scheme
  config: {
    networkId: string
  }
}

@store
export class GenerateStore extends Store<State> {
  state: State = {
    scheme: null,
    config: {
      networkId: ''
    }
  }
  
  constructor() {
    super()
    this.generate()
  }
  
  generate = async (networkId?: string) => {
    const param = networkId ? {
      ...this.state.config,
      networkId
    } : this.state.config
    const data = await apiService.post(`generate/`, null, param)
    this.mutate(state => {
      state.scheme = data
    })
  }
  
}
