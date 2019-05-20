import {Store, store} from 'reto'
import {User} from '../classes/user'
import {apiService} from '../services/api.service'

interface State {
  user: User
}

@store
export class AccountStore extends Store<State> {
  state: State = {
    user: null
  }
  
  constructor() {
    super()
    this.fetchUser()
  }
  
  fetchUser = async () => {
    const user = await apiService.get('me/')
    this.mutate((state) => {
      state.user = user
    })
  }
  
  login = async (username: string, password: string) => {
    const result = await apiService.post('login/', null, {
      username,
      password,
    })
    this.fetchUser()
    return result
  }
  
}
