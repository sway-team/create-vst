# vue-starter-template

Vue 3 的起手模版

## 推荐的 IDE 和插件

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)

## 自定义配置

查看 [Vite Configuration Reference](https://vitejs.dev/config/) 以获得更多信息。

## 启动项目

### 安装依赖

```sh
$ npm install
```

### 开发环境运行项目

```sh
$ npm run dev
```

#### mock 环境

```sh
$ npm run dev:mock
```

### 不同环境打包构建

#### 生产环境

```sh
$ npm run build:prod
```

#### 灰度环境

```sh
$ npm run build:gray
```

#### 测试环境

```sh
$ npm run build:test
```

### 使用 [Vitest](https://vitest.dev/) 运行单元测试

```sh
$ npm run test:unit
```

### 使用 [ESLint](https://eslint.org/) 来 lint 代码

```sh
$ npm run lint
```