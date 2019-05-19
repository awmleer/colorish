import {Store, store} from 'reto'
import {apiService} from '../services/api.service'
import {Schema} from '../classes/schema'

interface State {
  schema: Schema
  config: {
    networkId: string
  }
}

@store
export class GenerateStore extends Store<State> {
  state: State = {
    schema: null,
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
      state.schema = data
    })
  }
  
}
