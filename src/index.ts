import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import WordCounter from './word-counter'

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

  wordCounters: Array<WordCounter> = []

  async run() {
    this.prepareCounters()
    await this.collectCounts()
    this.logCounts()
  }

  async prepareCounters() {
    const {flags} = this.parse(SystemovichWordcounter)

    for (const file of flags.file) {
      this.wordCounters.push(new WordCounter(file))
    }
  }

  async collectCounts() {
    const {flags} = this.parse(SystemovichWordcounter)

    if (flags.lines) {
      try {
        await Promise.all(
          this.wordCounters.map(wordCounter => wordCounter.lines())
        )
      } catch (error) {
        this.error(error)
      }
    }

    if (flags.words) {
      try {
        await Promise.all(
          this.wordCounters.map(wordCounter => wordCounter.words())
        )
      } catch (error) {
        this.error(error)
      }
    }

    if (flags.bytes) {
      try {
        await Promise.all(
          this.wordCounters.map(wordCounter => wordCounter.bytes())
        )
      } catch (error) {
        this.error(error)
      }
    }

    if (flags.chars) {
      try {
        await Promise.all(
          this.wordCounters.map(wordCounter => wordCounter.chars())
        )
      } catch (error) {
        this.error(error)
      }
    }

    if (!flags.lines && !flags.words && !flags.bytes && !flags.chars) {
      try {
        await Promise.all(
          this.wordCounters.map(wordCounter => wordCounter.all())
        )
      } catch (error) {
        error(error)
      }
    }
  }

  async logCounts() {
    const {flags} = this.parse(SystemovichWordcounter)
    const data = this.wordCounters.map(wordCounter => wordCounter.counts)

    const columns =  {
      lines: {},
      words: {},
      bytes: {},
      chars: {},
      file: {},
    }

    const options = {}

    const all = !flags.lines && !flags.words && !flags.bytes && !flags.chars

    if (!flags.lines && !all) delete columns.lines
    if (!flags.words && !all) delete columns.words
    if (!flags.bytes && !all) delete columns.bytes
    if (!flags.chars && !all) delete columns.chars

    cli.table(data, columns, options)
  }
}

export = SystemovichWordcounter
