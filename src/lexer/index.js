'use strict'
const { LEXER_MODE } = require('../constants')
const { Lexer } = require('chevrotain')
const apex = require('./apex')
const soql = require('./soql')

const lexerDefinition = {
  modes: {
    [LEXER_MODE.APEX]: Object.values(apex),
    [LEXER_MODE.SOQL]: Object.values(soql),
  },

  defaultMode: LEXER_MODE.APEX,
}

const ApexLexer = new Lexer(lexerDefinition, { ensureOptimizations: true })

module.exports = {
  ApexLexer,
  tokens: {
    apex,
    soql,
  },
}
