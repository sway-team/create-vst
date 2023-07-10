<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const handleClick = () => {
  router.push({
    path: '/about',
  })
}
</script>
<template>
  <div class="min-h-screen py-6">
    <DarkSwitch />
    <Button @click="handleClick">跳转 About</Button>
  </div>
</template>
