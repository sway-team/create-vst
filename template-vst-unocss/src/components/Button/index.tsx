import type { SetupContext } from 'vue'
interface Props {
  /**
   * 按钮类型
   */
  type?: 'text'
  onClick?: (evt: MouseEvent) => void
}

export default ({ type }: Props, { slots }: SetupContext) => (
  <button
    class={`mx-auto my-2 block ${
      type === 'text' ? '' : 'border border-base'
    } bg-base text-color-base px-2.5 py-1.5`}
  >
    {slots.default?.()}
  </button>
)
