import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Inspect from 'vite-plugin-inspect'
import { viteMockServe } from 'vite-plugin-mock'

const vst = (mode: string): PluginOption[] => {
  return [
    vue(),
    vueJsx(),
    // 组件自动注册按需引入
    Components({
      /**
       * 默认配置 https://github.com/antfu/unplugin-vue-components#configuration
       */
      /**
       * 在 components 里面的组件会自动注册
       */
      dts: 'components.d.ts',
      extensions: ['vue', 'tsx'],
    }),

    // unocss -> : https://github.com/unocss/unocss
    // 配置文件在 uno.config.ts 中
    UnoCSS(),

    // 文件路由 -> ：https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: 'src/views',
      extensions: ['vue', 'tsx'],
      exclude: ['**/components/*.vue'],
    }),

    // 布局系统 -> ：https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // 调试工具 -> : https://github.com/antfu/vite-plugin-inspect
    Inspect(),

    // mock 工具 -> : https://github.com/vbenjs/vite-plugin-mock
    viteMockServe({
      // default
      mockPath: 'mock',
      enable: mode === 'mock',
    }),
  ]
}

export default vst
