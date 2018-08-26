const chevrotain = require('chevrotain')
const xregexp = require('xregexp')

// A little mini DSL for easier lexer definition using xRegExp.
const fragments = {}

function FRAGMENT(name, def) {
  fragments[name] = xregexp.build(def, fragments)
}

function makePattern(def, flags) {
  return xregexp.build(def, fragments, flags)
}

// The order of fragments definitions is important
FRAGMENT('Digits', '[0-9]([0-9_]*[0-9])?')
FRAGMENT('ExponentPart', '[eE][+-]?{{Digits}}')
FRAGMENT('HexDigit', '[0-9a-fA-F]')
FRAGMENT('HexDigits', "{{HexDigit}}(({{HexDigit}}|'_')*{{HexDigit}})?")

const caseInsensitive = (regex) => {
  const source = regex.source
  let flags = regex.flags
  if (flags) {
    flags += flags.includes('i') ? '' : 'i'
  } else {
    flags = 'i'
  }
  return new RegExp(source, flags)
}

const createToken = (options) => {
  if (options.pattern instanceof RegExp) {
    options.pattern = caseInsensitive(options.pattern)
  }
  return chevrotain.createToken(options)
}

const Identifier = createToken({
  name: 'Identifier',
  pattern: /[a-zA-Z_\\$][a-zA-Z_\\$0-9]*/,
})

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: chevrotain.Lexer.SKIPPED,
  line_breaks: true,
})

function createKeywordToken(options) {
  options.longer_alt = Identifier
  return createToken(options)
}

module.exports = {
  createToken,
  Identifier,
  WhiteSpace,
  createKeywordToken,
  makePattern,
}
