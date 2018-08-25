'use strict'
const chevrotain = require('chevrotain')

const { Identifier, createKeywordToken, createToken } = require('./_shared')
const commentTokens = require('./comments')
const typeTokens = require('./types')
const accessLevelTokens = require('./access')
const loopsAndConditionTokens = require('./loopsAndConds')
const exceptionTokens = require('./exceptions')
const classAndMethodTokens = require('./classAndMethods')
const constantsTokens = require('./constants')
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

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: chevrotain.Lexer.SKIPPED,
  line_breaks: true,
})

// note we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
const allTokens = [
  WhiteSpace,
  ...Object.values(commentTokens),
  // "keywords" appear before the Identifier
  ...Object.values(typeTokens),
  ...Object.values(accessLevelTokens),
  ...Object.values(exceptionTokens),
  ...Object.values(classAndMethodTokens),
  ...Object.values(loopsAndConditionTokens),
  ...Object.values(constantsTokens),
  Get,
  Set,
  Assert,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  ...Object.values(symbolsTokens),
]

module.exports = {
  allTokens,
  tokens: {
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
    Identifier,
    ...symbolsTokens,
  },
}
