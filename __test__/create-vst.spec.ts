import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync, writeFileSync } from 'node:fs'
import { type SyncOptions, type ExecaSyncReturnValue, execaCommandSync } from 'execa'
import { mkdirpSync, remove } from 'fs-extra'
import { beforeAll, describe, afterEach, it, expect } from 'vitest'
import { renameFiles } from '../src/index'

const CLI_PATH = join(fileURLToPath(import.meta.url), '../../', 'bin/create-vst.js')

const projectName = 'vue-starter-template-sample'
const genPath = join(fileURLToPath(import.meta.url), '../../', projectName)

/**
 * 运行命令行脚本
 */
const run = (args: string[], options?: SyncOptions): ExecaSyncReturnValue => {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, options)
}

/**
 * 创建一个非空文件夹
 */
const createNonEmptyDir = () => {
  mkdirpSync(genPath)

  const pkgJson = join(genPath, 'package.json')
  writeFileSync(pkgJson, JSON.stringify({ name: projectName }))
}

/**
 * 模版文件列表
 */
const templateFiles = readdirSync(join(fileURLToPath(import.meta.url), '../../template-vst'))
  .map(filePath => {
    if (filePath in renameFiles) {
      return renameFiles[filePath]
    }
    return filePath
  })
  .sort()

describe('测试脚手架', () => {
  beforeAll(() => remove(genPath))
  afterEach(() => remove(genPath))

  it('直接运行命令，不加任何参数 npm create vst', () => {
    const { stdout } = run([])
    expect(stdout).toContain('Project name:')
  })

  it('运行命令，在当前文件夹生成项目 npm create vst .', () => {
    mkdirpSync(genPath)
    const { stdout } = run(['.'], { cwd: genPath })
    expect(stdout).toContain(`Scaffolding project in ${genPath}`)
  })

  it('提供项目名运行命令 npm create vst vue-starter-template-sample', () => {
    const { stdout } = run([projectName])
    expect(stdout).toContain(`Scaffolding project in ${genPath}`)
  })

  it('询问是否覆盖同名项目', () => {
    createNonEmptyDir()
    const { stdout } = run([projectName])
    expect(stdout).toContain(`Target directory "${projectName}" is not empty.`)
  })

  it('在非空目录下新建项目询问是否覆盖', () => {
    createNonEmptyDir()
    const { stdout } = run(['.'], { cwd: genPath })
    expect(stdout).toContain(`Current directory is not empty. Remove existing files and continue?`)
  })

  it('成功生成项目 npm create vst vue-starter-template-sample', () => {
    const { stdout } = run([projectName])
    const generatedFiles = readdirSync(genPath).sort()

    expect(stdout).toContain(`Scaffolding project in ${genPath}`)
    expect(templateFiles).toEqual(generatedFiles)
  })
})
