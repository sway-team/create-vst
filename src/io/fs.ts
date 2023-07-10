import fs from 'node:fs'
import path from 'node:path'

/**
 * 判断文件夹是否为空
 * @param path 目标路径
 * @returns {boolean}
 */
export function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

/**
 * 清空文件夹
 * @param dir 文件夹名称
 * @returns
 */
export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

/**
 * 复制文件夹中的文件
 * @param srcDir 源文件夹
 * @param destDir 目标文件夹
 */
function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

/**
 * 复制文件和文件夹
 * @param src 源文件夹
 * @param dest 目标文件夹
 * @returns
 */
export function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
    return
  }
  fs.copyFileSync(src, dest)
}
