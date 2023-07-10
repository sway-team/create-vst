import type { AxiosRequestConfig } from 'axios'

import axios from 'axios'
import { requestOnFulfilled } from './interceptors.request'
import { responseOnFulfilled, responseOnRejected } from './interceptors.response'
/**
 * 返回数据格式，需要和后端约定
 */
export interface ResponseData<T = unknown> {
  /**
   * 状态码
   */
  code: ResponseCode
  /**
   * 返回数据
   */
  data: T
  /**
   * 提示信息
   */
  msg: string
}

/**
 * 后端返回的 code 码
 */
export enum ResponseCode {
  SUCCESS,
  ERROR,
}

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})
/**
 * 请求拦截器
 */
service.interceptors.request.use(requestOnFulfilled)

/**
 * 响应拦截器
 */
service.interceptors.response.use(responseOnFulfilled, responseOnRejected)

/**
 * 请求方法
 * @description 泛型为 data 的类型
 * @param config 请求参数
 * @returns 后端返回数据
 */
export const request = async <T = unknown>(config: AxiosRequestConfig) => {
  return await service.request<ResponseData<T>>(config)
}
