import {apiService} from '../services/api.service'
import {Store, store} from 'reto'
import {Schema} from '../classes/schema'

interface State {
  schema: Schema
}

@store
export class SchemaStore extends Store<State> {
  state = {
    schema: null as Schema
  }
  
  constructor() {
    super()
    this.generate()
  }
  
  generate = async () => {
    const data = await apiService.get(`generate/`)
    this.mutate(draft => {
      draft.schema = data
    })
  }
  
}
