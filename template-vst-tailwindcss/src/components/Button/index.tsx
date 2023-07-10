import type { SetupContext } from 'vue'
interface Props {
  /**
   * 按钮类型
   */
  type?: 'text'
  onClick?: (evt: MouseEvent) => void
}

export default ({ type }: Props, { emit, slots }: SetupContext) => (
  <button
    class={`mx-auto my-2 block ${type === 'text' ? '' : 'border'} border-gray-300 px-2.5 py-1.5`}
    onClick={(evt: MouseEvent) => emit('click', evt)}
  >
    {slots.default?.()}
  </button>
)
