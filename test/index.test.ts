import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('@systemovich/wordcounter', () => {
  const fixturesDir = 'test/fixtures/'
  const blankFile = fixturesDir.concat('blank.txt')
  const testFile = fixturesDir.concat('testfile.txt')
  const additionalFile = fixturesDir.concat('additionalfile.txt')

  describe('--lines flag', () => {
    test
    .stdout()
    .do(() => cmd.run(['--lines', `--file=${blankFile}`]))
    .it('prints 0 for the newline count of a blank file', ctx => {
      expect(ctx.stdout).to.equal(
        (0).toString().concat(' ').concat(blankFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--lines', `--file=${testFile}`]))
    .it('prints the newline counts for a nonempty file', ctx => {
      expect(ctx.stdout).to.equal(
        (29).toString().concat(' ').concat(testFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--lines', `--file=${testFile}`, `--file=${additionalFile}`]))
    .it('prints the newline counts for each file argument', ctx => {
      expect(ctx.stdout).to.equal([
        (29).toString().concat(' ').concat(testFile).concat('\n'),
        (118).toString().concat(' ').concat(additionalFile).concat('\n'),
      ].join(''))
    })
  })

  describe('--words flag', () => {
    test
    .stdout()
    .do(() => cmd.run(['--words', `--file=${blankFile}`]))
    .it('prints 0 for the word count of a blank file', ctx => {
      expect(ctx.stdout).to.equal(
        (0).toString().concat(' ').concat(blankFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--words', `--file=${testFile}`]))
    .it('prints the word count for a nonempty file', ctx => {
      expect(ctx.stdout).to.equal(
        (134).toString().concat(' ').concat(testFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--words', `--file=${testFile}`, `--file=${additionalFile}`]))
    .it('prints the newline counts for each file argument', ctx => {
      expect(ctx.stdout).to.equal([
        (134).toString().concat(' ').concat(testFile).concat('\n'),
        (853).toString().concat(' ').concat(additionalFile).concat('\n'),
      ].join(''))
    })
  })

  describe('--bytes flag', () => {
    test
    .stdout()
    .do(() => cmd.run(['--bytes', `--file=${blankFile}`]))
    .it('prints 0 for the character count of a blank file', ctx => {
      expect(ctx.stdout).to.equal(
        (0).toString().concat(' ').concat(blankFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--bytes', `--file=${testFile}`]))
    .it('prints the character count for a nonempty file', ctx => {
      expect(ctx.stdout).to.equal(
        (868).toString().concat(' ').concat(testFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--bytes', `--file=${testFile}`, `--file=${additionalFile}`]))
    .it('prints the newline counts for each file argument', ctx => {
      const outputLines = [
        (868).toString().concat(' ').concat(testFile).concat('\n'),
        (7677).toString().concat(' ').concat(additionalFile).concat('\n'),
      ]

      expect(ctx.stdout).to.equal(outputLines.join(''))
    })
  })

  describe('--chars flag', () => {
    test
    .stdout()
    .do(() => cmd.run(['--chars', `--file=${blankFile}`]))
    .it('prints 0 for the character count of a blank file', ctx => {
      expect(ctx.stdout).to.equal(
        (0).toString().concat(' ').concat(blankFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--chars', `--file=${testFile}`]))
    .it('prints the character count for a nonempty file', ctx => {
      expect(ctx.stdout).to.equal(
        (866).toString().concat(' ').concat(testFile).concat('\n')
      )
    })

    test
    .stdout()
    .do(() => cmd.run(['--chars', `--file=${testFile}`, `--file=${additionalFile}`]))
    .it('prints the newline counts for each file argument', ctx => {
      const outputLines = [
        (866).toString().concat(' ').concat(testFile).concat('\n'),
        (7677).toString().concat(' ').concat(additionalFile).concat('\n'),
      ]

      expect(ctx.stdout).to.equal(outputLines.join(''))
    })
  })
})
