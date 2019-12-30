import {expect, test} from '@oclif/test'
import {execSync} from 'child_process'

import cmd = require('../src')

describe('@systemovich/wordcounter', () => {
  const fixturesDir = 'test/fixtures/'

  const testFile = {
    blank: fixturesDir.concat('blank.txt'),
    lastLine: {
      blank: fixturesDir.concat('blank_last_line.txt'),
      nonblank: fixturesDir.concat('nonblank_last_line.txt'),
    },
  }

  test
  .stdout()
  .add('wc', execSync(`wc --lines ${testFile.blank}`).toString())
  .do(() => cmd.run(['--lines', testFile.blank]))
  .it('prints the newline counts when file is blank', ctx => {
    expect(ctx.stdout).to.equal(ctx.wc)
  })

  test
  .stdout()
  .add('wc', execSync(`wc --lines ${testFile.lastLine.blank}`).toString())
  .do(() => cmd.run(['--lines', testFile.lastLine.blank]))
  .it('prints the newline counts when last line is blank', ctx => {
    expect(ctx.stdout).to.equal(ctx.wc)
  })

  test
  .stdout()
  .add('wc', execSync(`wc --lines ${testFile.lastLine.nonblank}`).toString())
  .do(() => cmd.run(['--lines', testFile.lastLine.nonblank]))
  .it('prints the newline counts when last line is not blank', ctx => {
    const count = parseInt(ctx.wc, 10) + 1
    const rest = ctx.wc.replace(/^\d+\s/, '')

    expect(ctx.stdout).to.equal(count.toString().concat(' ').concat(rest))
  })
})
