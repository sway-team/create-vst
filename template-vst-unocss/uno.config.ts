import { defineConfig } from 'unocss'
import { presetUno, presetAttributify, presetIcons, transformerDirectives } from 'unocss'
import type { Theme } from '@unocss/preset-uno'

export default defineConfig<Theme>({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()],
  shortcuts: {
    // background
    'bg-base': 'bg-$c-bg-base',
    'bg-dim': 'bg-$c-bg-dim',

    // text colors
    'text-color-base': 'text-$c-text-base',
    'text-dim': 'text-$c-text-dim',

    // border colors
    'border-base': 'border-$c-border-base',

    center: 'flex items-center justify-center',
  },
  variants: [],
  theme: {
    colors: {
      primary: '#647eff',
    },
  },
})
