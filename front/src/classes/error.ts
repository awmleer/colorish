import {UnsuccessfulApiResponse} from './unsuccessful-api-response'

export class ApiError {
  message: string
  status: number //status是来自于http请求真正拿到的状态码，而response.status是后端手动设置的，因此两者都保留在这里了
  response: UnsuccessfulApiResponse

  constructor(
    status: number = null,
    response: UnsuccessfulApiResponse = null,
  ) {
    let message = response && response.message
    if (!message) message = '请求出错'
    this.message = message
    this.status = status
    this.response = response
  }
}
