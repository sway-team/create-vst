import { ref } from 'vue'
import { useRequest } from 'vue-request'
import { getExample, type Example } from '@/api'

type List = Example['list']

export function useGetExample() {
  const list = ref<List>([])
  const { loading, run } = useRequest(getExample, {
    onSuccess({ data }) {
      list.value = data.data.list
    },
  })

  run()

  return {
    loading,
    list,
  }
}
