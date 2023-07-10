import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import minimist from 'minimist'
import { version } from '../package.json'
import { bgCyan, bgGreen, black, bold, magenta, cyan } from 'kolorist'
import { intro, text, confirm, isCancel, cancel, note as dimNote, select } from '@clack/prompts'
import { welcome } from './welcome'
import {
  formatTargetDir,
  isValidPackageName,
  toValidPackageName,
  pkgFromUserAgent,
  note,
} from './utils'
import { isEmpty, emptyDir, copy } from './io/fs'

// 获取命令行参数
const argv = minimist(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

// 写入文件时需要重命名的文件，一般以 . 开头的配置文件需要重命名
// README 重命名的原因是 npm 平台默认会将模版里面的 README 拼接在外层 README 后面，所以重命名一下避免干扰。
export const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
  _lintstagedrc: '.lintstagedrc',
  '_eslintrc.cjs': '.eslintrc.cjs',
  '_prettierrc.js': '.prettierrc.js',
  _npmrc: '.npmrc',
  _env: '.env',
  '_env.mock': '.env.mock',
  '_env.development': '.env.development',
  '_env.test': '.env.test',
  '_env.gray': '.env.gray',
  '_env.production': '.env.production',
  '_README.md': 'README.md',
}

const defaultTargetDir = 'vue-starter-template'

const argTargetDir = formatTargetDir(argv._[0])

let targetDir = argTargetDir || defaultTargetDir
const getProjectName = () => {
  return targetDir === '.' ? path.basename(path.resolve()) : targetDir
}

/**
 * 取消操作
 */
function operationCancelled<T>(value: T) {
  if (isCancel(value)) {
    cancel('Operation cancelled')
    return process.exit(0)
  }
}

/**
 * 交互式命令行输入项目名称
 */
async function promptProjectName() {
  // 如果已经在命令行中输入了项目名称，则不需要再次输入
  if (argTargetDir) {
    return
  }
  // 获取交互式命令行输入的项目名称
  const projectName = await text({
    message: 'Project name:',
    placeholder: `Enter Your Project Name. default: ${defaultTargetDir}`,
    // initialValue: defaultTargetDir,
    defaultValue: defaultTargetDir,
  })

  operationCancelled(projectName)

  targetDir = formatTargetDir(projectName as string) || defaultTargetDir

  return projectName
}

/**
 * 交互式命令行输入是否覆盖已有文件
 */
async function promptOverwrite() {
  if (!fs.existsSync(targetDir) || isEmpty(targetDir)) {
    return
  }
  const dir = targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`
  const overwrite = await confirm({
    message: `${dir} is not empty. Remove existing files and continue?`,
  })

  operationCancelled(overwrite)

  if (overwrite) {
    return
  }
  cancel('✖ Operation cancelled')
  return process.exit(0)
}

/**
 * 交互式命令行输入 package.json 中的 name
 */
async function promptPackageName() {
  // 如果 ProjectName 符合 package.name 规范，直接跳过
  if (isValidPackageName(getProjectName())) {
    return
  }
  const packageName = await text({
    message: 'Package name:',
    placeholder: `Package name`,
    initialValue: toValidPackageName(getProjectName()),
    validate: (dir: string) => {
      if (isValidPackageName(dir)) {
        return
      }
      return 'Invalid package.json name'
    },
  })

  operationCancelled(packageName)
  return packageName
}

async function promptTemplate() {
  const template = await select({
    message: 'Select a CSS framework:',
    options: [
      { value: 'unocss', label: 'UnoCSS' },
      { value: 'tailwindcss', label: 'Tailwind CSS' },
    ],
  })

  operationCancelled(template)

  return template
}

/**
 * 程序初始化
 */
async function init() {
  intro(`Let's create a Vue App with ${bold(bgCyan(black(' create-vst ')))} ✨ (${version})`)

  // 从 prompts 中获取到的结果
  const projectName = await promptProjectName()
  const overwrite = await promptOverwrite()
  const packageName = await promptPackageName()
  const template = await promptTemplate()

  const root = path.join(cwd, targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo?.name ?? 'npm'

  dimNote(`\nScaffolding project in ${root}...`, 'Scaffolding')

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../',
    `template-vst-${template}`,
  )

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter(f => f !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8'))

  pkg.name = packageName || getProjectName()

  write('package.json', JSON.stringify(pkg, null, 2))

  const resultOutput = []

  resultOutput.push(
    `\n 🎉 ${bgGreen(' Success~ ')} Project created in ${magenta(
      projectName as string,
    )} directory.`,
  )

  resultOutput.push(`\n 🍹 ${bold(cyan('Next steps:'))}`)
  if (root !== cwd) {
    resultOutput.push(`    cd ${path.relative(cwd, root)}`)
  }

  if (packageName === 'yarn') {
    resultOutput.push('     yarn')
    resultOutput.push('     yarn dev')
    return
  }
  // npm or pnpm
  resultOutput.push(`    ${pkgManager} install`)
  resultOutput.push(`    ${pkgManager} run dev`)

  // docs
  resultOutput.push(`\n 📄 ${bold(cyan('Documentation:'))}`)
  resultOutput.push('    https://github.com/sway-team/create-vst#readme')

  note(resultOutput.join('\n'), 'Result')

  welcome()
}

init().catch(e => {
  console.error(e)
})
