'use strict'
const ApexLexer = require('./lexer')
const ApexParser = require('./parser')
const SQLToAstVisitor = require('./visitor')

const parser = new ApexParser([])

// Our visitor has no state, so a single instance is sufficient.
const toAstVisitorInstance = new SQLToAstVisitor()

function parse(inputText, entryPoint = (parser) => parser.compilationUnit()) {
  // Lex
  const lexResult = ApexLexer.tokenize(inputText)
  parser.input = lexResult.tokens

  // Automatic CST created when parsing
  const cst = entryPoint(parser)
  if (parser.errors.length > 0) {
    const error = parser.errors[0]
    throw Error(
      'Parsing errors detected in line: ' +
        error.token.startLine +
        ', column: ' +
        error.token.startColumn +
        '!\n' +
        error.message
    )
  }

  // Visit
  return toAstVisitorInstance.visit(cst)
}

module.exports = { parse }
