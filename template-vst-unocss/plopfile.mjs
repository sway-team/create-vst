import fg from 'fast-glob'

/**
 * 获取 src/layouts 下的布局
 * @returns layouts[]
 */
function getLayouts() {
  // 获取 src/layouts 下的文件，例如：[base.vue, default.vue, plain.vue]
  const files = fg.sync('*.vue', { cwd: 'src/layouts', onlyFiles: true })
  // 然后将后缀名去掉
  return files.map(item => item.replace('.vue', ''))
}

/**
 * 验证输入的页面或组件名称是否正确
 * @param {string} pageName
 */
function validatePageName(pageName) {
  if (pageName.includes('.') && !pageName.endsWith('.vue')) {
    return '错误的页面名称'
  }
  if (pageName.endsWith('.vue')) {
    return '无需输入 .vue 后缀名'
  }
  return true
}

/**
 * @description 页面和组件生成工具
 * @param {import('plop').NodePlopAPI} plop
 */
export default function (plop) {
  // 生成页面指令
  plop.setGenerator('page', {
    description: '在 views 文件夹下生成一个页面',
    prompts: [
      {
        type: 'input',
        name: 'pageName',
        message: '请输入页面名称',
        validate: validatePageName,
      },
      {
        type: 'list',
        name: 'layout',
        message: '请选择需要使用的布局',
        choices: getLayouts(),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/views/{{pageName}}.vue',
        templateFile: 'plop-templates/page.hbs',
      },
    ],
  })

  // 生成组件指令
  plop.setGenerator('component', {
    description: '在 components 文件夹下生成一个组件',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: '请输入组件名称',
        validate: componentName => {
          if (!/^[A-Z]/.test(componentName)) {
            return '组件名建议使用大驼峰'
          }
          return validatePageName(componentName)
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{componentName}}/index.vue',
        templateFile: 'plop-templates/component.hbs',
      },
    ],
  })

  // 生成布局指令
  plop.setGenerator('layout', {
    description: '在 layouts 文件夹下生成一个布局组件',
    prompts: [
      {
        type: 'input',
        name: 'layoutName',
        message: '请输入布局组件名称',
        validate: validatePageName,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/layouts/{{layoutName}}.vue',
        templateFile: 'plop-templates/layout.hbs',
      },
    ],
  })
}
