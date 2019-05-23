import {Store, store} from 'reto'
import {Schema} from '../classes/schema'
import {lighten, parseToHsl, parseToRgb, rgb} from 'polished'
import {Color} from '../classes/color'
import {apiService} from '../services/api.service'
import {min} from 'rxjs/operators'
import _ from 'lodash';

type State = {
  schema: Schema
  colors: Color[]
  allocation: {
    background: Color
    primary: Color
    secondaries: Color[]
  }
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
      allocation: allocateColors(colors),
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

function allocateColors(colors: Color[]) {
  const pool = [...colors]
  
  let background = pool[0]
  function backgroundRank(c: Color) {
    return Math.min(c.hsl.lightness, 1 - c.hsl.lightness) + c.hsl.saturation * 0.5
  }
  for (const c of pool) {
    if (backgroundRank(c) < backgroundRank(background)) {
      background = c
    }
  }
  _.remove(pool, (c) => c === background)
  
  let primary = pool[0]
  function primaryRank(c: Color) {
    return Math.abs(c.hsl.lightness - background.hsl.lightness)
  }
  for (const c of pool) {
    if (primaryRank(c) > primaryRank(primary)) {
      primary = c
    }
  }
  _.remove(pool, (c) => c === primary)
  
  return {
    background,
    primary,
    secondaries: pool,
  }
}
