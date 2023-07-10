import Mock from 'mockjs'
import type { MockMethod, Recordable } from 'vite-plugin-mock'

export enum ResponseCode {
  SUCCESS = 0,
  ERROR = 1,
}

const result = {
  success<T = Recordable>(data: T) {
    return {
      code: ResponseCode.SUCCESS,
      msg: 'ok',
      data,
    }
  },
  fail<T = Recordable>(data: T) {
    return {
      code: ResponseCode.ERROR,
      msg: 'error',
      data,
    }
  },
}

const mockAPIs: MockMethod[] = [
  {
    url: '/api/example',
    method: 'get',
    response: () => {
      return result.success(
        Mock.mock({
          class_id: '@id',
          'list|1-10': [
            {
              'id|+1': 1,
              name: '@cname',
            },
          ],
        }),
      )
    },
  },
]

export default mockAPIs
