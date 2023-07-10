<script setup lang="ts">
import { useGetExample } from '@/composables/useGetExample'
import { useGoBack } from '@/composables/useGoBack'
const { goBack } = useGoBack()

const { loading, list } = useGetExample()

const mode = import.meta.env.MODE
</script>
<template>
  <div class="py-6 text-center">
    About 页面
    <div class="my-4">mock /api/example 接口</div>
    <div class="my-4" v-if="mode !== 'mock'">没有数据？试试运行 npm run dev:mock</div>
    <div v-if="loading">loading...</div>
    <ul v-else class="mx-auto w-32 border-t">
      <li
        v-for="item in list"
        :key="item.id"
        class="flex items-center justify-between border border-t-0"
      >
        <div class="w-1/2 border-r">{{ item.id }}</div>
        <div class="w-1/2">{{ item.name }}</div>
      </li>
    </ul>
    <Button @click="goBack"> ← 返回 </Button>
  </div>
</template>
<route lang="yaml">
meta:
  layout: base
</route>
