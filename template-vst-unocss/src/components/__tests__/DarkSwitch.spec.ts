import { describe, it, expect, vi, beforeAll } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import DarkSwitch from '../DarkSwitch/index.vue'

describe('测试 DarkSwitch 组件', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })
  it('renders properly', async () => {
    const wrapper = await shallowMount(DarkSwitch)
    // 有一个 button 标签
    expect(wrapper.find('button').exists()).toBe(true)
    // 并且 button 的类名是 toggle-switch
    expect(wrapper.classes()).toContain('toggle-switch')
  })
})
