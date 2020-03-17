import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('@systemovich/wordcounter', () => {
  const fixturesDir = 'test/fixtures/'
  const blankFile = fixturesDir.concat('blank.txt')
  const testFile = fixturesDir.concat('testfile.txt')

  describe('--lines flag', () => {
    test
    .stdout()
    .do(() => cmd.run(['--lines', blankFile]))
    .it('prints 0 for the newline count of a blank file', ctx => {
      expect(ctx.stdout).to.equal(
        (0).toString().concat(' ').concat(blankFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--lines', testFile]))
    .it('prints the newline counts for a nonempty file', ctx => {
      expect(ctx.stdout).to.equal(
        (29).toString().concat(' ').concat(testFile).concat('\n')
      )
    })
  })

  describe('--words flag', () => {
    test
    .stdout()
    .do(() => cmd.run(['--words', blankFile]))
    .it('prints 0 for the word count of a blank file', ctx => {
      expect(ctx.stdout).to.equal(
        (0).toString().concat(' ').concat(blankFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--words', testFile]))
    .it('prints the word count for a nonempty file', ctx => {
      expect(ctx.stdout).to.equal(
        (134).toString().concat(' ').concat(testFile).concat('\n')
      )
    })
  })

  describe('--chars flag', () => {
    test
    .stdout()
    .do(() => cmd.run(['--chars', blankFile]))
    .it('prints 0 for the character count of a blank file', ctx => {
      expect(ctx.stdout).to.equal(
        (0).toString().concat(' ').concat(blankFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--chars', testFile]))
    .it('prints the character count for a nonempty file', ctx => {
      expect(ctx.stdout).to.equal(
        (866).toString().concat(' ').concat(testFile).concat('\n')
      )
    })
  })
})
