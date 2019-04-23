export interface UnsuccessfulApiResponse<T = any> {
  status: number
  code: string
  message: string
  extra: T
}
