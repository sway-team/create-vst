import { loadEnv, type ConfigEnv, type UserConfigExport } from 'vite'
import { fileURLToPath, URL } from 'url'
import preset from './presets/vst'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  // 加载 .env 文件
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [preset(mode)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base: env.VITE_PUBLIC_PATH,
    build: {
      sourcemap: 'hidden',
      // 低版本浏览器支持
      target: 'es6',
    },
  }
}
