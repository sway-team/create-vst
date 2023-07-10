module.exports = {
  ...require('@swayjs/prettier-config'),
  // 使用 pnpm 需要手动指定插件，详情请看：https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/10
  plugins: [require('prettier-plugin-tailwindcss')],
}
