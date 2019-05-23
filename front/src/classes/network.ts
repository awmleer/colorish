export class Network {
  networkId: string
  schemeCount: number
  log?: {
    time: number
    rounds: {
      mode: 'G' | 'D'
      loss: number
    }[]
  }
}
