<script setup lang="ts">
import IconNotFound from '@/components/icons/IconNotFound.vue'
import { useGoBack } from '@/composables/useGoBack'
const { goBack } = useGoBack()
</script>
<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <IconNotFound />
    <p class="my-4">抱歉，您访问的页面不存在。</p>
    <Button @click="goBack"> ← 返回</Button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: plain
</route>
