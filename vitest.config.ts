import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['node_modules/**', 'template-vst/**', 'vue-starter-template-*/**', 'dist/**'],
    testTimeout: 20000,
  },
})
