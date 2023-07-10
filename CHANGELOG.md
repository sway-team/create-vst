# create-vst

## 2.1.0

### Minor Changes

- 模版内置 vite-plugin-mock 模块，支持 mock 环境，可通过 `npm run dev:mock` 开启；
- 新增 api 请求与 mock 示例代码；
- 各种依赖升级至最新版；
- 修复 Button 组件 Props 缺少 onClick 事件的类型问题；

## 2.0.0

### Major Changes

- 命令行界面重写，使用 [@clack/prompts](https://www.npmjs.com/package/@clack/prompts) 代替 [prompts](https://www.npmjs.com/package/prompts);
- 支持 css framework 选项，可以选择 [tailwindcss](https://tailwindcss.com/) 或 [unocss](https://unocss.dev/);
- 新增 unocss 模版;
- 其他依赖升级到最新版;

## 1.5.0

### Minor Changes

- vue 版本升级至 v3.3.4，详情请参考 [Announcing Vue 3.3](https://blog.vuejs.org/posts/vue-3-3);
- typescript 升级至 v5.0，并更新 tsconfig.json;
- 其他依赖更新到最新版。

## 1.4.0

### Minor Changes

- 升级 vite 版本为 v4.3.1，提升性能，[参考文档](https://vitejs.dev/blog/announcing-vite4-3.html).
- `@xes/xes_fe_log` 升级到 v2.4.2.
- 完善 XesLoggerSDK 传入 config 的类型定义.
- 修复 DarkSwitch 组件过渡动画不生效的问题（useDark 方法传入 `{ disableTransition: false }` 解决）.
- 修复 axios 请求拦截器中的 `config` 类型错误.

## 1.3.3

### Patch Changes

- 升级依赖.
- `tsconfig.config.json` -> `tsconfig.node.json`.
- 添加 `vitest.config.ts` 配置文件.

## 1.3.2

### Patch Changes

- 修复使用不同包管理工具(npm/yarn/pnpm)npm-run-all 表现不一致的 bug.
- 升级模版中的 vite-plugin-vue-layouts 到 0.8.0 版本，支持 vite4.

## 1.3.1

### Patch Changes

- 修复 base.css 中的 relative 样式影响第三方组件样式的问题

## 1.3.0

### Minor Changes

- 低版本浏览器支持，vite 配置 `build.target` 为 `es6'.
- 模版中添加环境标识工具 @bcc/env-badge.

## 1.2.0

### Minor Changes

- 集成 VS Code 调试功能.

## 1.1.2

### Patch Changes

- 添加单元测试，补充测试用例.
- 重构代码.

## 1.1.1

### Patch Changes

- 添加 lint script,提交代码前自动 lint
- renameFiles 添加 README,避免 npm 平台将模版的 README 内容也展示出来
- 补充文档，完善 README.md

## 1.1.0

### Minor Changes

- 集成前端监控日志以及 sourcemap 上传
- 修改组件自动注册配置,支持 tsx 组件

## 1.0.0

- 脚手架基础功能开发，可通过 `npm create vst` 来创建项目.
