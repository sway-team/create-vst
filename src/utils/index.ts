import { gray, green, reset, white } from 'kolorist'

/**
 * 格式化目标文件夹, 去除空格和末尾的斜杠
 * @param targetDir 文件夹
 * @returns {string}
 */
export function formatTargetDir(targetDir?: string) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

/**
 * 判断是否是合法的 package 名称
 * @param projectName 项目名称
 * @returns {boolean}
 */
export function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName)
}

/**
 * 将不合法的项目名称转换为合法的项目名称
 * @param projectName 项目名称
 * @returns {string} 合法的项目名称
 */
export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~._]/g, '-')
}

/**
 * 判断当前用户使用的包管理器
 * @param userAgent npm 包管理器的 user-agent，例如：pnpm/7.20.0 npm/? node/v18.12.1 darwin x64
 * @returns
 */
export function pkgFromUserAgent(userAgent?: string) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const [name, version] = pkgSpec.split('/')
  return {
    name,
    version,
  }
}

// Used from https://github.com/natemoo-re/clack/blob/main/packages/prompts/src/index.ts
function ansiRegex() {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
  ].join('|')

  return new RegExp(pattern, 'g')
}

const strip = (str: string) => str.replace(ansiRegex(), '')
const bar = '│'

export const note = (message = '', title = '') => {
  const lines = `\n${message}\n`.split('\n')
  const len =
    lines.reduce((sum, ln) => {
      ln = strip(ln)
      return ln.length > sum ? ln.length : sum
    }, 0) + 2
  const msg = lines
    .map(ln => `${gray(bar)}  ${white(ln)}${' '.repeat(len - strip(ln).length)}${gray(bar)}`)
    .join('\n')
  process.stdout.write(
    `${gray(bar)}\n${green('○')}  ${reset(title)} ${gray(
      '─'.repeat(len - title.length - 1) + '╮',
    )}\n${msg}\n${gray('├' + '─'.repeat(len + 2) + '╯')}\n`,
  )
}
