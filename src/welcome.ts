import { bgCyan, bold, black } from 'kolorist'
import { name, version } from '../package.json'
import { outro } from '@clack/prompts'

export function welcome() {
  const pkgName = bold(bgCyan(black(` ${name} `)))

  outro(`${pkgName} v${version} \n`)
}
