import {expect, test} from '@oclif/test'

import cmd = require('../src')
import {execSync} from 'child_process'

describe('@systemovich/wordcounter', () => {
  const testFile = 'test/fixtures/testfile.txt'

  test
  .stdout()
  .add('wc', execSync(`wc --lines ${testFile}`).toString())
  .do(() => cmd.run(['--lines', testFile]))
  .it('prints the newline counts with long flag name', ctx => {
    expect(ctx.stdout).to.equal(ctx.wc)
  })

  test
  .stdout()
  .add('wc', execSync(`wc -l ${testFile}`).toString())
  .do(() => cmd.run(['-l', testFile]))
  .it('prints the newline counts with short flag name', ctx => {
    expect(ctx.stdout).to.equal(ctx.wc)
  })
})
