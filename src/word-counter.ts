import {createReadStream} from 'fs'
import * as readline from 'readline'
import Counts from './counts'

export default class WordCounter {
  _counts: Counts

  constructor(file: string) {
    this._counts = {file: file}
  }

  get counts(): Counts {
    return this._counts
  }

  async lines(): Promise<number>  {
    return new Promise((resolve, reject) => {
      let lines = 0

      readline.createInterface({
        input: createReadStream(this._counts.file).on('error', error => reject(error)),
      })

      .on('line', () => {
        lines++
      })

      .on('close', () => {
        this._counts.lines = lines
        resolve(lines)
      })
    })
  }

  async words(): Promise<number>  {
    return new Promise((resolve, reject) => {
      let words = 0

      readline.createInterface({
        input: createReadStream(this._counts.file).on('error', error => reject(error)),
      })

      .on('line', line => {
        words += line
        .split(' ')
        .map(word => word.trim())
        .filter(word => word !== '')
        .length
      })

      .on('close', () => {
        this._counts.words = words
        resolve(words)
      })
    })
  }

  async bytes(): Promise<number>  {
    return new Promise((resolve, reject) => {
      let bytes = 0
      let lines = 0

      readline.createInterface({
        input: createReadStream(this._counts.file).on('error', error => reject(error)),
      })

      .on('line', line => {
        lines++
        bytes += Buffer.byteLength(line)
      })

      .on('close', () => {
        this._counts.bytes = bytes + lines
        resolve(bytes + lines)
      })
    })
  }

  async chars(): Promise<number>  {
    return new Promise((resolve, reject) => {
      let chars = 0
      let lines = 0

      readline.createInterface({
        input: createReadStream(this._counts.file).on('error', error => reject(error)),
      })

      .on('line', line => {
        lines++

        chars += line
        .split('')
        .length
      })

      .on('close', () => {
        this._counts.chars = chars + lines
        resolve(chars + lines)
      })
    })
  }

  async all(): Promise<Counts> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await this.lines()
          await this.words()
          await this.bytes()
          await this.chars()
          resolve(this._counts)
        } catch (error) {
          reject(error)
        }
      })()
    })
  }
}
