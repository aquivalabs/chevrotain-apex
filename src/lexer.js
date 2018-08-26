'use strict'
const { Lexer } = require('chevrotain')
const { lexerDefinition } = require('./tokens')

const ApexLexer = new Lexer(lexerDefinition, { ensureOptimizations: true })

module.exports = ApexLexer
