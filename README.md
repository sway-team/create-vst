# create-vst

`create-vst` 是前端项目起手模版的脚手架工具，用于快速创建一个基于 `vue` + `typescript` + `vite` 的前端项目。

## 如何使用

> **兼容性提示：**
> create-vst 要求 [Node.js](https://nodejs.org/en/) 版本 >= 14.18.0，在使用之前请确保正确的  Node 版本。

使用 npm:

```bash
$ npm create vst
```

使用 yarn:

```bash
$ yarn create vst
```

使用 pnpm:

```bash
$ pnpm create vst
```

然后根据提示输入项目名称即可创建一个新的项目。

你也可以直接指明项目名称，这样就免去了输入项目名称的步骤，运行如下命令：

```bash
$ npm create vst my-project
```

如果你想在当前目录创建一个新的项目，可以使用 `.` 作为项目名称：

```bash
$ npm create vst .
```

注意：如果使用 `.` 作为项目名的话，需要确保当前目录为空，否则会报错。

## 功能

vst(vue starter template) 是在 [create-vue](https://github.com/vuejs/create-vue) 初始化模版的基础上进行的二次开发，主要增加了以下功能：

- 模版基于 [Vue3](https://cn.vuejs.org/guide/introduction.html) 和 [Vite4](https://cn.vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/) 支持
- [基于文件的路由系统](https://github.com/hannoeru/vite-plugin-pages)
- [布局系统](https://github.com/hannoeru/vite-plugin-pages)
- [组件自动化引入](https://github.com/antfu/unplugin-vue-components)
- [Iconify 图标按需引入](https://github.com/antfu/unplugin-icons)
- 使用 [Pinia](https://pinia.vuejs.org/) 作为状态管理工具
- 使用 [Vitest](https://vitest.dev/) 进行单元测试
- 使用[组合式 API](https://cn.vuejs.org/guide/extras/composition-api-faq.html) 开发
- 使用新的 [`<script setup>`](https://cn.vuejs.org/api/sfc-script-setup.html#script-setup) 语法
- [支持 jsx/tsx](https://cn.vuejs.org/guide/extras/render-function.html#jsx-tsx)
- 集成 [vueuse](https://github.com/vueuse/vueuse) 组合式函数工具集
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss)，实用工具优化的 CSS 框架
- [axios](https://github.com/axios/axios) 的请求响应拦截
- [vue-request](https://next.attojs.com/) Vue 组合式函数的请求库
- [切换路由时进度条显示](https://www.npmjs.com/package/nprogress)
- [以命令行的形式快速生成页面、组件和布局模版文件](https://github.com/plopjs/plop)
- [eslint](https://eslint.org/) 代码检查、[prettier](https://prettier.io/) 代码格式化。提交代码前自动格式化代码

## 项目结构

### 环境变量

```bash
├── .env # 公共环境变量，所有环境都会加载
├── .env.development # 开发环境变量
├── .env.gray # 灰度环境变量
├── .env.production # 生产环境变量
├── .env.test # 测试环境变量
├── .env.mock # mock 环境变量
```

注意：环境变量应以 `VITE_` 开头，如 `VITE_BASE_URL`。

配置完环境变量以后，在 `env.d.ts` 中添加对应的类型声明，以得到更好的类型支持，如：

```ts
interface ImportMetaEnv {
  /**
   * 接口请求的 base url
   */
  VITE_BASE_URL: string

  /**
   * 静态资源的 public path
   */
  VITE_PUBLIC_PATH: string
}
```

### 公共组件

写在 components 里面的组件，会自动按需引入，无需手动引入。

```bash
├── src
│   ├── components # 公共组件
│   │   ├── Button # 按钮组件，支持 tsx 组件
│   │   │   └── index.tsx
│   │   ├── DarkSwitch # 切换主题组件
│   │   │   └── index.vue
│   │   ├── __tests__ # 组件单元测试，文件名与组件文件名一致
│   │   │   └── DarkSwitch.spec.ts # 切换主题组件单元测试
│   │   └── icons # 图标组件，一些 svg 图标可以放在这里，以 Icon 开头
│   │       └── IconNotFound.vue
```

### 公共组合函数

一些可以复用的公共组合函数放在 `src/composables` 文件夹下，以 `use` 开头命名。

```bash
├── src
│   ├── composables # 公共组合函数
│   │   ├── useGoBack.ts # 返回上一页
│   │   └── useLocalStorage.ts # 本地存储
```

### 布局系统

布局组件放在 `src/layouts` 文件夹下，插件会自动识别里面的内容。

```bash
├── src
│   ├── layouts
│   │   ├── base.vue
│   │   └── default.vue
```

使用布局系统，可以在 `src/layouts` 文件夹下创建一个布局组件，然后在 `src/pages` 文件夹下创建一个页面组件，页面组件的内容会被插入到布局组件的 `<router-view />` 中。

页面组件 `.vue` 文件需加上 `route` 标签并配置 `layout` 属性，指定使用的布局组件。

```vue
<route lang="yaml">
meta:
  layout: base
</route>
```

### 第三方包

第三方包放在 `src/libs` 文件夹下，封装成 Vue 插件的形式再引入到 `src/main.ts` 中。

```bash
├── src
│   ├── libs # 第三方包
│   │   ├── axios # axios 封装
│   │   │   ├── index.ts # axios 入口文件，设置超时时间和 base url
│   │   │   ├── interceptors.request.ts # 请求拦截器
│   │   │   └── interceptors.response.ts # 响应拦截器
│   │   ├── nprogress # nprogress 封装
│   │   │   ├── index.css # 进度条样式
│   │   │   └── index.ts # nprogress 配置
│   │   └──  vue-request # vue-request 封装
│   │        └── index.ts # vue-request 配置
```

一般来说，使用第三方库或 sdk 需要进行一些配置，然后再为应用所用。对于这样的包我们都可以将它们封装成 Vue 插件的形式放在 `src/libs` 文件夹中，然后在 `src/main.ts` 中引入。

**sdk -> 个性化配置 -> Vue 插件 -> 在应用中使用**

### 文件式路由

路由将会根据 `src/views` 里面的 `.vue` 文件和 `.tsx` 文件自动生成，不需要手动配置。

#### 基础路由

页面会自动将你的页面目录中的文件映射到同名的路由中。

- `src/pages/users.vue` -> `/users`
- `src/pages/users/profile.vue` -> `/users/profile`
- `src/pages/settings.vue` -> `/settings`

#### 索引路由

名称为 index 的文件被当作路由的索引页。

- `src/pages/index.vue` -> `/`
- `src/pages/users/index.vue` -> `/users`

#### 动态路由

动态路线用方括号表示。目录和页面都可以是动态的。

- `src/pages/users/[id].vue` -> `/users/:id (/users/one)`
- `src/pages/[user]/settings.vue` -> `/:user/settings (/one/settings)`

任何动态参数都将作为 `props` 传递给页面。例如，给定文件 `src/pages/users/[id].vue` id 动态参数，将会在路由 `/users/abc`中接收到 `id` prop。

```js
{ "id": "abc" }
```

#### 嵌套路由

我们可以利用 vue-router 的子路由来创建嵌套式布局。父组件可以通过给它一个与包含子路由的目录相同的名字来定义。

例如有如下文件目录：

```bash
src/pages/
  ├── users/
  │  ├── [id].vue
  │  └── index.vue
  └── users.vue
```

那么将会生成如下路由配置：

```js
[
  {
    "path": "/users",
    "component": "/src/pages/users.vue",
    "children": [
      {
        "path": "",
        "component": "/src/pages/users/index.vue",
        "name": "users"
      },
      {
        "path": ":id",
        "component": "/src/pages/users/[id].vue",
        "name": "users-id"
      }
    ]
  }
]
```

#### 兜底路由

兜底路由用包含省略号的方括号来表示。

- `src/pages/[...all].vue` -> `/* (/non-existent-page)`

省略号后面的文字将被用来命名路由，并作为传递路由参数的 `props` 的名称。

我们用 `views/[...notFound].vue` 来表示 404 页面，所有匹配不到的路由都会走到 404 页面。

### 图标

图标使用的是 [unplugin-icon](https://github.com/antfu/unplugin-icons) 插件，[Iconify](https://iconify.design/) 的解决方案，可以在 [Icônes](https://icones.netlify.app/) 上寻找喜欢的图标。

然后直接用图标的名字做标签名即可，例如：

```vue
  <carbon:sun />
```

### 快速创建样板代码

在开发项目时，我们经常需要创建一些样板代码，比如页面、组件、布局等，为了减少重复劳动，我们可以使用 `npm run plop` 命令来快速创建样板代码。

```bash
➜ npm run plop

> flow@0.0.0 plop
> plop

? [PLOP] Please choose a generator. (Use arrow keys)
❯ page - 在 views 文件夹下生成一个页面
  component - 在 components 文件夹下生成一个组件
  layout - 在 layouts 文件夹下生成一个布局组件
```

#### 生成页面

```bash
➜ npm run plop

> flow@0.0.0 plop
> plop

? [PLOP] Please choose a generator. page - 在 views 文件夹下生成一个页面
? 请输入页面名称 home
? 请选择需要使用的布局 default
✔  ++ /src/views/home.vue
```

#### 生成组件

```bash
➜ npm run plop

> flow@0.0.0 plop
> plop

? [PLOP] Please choose a generator. component - 在 components 文件夹下生成一个组件
? 请输入组件名称 Button
✔  ++ /src/components/Button/index.vue
```

#### 生成布局

```bash
➜ npm run plop

> flow@0.0.0 plop
> plop

? [PLOP] Please choose a generator. layout - 在 layouts 文件夹下生成一个布局组件
? 请输入布局组件名称 test
✔  ++ /src/layouts/test.vue
```

#### 修改模版文件

如果想修改样板代码的模版文件，可以在 `plop-templates` 文件夹下找到对应的模版文件进行修改。

```bash
├── plop-templates
│   ├── component.hbs
│   ├── layout.hbs
│   └── page.hbs
```

`plopfile.mjs` 文件为命令行脚本文件。

## 编码风格

### eslint

eslint 使用的是 [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)、[@vue/eslint-config-prettier](https://www.npmjs.com/package/@vue/eslint-config-prettier) 和 [@vue/eslint-config-typescript](https://www.npmjs.com/package/@vue/eslint-config-typescript)

### prettier

prettier 使用的是 swayjs 的 prettier 配置 [@swayjs/prettier-config](https://www.npmjs.com/package/@swayjs/prettier-config)

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "proseWrap": "never",
  "endOfLine": "auto"
}
```

### sfc 编码风格

使用 composition-api 和 `<script setup lang="ts">` 语法。

## VS Code 扩展

- [Vue Language Features(Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - script setup 支持
- [TypeScript Vue Plugin(Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) - typescript 支持
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - 图标内联显示和自动补全
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化

## CheckList

在使用 VST 时建项目时，请检查以下的 CheckList 来更新您项目的信息。

- [ ] 在 `index.html` 中更新 title
- [ ] 在 `public` 文件夹中更新 `favicon.ico`
- [ ] 在 `.env.test`、`.env.gray` 和 `.env.production` 中配置请求接口的 `VITE_BASE_URL`
- [ ] 在 `.env.test`、`.env.gray` 和 `.env.production` 中配置 `VITE_PUBLIC_PATH`
- [ ] 和后端老师约定好接口返回值结构，更新响应拦截器
- [ ] 更新 README.md 并删除无用路由