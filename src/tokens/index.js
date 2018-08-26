'use strict'
const { LEXER_MODE } = require('../constants')
const apex = require('./apex')

const lexerDefinition = {
  modes: {
    [LEXER_MODE.APEX]: Object.values(apex),
  },

  defaultMode: LEXER_MODE.APEX,
}

module.exports = {
  lexerDefinition,
  tokens: {
    apex,
  },
}
