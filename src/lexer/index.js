'use strict'
const { LEXER_MODE } = require('../constants')
const { Lexer } = require('chevrotain')
const apex = require('./apex')

const lexerDefinition = {
  modes: {
    [LEXER_MODE.APEX]: Object.values(apex),
  },

  defaultMode: LEXER_MODE.APEX,
}

const ApexLexer = new Lexer(lexerDefinition, { ensureOptimizations: true })

module.exports = {
  ApexLexer,
  tokens: {
    apex,
  },
}
