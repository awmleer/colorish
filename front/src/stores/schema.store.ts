import {Color} from '../classes/color'
import {apiService} from '../services/api.service'
import {Store, store} from 'reto'

interface State {
  schema: Color[]
}

@store
export class SchemaStore extends Store<State> {
  state = {
    schema: [] as Color[]
  }
  
  generate = async () => {
    const data = await apiService.get(`generate/`)
    this.mutate(store => {
      store.schema = data
    })
  }
  
}
