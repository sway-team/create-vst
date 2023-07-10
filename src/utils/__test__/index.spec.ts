import { describe, it, expect } from 'vitest'
import { formatTargetDir, isValidPackageName, toValidPackageName, pkgFromUserAgent } from '../index'

describe('测试 formatTargetDir 函数', () => {
  it('正确的测试用例', () => {
    expect(formatTargetDir('path')).toBe('path')

    expect(formatTargetDir('path/to')).toBe('path/to')

    expect(formatTargetDir('path/to/')).toBe('path/to')

    expect(formatTargetDir('path/to//')).toBe('path/to')

    expect(formatTargetDir('path/to/ ')).toBe('path/to')

    expect(formatTargetDir('path/to/  ')).toBe('path/to')

    expect(formatTargetDir(' path/to/ ')).toBe('path/to')
  })

  it('边缘测试用例', () => {
    expect(formatTargetDir()).toBeUndefined()

    expect(formatTargetDir('')).toBe('')

    expect(formatTargetDir(' ')).toBe('')
  })
})

describe('测试 isValidPackageName 函数', () => {
  it('不带 scope 的包名', () => {
    expect(isValidPackageName('a')).toBe(true)
    expect(isValidPackageName('a-b')).toBe(true)
    expect(isValidPackageName('example.com')).toBe(true)
    expect(isValidPackageName('under_score')).toBe(true)
    expect(isValidPackageName('period.js')).toBe(true)
    expect(isValidPackageName('123numeric')).toBe(true)
  })

  it('带有 scope 的包名', () => {
    expect(isValidPackageName('@vue/reactivity')).toBe(true)
    expect(isValidPackageName('@npm-with-slash/time.js')).toBe(true)
  })

  it('非法的包名', () => {
    expect(isValidPackageName('')).toBe(false)
    expect(isValidPackageName('AAA')).toBe(false)
    expect(isValidPackageName('.start-with-period')).toBe(false)
    expect(isValidPackageName('_start-with-underscore')).toBe(false)
    expect(isValidPackageName('contain:colons')).toBe(false)
    expect(isValidPackageName(' leading-space')).toBe(false)
    expect(isValidPackageName('trailing-space ')).toBe(false)
    expect(isValidPackageName('s/l/a/s/h/e/s')).toBe(false)
  })
})

describe('测试 toValidPackageName 函数', () => {
  it('错误的包名转换成正确的包名', () => {
    expect(toValidPackageName('')).toMatchInlineSnapshot('""')
    expect(toValidPackageName('AAA')).toMatchInlineSnapshot('"aaa"')
    expect(toValidPackageName('.start-with-period')).toMatchInlineSnapshot('"start-with-period"')
    expect(toValidPackageName('_start-with-underscore')).toMatchInlineSnapshot(
      '"start-with-underscore"',
    )
    expect(toValidPackageName('contain:colons')).toMatchInlineSnapshot('"contain-colons"')
    expect(toValidPackageName(' leading-space')).toMatchInlineSnapshot('"leading-space"')
    expect(toValidPackageName('trailing-space ')).toMatchInlineSnapshot('"trailing-space"')
    expect(toValidPackageName('s/l/a/s/h/e/s')).toMatchInlineSnapshot('"s-l-a-s-h-e-s"')
  })
})

describe('测试 pkgFromUserAgent 函数', () => {
  it('正确的测试用例', () => {
    expect(pkgFromUserAgent('npm/6.14.8 node/v14.15.1 darwin x64')).toMatchInlineSnapshot(`
      {
        "name": "npm",
        "version": "6.14.8",
      }
    `)

    expect(pkgFromUserAgent('yarn/1.22.10 npm/? node/v14.15.1 darwin x64')).toMatchInlineSnapshot(`
      {
        "name": "yarn",
        "version": "1.22.10",
      }
    `)

    expect(pkgFromUserAgent('pnpm/5.18.5 node/v14.15.1 darwin x64')).toMatchInlineSnapshot(`
      {
        "name": "pnpm",
        "version": "5.18.5",
      }
    `)
  })

  it('错误的测试用例', () => {
    expect(pkgFromUserAgent('')).toBeUndefined()
    // eslint-disable-next-line
    // @ts-expect-error
    expect(pkgFromUserAgent(null)).toBeUndefined()
    expect(pkgFromUserAgent()).toBeUndefined()
  })
})
