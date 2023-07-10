import { request } from '@/libs/axios/index'

export interface Example {
  class_id: number
  list: {
    id: number
    name: string
  }[]
}

/**
 * 示例接口
 */
export function getExample() {
  return request<Example>({
    url: '/api/example',
    method: 'get',
  })
}
