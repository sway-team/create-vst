import { useRouter } from 'vue-router'

export const useGoBack = () => {
  const router = useRouter()
  const goBack = () => router.go(-1)
  return {
    goBack,
  }
}
