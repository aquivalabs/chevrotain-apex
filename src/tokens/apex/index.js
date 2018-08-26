'use strict'
const { Identifier, createKeywordToken, WhiteSpace } = require('../_shared')
const commentTokens = require('./comments')
const typeTokens = require('./types')
const accessLevelTokens = require('./access')
const loopsAndConditionTokens = require('./loopsAndConds')
const exceptionTokens = require('./exceptions')
const classAndMethodTokens = require('./classAndMethods')
const constantsTokens = require('./constants')
const sharedSymbolsTokens = require('../_shared/symbols')
const symbolsTokens = require('./symbols')

const Get = createKeywordToken({
  categories: Identifier,
  name: 'Get',
  pattern: /get/,
  label: "'get'",
})

const Set = createKeywordToken({
  categories: Identifier,
  name: 'Set',
  pattern: /set/,
  label: "'set'",
})

const Assert = createKeywordToken({
  name: 'Assert',
  pattern: /assert/,
  label: "'assert'",
})

module.exports = {
  // note we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
  WhiteSpace,
  ...commentTokens,
  ...typeTokens,
  ...accessLevelTokens,
  ...exceptionTokens,
  ...classAndMethodTokens,
  ...loopsAndConditionTokens,
  ...constantsTokens,
  Get,
  Set,
  Assert,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  ...symbolsTokens,
  ...sharedSymbolsTokens,
}