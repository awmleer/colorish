import {apiService} from '../services/api.service'
import {Store, store} from 'reto'
import {Schema} from '../classes/schema'
import {parseToHsl, parseToRgb, rgb} from 'polished'

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
      const colors = []
      for (const c of data.colors) {
        const str = rgb(c[0], c[1], c[2])
        colors.push({
          str,
          rgb: parseToRgb(str),
          hsl: parseToHsl(str),
        })
      }
      draft.schema = {
        network: data.network,
        colors,
      }
    })
  }
  
}
