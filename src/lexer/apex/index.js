'use strict'
const {
  Identifier,
  createKeywordToken,
  WhiteSpace,
  LSquareSelect,
  constants,
} = require('../_shared')
const commentTokens = require('./comments')
const typeTokens = require('./types')
const accessLevelTokens = require('./access')
const loopsAndConditionTokens = require('./loopsAndConds')
const exceptionTokens = require('./exceptions')
const classAndMethodTokens = require('./classAndMethods')
const symbolsTokens = require('./symbols')
const keywordTokens = require('./keywords')
const dmlTokens = require('./dml')

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
  ...constants,
  LSquareSelect,
  ...dmlTokens,
  ...keywordTokens,
  Get,
  Set,
  Assert,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  ...symbolsTokens,
}
