const { createKeywordToken } = require('./_shared')

const Break = createKeywordToken({
  name: 'Break',
  pattern: /break/,
  label: "'break'",
})

const Continue = createKeywordToken({
  name: 'Continue',
  pattern: /continue/,
  label: "'continue'",
})

const If = createKeywordToken({
  name: 'If',
  pattern: /if/,
  label: "'if'",
})

const Else = createKeywordToken({
  name: 'Else',
  pattern: /else/,
  label: "'else'",
})

const While = createKeywordToken({
  name: 'While',
  pattern: /while/,
  label: "'while'",
})

const Do = createKeywordToken({
  name: 'Do',
  pattern: /do/,
  label: "'do'",
})

const Switch = createKeywordToken({
  name: 'Switch',
  pattern: /switch/,
  label: "'switch'",
})

const For = createKeywordToken({
  name: 'For',
  pattern: /for/,
  label: "'for'",
})

module.exports = {
  Break,
  Continue,
  If,
  Else,
  While,
  Do,
  Switch,
  For,
}
