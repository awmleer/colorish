export class Network {
  networkId: string
  schemaCount: number
  log?: {
    time: number
    rounds: {
      mode: 'G' | 'D'
      loss: number
    }[]
  }
}
