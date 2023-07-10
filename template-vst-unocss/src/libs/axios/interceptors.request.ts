import type { InternalAxiosRequestConfig } from 'axios'

export const requestOnFulfilled = (config: InternalAxiosRequestConfig) => {
  // const token = ''
  // if (token && config.headers) {
  //   config.headers['Authorization'] = `Bearer ${token}`
  // }
  return config
}
