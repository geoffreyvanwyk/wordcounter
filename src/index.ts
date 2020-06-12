import {Command, flags} from '@oclif/command'
import {createReadStream} from 'fs'
import * as readline from 'readline'
import {Buffer} from 'buffer'

class SystemovichWordcounter extends Command {
  static description = 'Print newline, word, and byte counts for each FILE.\n' +
    'Also print total line if more than one FILE is specified.\n\n' +

    'A word is a non-zero-length sequence of characters delimited by white ' +
    'space.\n\n' +
    'With no FILE, or when FILE is -, read standarc input.'

  static flags = {
    bytes: flags.boolean({
      char: 'c',
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

    file: flags.string({
      char: 'f',
      description: 'one or more files in which to count items',
      multiple: true,
      required: true,
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

  async run() {
    const {flags} = this.parse(SystemovichWordcounter)

    if (flags.lines) {
      try {
        this.log((await Promise.all(
          flags.file.map(file => this.countLines(file))
        )).join('\n'))
      } catch (error) {
        this.error(error)
      }
    }

    if (flags.words) {
      try {
        this.log((await Promise.all(
          flags.file.map(file => this.countWords(file))
        )).join('\n'))
      } catch (error) {
        this.error(error)
      }
    }

    if (flags.bytes) {
      try {
        this.log((await Promise.all(
          flags.file.map(file => this.countBytes(file))
        )).join('\n'))
      } catch (error) {
        this.error(error)
      }
    }

    if (flags.chars) {
      try {
        this.log((await Promise.all(
          flags.file.map(file => this.countCharacters(file))
        )).join('\n'))
      } catch (error) {
        this.error(error)
      }
    }
  }

  async countLines(filepath: string): Promise<string>  {
    return new Promise((resolve, reject) => {
      let lines = 0

      readline.createInterface({
        input: createReadStream(filepath).on('error', error => reject(error)),
      })
      .on('line', () => {
        lines++
      })
      .on('close', () => {
        resolve(lines.toString().concat(' ').concat(filepath))
      })
    })
  }

  async countWords(filepath: string): Promise<string>  {
    return new Promise((resolve, reject) => {
      let words = 0

      readline.createInterface({
        input: createReadStream(filepath).on('error', error => reject(error)),
      })
      .on('line', line => {
        words += line
        .split(' ')
        .map(word => word.trim())
        .filter(word => word !== '')
        .length
      })
      .on('close', () => {
        resolve(words.toString().concat(' ').concat(filepath))
      })
    })
  }

  async countBytes(filepath: string): Promise<string>  {
    return new Promise((resolve, reject) => {
      let bytes = 0
      let lines = 0

      readline.createInterface({
        input: createReadStream(filepath).on('error', error => reject(error)),
      })
      .on('line', line => {
        lines++
        bytes += Buffer.byteLength(line)
      })
      .on('close', () => {
        resolve((bytes + lines).toString().concat(' ').concat(filepath))
      })
    })
  }

  async countCharacters(filepath: string): Promise<string>  {
    return new Promise((resolve, reject) => {
      let characters = 0
      let lines = 0

      readline.createInterface({
        input: createReadStream(filepath).on('error', error => reject(error)),
      })
      .on('line', line => {
        lines++

        characters += line
        .split('')
        .length
      })
      .on('close', () => {
        resolve((characters + lines).toString().concat(' ').concat(filepath))
      })
    })
  }
}

export = SystemovichWordcounter
