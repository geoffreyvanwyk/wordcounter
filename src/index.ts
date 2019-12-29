import {Command, flags} from '@oclif/command'
import {createReadStream} from 'fs'
import * as readline from 'readline'

class SystemovichWordcounter extends Command {
  static description = 'Print newline, word, and byte counts for each FILE.\n' +
    'Also print total line if more than one FILE is specified.\n\n' +

    'A word is a non-zero-length sequence of characters delimited by white ' +
    'space.\n\n' +
    'With no FILE, or when FILE is -, read standarc input.'

  static flags = {
    bytes: flags.boolean({
      char: 'f',
      description: 'print the byte counts',
    }),

    chars: flags.boolean({
      char: 'm',
      description: 'print the character counts',
    }),

    'files-from': flags.string({
      description: 'read input from the file specified by NUL-terminated ' +
        'names in file "files-from"; if "files-from" is - then read names ' +
        'from standard input',
    }),

    help: flags.help({char: 'h'}),

    lines: flags.boolean({
      char: 'l',
      description: 'print the newline counts',
    }),

    'max-line-length': flags.integer({
      char: 'L',
      description: 'print the maximum display width',
    }),

    version: flags.version({char: 'v'}),

    words: flags.boolean({
      char: 'w',
      description: 'print the word counts',
    }),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(SystemovichWordcounter)

    if (flags.lines && args.file) {
      this.log(await this.countLines(args.file))
    }
  }

  async countLines(filepath: string): Promise<string>  {
    return new Promise((resolve, reject) => {
      let lines = 0

      try {
        const rl = readline.createInterface({
          input: createReadStream(filepath),
        })

        rl.on('line', () => {
          lines++
        })

        rl.on('close', () => {
          resolve(lines.toString().concat(' ').concat(filepath))
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}

export = SystemovichWordcounter
