import {Store, store} from 'reto'
import {Schema} from '../classes/schema'
import {parseToHsl, parseToRgb, rgb} from 'polished'
import {Color} from '../classes/color'
import {apiService} from '../services/api.service'

type State = {
  schema: Schema
  colors: Color[]
}

@store
export class SchemaStore extends Store<State> {
  state: State = null
  
  constructor(schema: Schema) {
    super()
    const colors = []
    for (const c of schema.colors) {
      const str = rgb(c[0], c[1], c[2])
      colors.push({
        str,
        rgb: parseToRgb(str),
        hsl: parseToHsl(str),
      })
    }
    this.state = {
      schema,
      colors,
    }
  }
  
  toggleLike = async () => {
    const result = await apiService.get(`toggle-like/${this.state.schema.id}/`)
    this.mutate(state => {
      state.schema.likeCount = result.likeCount
      state.schema.liked = result.liked
    })
  }
}
