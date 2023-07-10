<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({ disableTransition: false })
const toggleDark = useToggle(isDark)
</script>
<template>
  <button
    bg="gray-100 dark:gray-700"
    border="~ gray-400"
    relative
    w="10"
    h="22px"
    p="x-px"
    rounded="full"
    @click="toggleDark()"
  >
    <div
      center
      w="18px"
      h="18px"
      bg="white dark:gray-900"
      rounded="full"
      transition="~ duration-200"
      ease-linear
      text="color-base"
      dark:translate-x-18px
    >
      <div class="i-carbon-light opacity-100 dark:opacity-0" absolute text="xs"></div>
      <div class="i-carbon-moon opacity-0 dark:opacity-100" absolute text="xs"></div>
    </div>
  </button>
</template>
