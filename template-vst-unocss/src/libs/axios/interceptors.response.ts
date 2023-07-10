import type { AxiosError, AxiosResponse } from 'axios'
import type { ResponseData } from './index'

import { ResponseCode } from './index'

/**
 * 请求成功拦截器
 */
export const responseOnFulfilled = (response: AxiosResponse<ResponseData>) => {
  if (response.data.code === ResponseCode.SUCCESS) {
    return response
  }
  if (response.data.code === ResponseCode.ERROR) {
    // TODO: 全局错误提示信息
    return Promise.reject(response.data)
  }
  // TODO: 响应拦截，需要和后端约定
  return response
}

/**
 * 请求失败拦截器
 */
export const responseOnRejected = (error: AxiosError<ResponseData>) => {
  if (error.response) {
    const data = error.response.data
    console.log(data)
    switch (error.response.status) {
      case 403:
        // TODO: 错误提示信息
        break
      case 401:
        // TODO: 错误提示信息
        // TODO: 鉴权失败退出
        break
      default:
      // TODO: 错误提示信息
    }
  }
  return Promise.reject(error.response?.data)
}
