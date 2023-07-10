<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({ disableTransition: false })
// 切换系统主题
const toggleDark = useToggle(isDark)
</script>
<template>
  <button class="toggle-switch" @click="() => toggleDark()">
    <span class="switch-icon icon-btn">
      <carbon-moon class="absolute !h-[1em] !w-[1em] opacity-0 transition dark:opacity-100" />
      <carbon-sun class="absolute !h-[1em] !w-[1em] opacity-100 transition dark:opacity-0" />
    </span>
  </button>
</template>
<style scoped>
.toggle-switch {
  @apply h-[22px]
    w-10
    rounded-full
    border
    border-gray-400
    bg-gray-100
    px-[1px]
    leading-none
    dark:bg-gray-700;
}
.switch-icon {
  @apply relative
   flex
   h-[18px]
   w-[18px]
   items-center
   justify-center
   rounded-full
   bg-white
   transition
   duration-200
   ease-linear
   dark:translate-x-[18px]
   dark:bg-gray-900;
}
</style>
